//由于处理用户界面数据

// 初始化一个空数组
let userAry=new Array();

// 展示用户功能
$.ajax({
    type:'get',
    url:'/users',
    success:function(res){
        userAry=res;
        render(userAry)
    }
});
// 封装 渲染方法
function render(arr){
    let html= template("usersTemp",{list:arr});
        // console.log(html);
        $("#tbody").html(html)
};

// 用户添加 给添加按钮 添加点击事件
$("#btn").on('click',function(){
    // console.log($("#userForm").serialize());
    $.ajax({
        type:'post',
        url:'/users',
        data:$("#userForm").serialize(),
        success:function(res){
            // console.log(res);
            userAry.push(res);
            render(userAry)  
        }
    })
});
// 文件上传 图像
$("#avatar").on('change',function(){
    // console.log(this.files[0]);
    // 文件上传成二进制格式 
    let formData=new FormData();
    // 创建自定义属性
    formData.append('avatar',this.files[0])
    // console.log(formData);
    $.ajax({
        type:'post',
        url:'/upload',
        data:formData,
        // 告诉$.ajax方法不要解析请求参数
        processData: false,
        // 告诉$.ajax方法不要设置请求参数的类型
        contentType: false,
        success:function(response){
            // 获取到的是图片在数据库中的相对路径
            // console.log(response[0].avatar);
            // 实现头像预览功能
            $("#avatar").next().attr("src",response[0].avatar);
            // 再把路径写到隐藏域中
            $('#hiddenAvatar').val(response[0].avatar); 
        }
    })
})
//实现用户修改 给修改按钮注册点击事件  使用到了事件委托 
// 写在HTML中已有的父级元素身上
$("#tbody").on("click",".edit",function(){
    $('#userForm > h2').text('修改用户');
    // 先获取 当前被点击这个元素的祖先 叫tr 
     var trObja = $(this).parents('tr');
     // 获取图片的地址
     var imgSrc = trObja.children(1).children('img').attr('src');
     // 将图片的地址写入到隐藏域 
     $('#hiddenAvatar').val(imgSrc);
     // 如果imgSrc有值 我们
     if(imgSrc){
         $('#preview').attr('src',imgSrc);
     }else{
         $('#preview').attr('src',"../assets/img/default.png");
     }
    // 通过当前的元素 查找表单内容
    let trObj= $(this).parents("tr").children();
    // 获取到的内容添加到左边
    $("#email").val(trObj.eq(2).text());
    $("#nickName").val(trObj.eq(3).text());
    // 对用户啊状态进行判断  给相应的标签加checked属性
    let status=trObj.eq(4).text();
    // console.log(status);
    if(status=="激活"){
        $("#jh").attr('checked','turn')
    }else{
        $("#wjh").attr('checked','turn')
    }

    let role=trObj.eq(5).text();
    // console.log(role);
    if(role=="超级管理员"){
        $("#admin").attr("checked","turn")
    }else{
        $("#normal").attr("checked","turn")
    }
})
// 实现修改功能


// 实现单个删除功能 给删除按钮注册点击事件 使用到了事件委托
$("#tbody").on("click",".detele",function(){
    let userId= $(this).parent().attr("data-id");
    // console.log(userId);
    if(confirm("您确定要删除当前用户吗？")){
        // 发送删除的ajax
        $.ajax({
            type:"delete",
            url:"/users/"+userId,
            success:function(res){
               let index= userAry.findIndex(item=>item._id==res._id);
               userAry.splice(index,1);
               render(userAry);
            }
        })
    } 
})

// 实现全选反选
$("#selectAll").on("change",function(){
    let selectIs= $(this).prop("checked");
    // console.log(selectAll);
    $("tbody").find("input").prop("checked",selectIs)
})
$("#tbody").on("change",$("tbody").find("input"),function(){
      // 如果下面的复选框选中的个数 等于它下面复选框的个数 就表示所有的都选中了 上面那个复选框 就要打勾 反之只要有一个没有选中 那么上面的那个复选框 就不打勾
      if ($('tbody input').length == $('tbody input:checked').length) {
        $('thead input').prop('checked', true);
      } else {
        $('thead input').prop('checked', false);
      }
    //   当复选框的对勾个数大于一时 批量删除的按钮显示出来
    if($('tbody input:checked').length>1){
        $('.btn-sm').show()
    }else{
        $('.btn-sm').hide()
    }
})
// 实现删除多个功能 注册点击事件
$('.btn-sm').on("click",function(){
    // 获取到有对勾的复选框
    let inputChecked= $('tbody input:checked');
    // 用一个空数组来储存删除用户的id
    let ids=[];
    inputChecked.each(function(i,v){
        ids.push($(v).attr("data-id"))
    })
    // console.log(ids);
    // 发送ajax
    $.ajax({
        url:"/users/"+ids.join("-"),
        type:"delete",
        success:function(res){
            // res.forEach(function(i,v){
            //     // console.log(i,v);
            //     let index= userAry.findIndex(e=>e._id==v._id)
            //     userAry.splice(index,1);
            // })
            // render();

            location.reload();
        }
    })
})









// 分类文章页面 功能实现
//实现文章列表展示功能




//实现文章添加
