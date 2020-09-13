$(function () {

    var layer = layui.layer
    // 获取文章类别
    getCateList()
    function getCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }

                // 使用模板引擎渲染

                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }
    // 添加文章分类弹框
    var btnAddCateIndex = null
    // 没弹出一次返回index  确认删除哪一个
    $('#btnAddCate').on('click', function () {
        btnAddCateIndex = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        });
    })
    // 添加文章分类
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('添加成功')
                // 添加成功加载数据
                getCateList()
                // 关闭弹层
                layer.close(btnAddCateIndex)

            }
        })
    })


})