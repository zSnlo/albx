// 修改密码 给修改按钮添加点击事件
$("#passwordReset").on("click",function(){
    // 获取修改密码表单属性
    let passwordData=$(".form-horizontal").serialize();
    // console.log(passwordData);
    // 发送ajax
    $.ajax({
        url:'/users/password',
        type:'put',
        data: passwordData,
        success:function(){
            // 修改成功跳转到用户登录界面
            location.href="/admin/login.html"
        }
    })
})