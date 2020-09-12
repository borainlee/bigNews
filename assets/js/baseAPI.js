// 每次调用$.get()$.post()$.ajax()的时候都会调用$.ajaxPrefilter()
$.ajaxPrefilter(function (options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    // 统一为有权限的接口，设置headers请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    options.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 强制情况token
            localStorage.removeItem('token')
            // 跳转到登陆界面
            location.href = '/login.html'
        }
    }
})