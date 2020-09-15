$(function () {

  var layer = layui.layer
  var form = layui.form
  var laypage = layui.laypage
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

        // 调用渲染分页
        renderPage(res.total)
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



  // 定义渲染分页的方法
  function renderPage(total) {
    // 调用laypage.render()方法渲染分页的结构
    laypage.render({
      elem: 'pageBox', //分页器的id
      count: total,  //总数据条数
      limit: q.pagesize,   //每页的条数
      curr: q.pagenum,  //起始页面
      layout: ['count', 'limit', 'prev', 'page', 'next', 'skip', 'refresh'],
      limits: [2, 3, 5, 10],
      // 分页发生切换的时候，触发jump回调
      // 初始化的时候，调用laypage.render
      // 点击页码,会触发
      jump: function (obj, first) {
        console.log(obj.curr);
        console.log(first);
        // 把最新的页码值赋值给q
        q.pagenum = obj.curr
        // 把最新的条目数赋值给q
        q.pagesize = obj.limit
        // 根据最新的q过去对应的数据列表，并渲染表格
        // 如果first是ture，说明在初始化时，不调用initTable()
        // 如果不是，调用
        if (!first) {
          initTable()
        }
      }
    })
  }


  // 删除文章
  $('tbody').on('click', '#delete-btn', function (e) {
    e.preventDefault()
    // 获取删除按钮的个数
    var len = $('#delete-btn').length
    var artId = $(this).attr('data-id')
    layer.confirm('是否删除文章？', { icon: 3, title: '提示' }, function (index) {
      //do something
      $.ajax({
        url: `/my/article/delete/${artId}`,
        method: 'GET',
        success: function (res) {
          if (res.status !== 0) {
            return layer.msg(res.message)
          }
          layer.msg('删除成功')

          if (len === 1) {
            // 当按钮只有一个时
            q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
          }
          initTable()
          layer.close(index);
        }
      })
    });
  })
})