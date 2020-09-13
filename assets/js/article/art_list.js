$(function () {

    var layer = layui.layer
    var form = layui.form

    // 定义美化时间的过滤器
    template.defaults.imports.dataFormat = function (date) {
        const dt = new Date(date)
        var y = padZero(dt.getFullYear())
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())
        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }
    // 定义补零操作
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }
    // 定义查询参数对象
    // 请求数据时，将请求参数对象提交到服务器
    var q = {
        pagenum: 1,  //页码值，默认为1
        pagesize: 2,//每页显示数据，默认2
        cate_id: '', //文章分类id
        state: ''  //文章发布状态
    }
    initTable()
    initCate()
    //获取文章列表
    function initTable() {
        $.ajax({
            url: '/my/article/list',
            method: 'GET',
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                var tableHtml = template('tpl-table', res)
                $('tbody').html(tableHtml)
            }
        })
    }
    // 渲染所有分类
    function initCate() {
        $.ajax({
            url: '/my/article/cates',
            method: 'GET',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                var cateHtml = template('tpl-cate', res)
                console.log(cateHtml);
                $('.layui-form [name=cate_id]').html(cateHtml)
                // 通过layui重新渲染ui结构
                form.render()
            }
        })
    }

    // 筛选
    $('#form-search').on('submit', function (e) {
        e.preventDefault()

        var newCateId = $('.layui-form [name=cate_id]').val()
        var newState = $('.layui-form [name=state]').val()
        q.state = newState
        q.cate_id = newCateId
        initTable()
    })
})