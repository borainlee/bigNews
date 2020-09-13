$(function () {
    var form = layui.form
    var layer = layui.layer
    // 修改密码区域的验证规则
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samePwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同'
            }
        },
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码不一致'
            }
        }
    })
    // 重置密码操作
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                    console.log(res);
                }
                layer.msg(res.message)
                // 重置表单
                $('.layui-form')[0].reset()
                // 清空本地存储
                localStorage.removeItem('token')
                // 跳转到登陆页面
                top.window.location.href = '/login.html'
            }
        })
    })
})