//页面加载进度条
$(document).ajaxStart(function () {
    NProgress.start();
  });
$(document).ajaxStop(function () {
    NProgress.done();
  });
//二级菜单的显示与隐藏
$(".second").prev().on("click",function(){
    $(this).next().slideToggle();
})
//侧边栏显示与隐藏
$(".icon_menu").on("click",function(){
    $(".lt_aside").toggleClass("active");
    $("body").toggleClass("active")
})

//退出功能

$(".icon_logout").on("click",function(){
    $("#logoutModal").modal("show");
})