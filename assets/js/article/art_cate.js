$(function () {

  var form = layui.form
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



  //  展示编辑弹框
  var btnEditCateIndex = null
  $('body').on('click', '#btnEdit', function () {
    btnEditCateIndex = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '修改文章分类',
      content: $('#dialog-edit').html()
    })
    var cateId = $(this).attr('data-id')
    $.ajax({
      method: 'GET',
      url: `/my/article/cates/${cateId}`,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        form.val('edit-form', res.data)
      }
    })
  })

  $('body').on('submit', '#form-edit', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/article/updatecate',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg('编辑分类成功')
        // 添加成功加载数据
        getCateList()
        // 关闭弹层
        layer.close(btnEditCateIndex)

      }
    })
  })

  // 删除按钮绑定点击事件
  $('body').on('click', '.btn-delete', function () {
    var id = $(this).attr('data-id')
    // 提示用户是否删除
    layer.confirm('确认删除？', { icon: 3, title: '提示' }, function (index) {
      $.ajax({
        method: 'GET',
        url: `/my/article/deletecate/${id}`,
        data: $(this).serialize(),
        success: function (res) {
          if (res.status !== 0) {
            return layer.msg(res.message)
          }
          layer.msg('删除分类成功')
          // 添加成功加载数据
          getCateList()
          layer.close(index);
        }
      })
    })
  })
})