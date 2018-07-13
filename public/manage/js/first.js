$(function () {


  //渲染列表数据
  var page = 1;
  var pageSize = 5;
  //页面一加载，需要渲染
  render();


  //添加功能
  //1. 给添加按钮注册点击事件
  $(".btn_add").on("click", function () {
    $("#addModal").modal('show');
  });

  //2. 表单校验的功能
  $("form").bootstrapValidator({
    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: '一级分类的名称不能为空'
          }
        }
      }
    },
    //配置小图标的规则
    feedbackIcons: {
      valid: 'glyphicon glyphicon-thumbs-up',
      invalid: 'glyphicon glyphicon-thumbs-down',
      validating: 'glyphicon glyphicon-refresh'
    }
  });

  //3. 给表单注册校验成功事件，阻止表单的默认提交，改用ajax提交
  $("form").on("success.form.bv", function (e) {
    e.preventDefault();

    $.ajax({
      type: 'post',
      url: '/category/addTopCategory',
      data: $("form").serialize(),
      success: function (info) {
        //console.log(info);
        if (info.success) {
          //成功的时候，
          //1. 隐藏模块框
          $("#addModal").modal("hide");
          //2. 渲染页面,重新渲染第一页
          page = 1;
          render();

          //3. 重置表单
          $("form").data("bootstrapValidator").resetForm(true);
        }
      }
    })

  });


  function render() {
    //发送ajax请求
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function (info) {
        console.log(info);
        $("tbody").html(template("tpl", info));

        //分页
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: page,
          totalPages: Math.ceil(info.total / info.size),
          onPageClicked: function (a, b, c, p) {
            //渲染p对应的页面即可
            page = p;
            render();
          }
        });

      }
    });
  }

});