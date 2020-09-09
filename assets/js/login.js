$(function () {
    // 点击去注册账号，注册盒子显示，登录盒子隐藏
    $('#link_reg').on('click', function () {
        $('.reg-box').show()
        $('.login-box').hide()
    })
    // 点击去登录，登录盒子显示，注册盒子隐藏
    $('#link_login').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })
})