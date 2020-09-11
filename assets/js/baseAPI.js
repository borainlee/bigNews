// 每次调用$.get()$.post()$.ajax()的时候都会调用$.ajaxPrefilter()
$.ajaxPrefilter(function (options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url
})