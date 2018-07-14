$(function () {
    var page = 1;
    var pageSize = 10;
    render();
    //添加分类
    $(".btn_add").on("click", function () {
        $("#addModal").modal('show');

        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            data: {
                page: 1,
                pageSize: 100
            },
            success: function (info) {
                $(".dropdown-menu").html(template("tpl2", info))
            }
        })


    })
    //给dropdown-menu下的a注册点击事件（委托）
    $(".dropdown-menu").on('click', 'a', function () {
        $(".dropdown-text").text($(this).text())
        //获取id
        var id = $(this).data("id");
        $("#categoryId").val(id);
        //修改校验的状态
        $("form").data("bootstrapValidator").updateStatus("categoryId", "VALID");


    })

    //图片上传功能
    $("#fileupload").fileupload({
        //e：事件对象
        //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
        done: function (e, data) {
            //显示图片
            $(".img_box img").attr("src", data.result.picAddr);
            //图片地址设置到隐藏表单
            $("[name='brandLogo']").val(data.result.picAddr);
            //图片校验通过
            $("form").data("bootstrapValidator").updateStatus("brandLogo", "VALID");

        }
    })

    //表单校验
    $("form").bootstrapValidator({
        fields: {
            categoryId: {
                validators: {
                    notEmpty: {
                        message: '请选择一级分类'
                    }
                }
            },
            brandName: {
                validators: {
                    notEmpty: {
                        message: '二级分类的名字不能为空'
                    }
                }
            },
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: '请上传一张品牌的图片'
                    }
                }
            }

        },
        //配置不做校验的类型
        excluded: [],
        //配置小图标的规则
        feedbackIcons: {
            valid: 'glyphicon glyphicon-thumbs-up',
            invalid: 'glyphicon glyphicon-thumbs-down',
            validating: 'glyphicon glyphicon-refresh'
        }
    });
    //校验成功事件
    $("form").on("success.form.bv", function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/category/addSecondCategory',
            data: $("form").serialize(),
            success: function (info) {
                if (info.success) {
                    $("#addModal").modal('hide');
                    page = 1,
                        render();
                    //重置表单
                    $("form").data("bootstrapValidator").resetForm(true);
                    $(".dropdown-text").text("请选择一级分类");
                    $(".img_box img").attr("src", "images/none.png");
                }
            }
        })
    })


    function render() {
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategoryPaging',
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (info) {
                console.log(info);
                $('tbody').html(template('tpl', info))
                //分页
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: page,
                    totalPages: Math.ceil(info.total / info.size),
                    onPageClicked: function (a, b, c, p) {
                        page = p;
                        render();
                    }
                })
            }
        })
    }

})