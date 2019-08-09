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
     var trObj = $(this).parents('tr');
 
     // 获取图片的地址
     var imgSrc = trObj.children(1).children('img').attr('src');
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
