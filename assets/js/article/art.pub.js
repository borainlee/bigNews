$(function () {
  var layer = layui.layer
  var form = layui.form
  initEditor()


  // 1. 初始化图片裁剪器
  var $image = $('#image')

  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
  }

  // 3. 初始化裁剪区域
  $image.cropper(options)
  // 获取分类
  getArtCate()
  function getArtCate() {
    $.ajax({
      url: '/my/article/cates',
      method: 'GET',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        var selectCate = template('select-art', res)
        console.log(selectCate);
        $('#pubArticle [name=cate_id]').html(selectCate)
        // 通过layui重新渲染ui结构
        form.render()
      }
    })
  }
  // 选择需要上传的图片
  $('#selectImg').on('click', function () {
    $('#file').click()
  })

  $('#file').on('change', function (e) {
    var filelist = e.target.files
    if (filelist.length === 0) {
      return layer.msg('请选择图片！')
    }
    // 拿到用户选择的文件
    var file = e.target.files[0]
    // 根据选择的文件，创建一个对应的 URL 地址：
    var newImgURL = URL.createObjectURL(file)
    console.log(newImgURL);
    // 先销毁旧的裁剪区域，再重新设置图片路径，之后再创建新的裁剪区域：
    $image
      .cropper('destroy')      // 销毁旧的裁剪区域
      .attr('src', newImgURL)  // 重新设置图片路径
      .cropper(options)        // 重新初始化裁剪区域
  })
  var art_state = '已发布'
  $('#btnSave2').on('click', function () {
    art_state = '草稿'
  })

  $('#pubArticle').on('submit', function (e) {
    e.preventDefault()
    // 基于表单，快速创建一个FormData对象
    var fd = new FormData($(this)[0])
    // 将文章的发布状态，存到fd中
    fd.append('state', art_state)

    $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 400,
        height: 280
      })
      .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
        // 得到文件对象后，进行后续的操作
        console.log(blob);
        fd.append('cover_img', blob)
        publishArticle(fd)
      })
  })
  // 定义发布文章的方法
  function publishArticle(fd) {
    $.ajax({
      url: '/my/article/add',
      method: 'POST',
      data: fd,
      contentType: false,
      processData: false,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg('发布文章成功！')
        // 发布文章成功后，跳转到文章列表页面
        location.href = '/article/art_list.html'
      }
    })
  }
})