$(function () {

  var page = 1;//当前页
  var pageSize = 5;//每页的条数
  //1. 页面一加载，就需要发送ajax请求
  render();



  //2. 启用与禁用功能
  //给按钮注册事件，一定要注册委托事件，因为按钮动态生成的

  var id;
  var isDelete;
  $("tbody").on("click", ".btn", function () {
    //显示模态框
    $("#userModal").modal('show');

    //获取id
    id = $(this).parent().data("id");
    console.log(id);
    //isDelete: 1 0
    isDelete = $(this).hasClass("btn-success") ? 1 : 0;
    console.log(isDelete);

  });
  $(".btn_confirm").on("click", function () {
    //发送ajax请求
    $.ajax({
      type: "post",
      url: "/user/updateUser",
      data: {
        id: id,
        isDelete: isDelete
      },
      success: function(info){
        if(info.success) {
          //隐藏模块框
          $("#userModal").modal('hide');
          //重新渲染
          render();
        }
      }
    })
  });



  function render() {

    $.ajax({
      type: 'get',
      url: '/user/queryUser',
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function (info) {
        console.log(info);
        //让数据和模版进行绑定, 模版中就可以直接使用info中的所有的属性
        var html = template("tpl", info);
        $("tbody").html(html);

        //分页的功能
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3, //指定bootstrap的版本
          size: 'small',  //设置分页控件的大小
          currentPage: page, //设置当前页
          totalPages: Math.ceil(info.total / info.size), //设置总页数,需要计算
          onPageClicked: function (a, b, c, p) {

            //修改当前页
            page = p;
            //重新渲染
            render();
          }
        });
      }
    });
  }



});