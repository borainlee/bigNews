$(function () {
    // 调用getUserInfo
    getUserInfo()
    var layer = layui.layer
    $('#btnLogout').on('click', function () {
        layer.confirm('确认退出登录？', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 清空本地存储
            localStorage.removeItem('token')
            // 跳转到登陆页面
            location.href = '/login.html'
            // 关闭询问框
            layer.close(index);
        });
    })

    function getUserInfo() {
        $.ajax({
            method: 'GET',
            // 有权限的接口
            url: '/my/userinfo',
            // headers就是请求头配置
            headers: {
                Authorization: localStorage.getItem('token') || ''
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                // 调用renderAvatar渲染用户头像
                renderAvatar(res.data)
            },
            // // 不论成功还是失败，最终都会调用这个函数
            // complete: function (res) {
            //     console.log(res);
            //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //         // 强制情况token
            //         localStorage.removeItem('token')
            //         // 跳转到登陆界面
            //         location.href = '/login.html'
            //     }
            // }
        })
    }


    function renderAvatar(user) {
        // 获取用户昵称
        var name = user.nickname || user.username
        // 设置欢迎文本
        $('#welcome').html('欢迎&nbsp;&nbsp' + name)
        // 渲染用户头像
        if (user.user_pic !== null) {
            // 渲染图片头像
            $('.layui-nav-img').attr('src', user.user_pic).show()
            $('.text-avatar').hide()
        } else {
            // 渲染文本头像
            $('.layui-nav-img').hide()
            var first = name[0].toUpperCase()
            $('.text-avatar').html(first).show()
        }
    }
})