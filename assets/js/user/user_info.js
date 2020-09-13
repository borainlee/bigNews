$(function () {
    var form = layui.form
    var layer = layui.layer





    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '用户呢称必须为1~6位'
            }
        }
    })
    // 获取用户信息
    initUserInfo()
    function initUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            method: 'GET',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                console.log(res);
                // 调用form.val()
                form.val('formUserInfo', res.data)
            }
        })
    }


    $('#resetBtn').on('click', function (e) {
        e.preventDefault()
        initUserInfo()
    })

    // 更新基本信息
    $('#changeUserInfo').submit(function (e) {
        e.preventDefault()
        $.ajax({
            url: '/my/userinfo',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 使用iframe标签后，页面中内容如果想调用父页面的方法，可以使用window.parent
                window.parent.getUserInfo()
            }
        })
    })
})