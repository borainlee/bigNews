$('#shuaxin').on('mouseover', function () {
    $(this).find('i').removeClass('layui-icon-refresh-1').addClass('layui-icon-refresh')
})
$('#shuaxin').on('mouseout', function () {
    $(this).find('i').removeClass('layui-icon-refresh').addClass('layui-icon-refresh-1')
})