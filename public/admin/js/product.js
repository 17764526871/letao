$(function () {
    var page = 1;
    var pageSize = 2;
    var imgs = [];

    render();

    function render() {
        $.ajax({
            type: 'get',
            url: '/product/queryProductDetailList',
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (info) {
                console.log(info);
                $('tbody').html(template("tpl1", info))
                //分页
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: page,
                    totalPages: Math.ceil(info.total / info.size),
                    onPageClicked: function (a, b, c, p) {
                        page = p;
                        render();
                    },
                    itemTexts: function (type, page, current) {
                        switch (type) {

                            case "first":

                                return "首页";

                            case "prev":

                                return "上一页";

                            case "next":

                                return "下一页";

                            case "last":

                                return "末页";

                            case "page":

                                return page;

                        }
                    },
                    tooltipTitles: function (type, page, current) {
                        switch (type) {
                            case "first":
                                return "首页";
                            case "prev":
                                return "上一页";
                            case "next":
                                return "下一页";
                            case "last":
                                return "尾页";
                                //如果是page，说明就是数字，只需要返回对应的数字即可
                            default:
                                return "跳转到" + page;
                        }
                    },

                })
            }
        })

    }

    //点击显示模态框
    $(".btn_add").on("click", function () {
        $("#addModal").modal("show");

        $.ajax({
            type: "get",
            url: '/category/querySecondCategoryPaging',
            data: {
                page: 1,
                pageSize: 100
            },
            success: function (info) {
                $(".dropdown-menu").html(template("tpl2", info));
            }
        })

    })

    //点击分类事件
    $(".dropdown-menu").on("click", "a", function () {
        $(".dropdown-text").text($(this).text());
        //设置id
        $('#brandId').val($(this).data("id"));
        //添加校验成功
        $("form").data("bootstrapValidator").updateStatus("brandId", "VALID");

    })
    //图片上传功能
    $("#fileupload").fileupload({
        done: function (e, data) {
            if (imgs.length == 3) {
                return;
            }
            console.log(data.result);
            //渲染图片
            imgs.push(data.result);
            $('.img_box').append('<img src="' + data.result.picAddr + '" width="100" height="100" alt="">')
            //给图片添加校验通过和不通过功能
            if (imgs.length === 3) {
                $("form").data("bootstrapValidator").updateStatus("brandLogo", "VALID")
            } else {
                $("form").data("bootstrapValidator").updateStatus("brandLogo", "INVALID")
            }

        }


    })


    //5.表单校验功能
    $('form').bootstrapValidator({
        //配置校验图片
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        excluded: [],
        //3. 指定校验字段
        fields: {
            brandId: {
                validators: {
                    notEmpty: {
                        message: '请选择二级分类'
                    }
                }
            },
            proName: {
                validators: {
                    notEmpty: {
                        message: '请输入商品的名称'
                    }
                }
            },
            proDesc: {
                validators: {
                    notEmpty: {
                        message: '请输入商品的描述'
                    }
                }
            },
            num: {
                validators: {
                    notEmpty: {
                        message: '请输入商品的库存'
                    },
                    //正则校验
                    regexp: {
                        regexp: /^[1-9]\d{0,4}$/,
                        message: '请输入正确的库存(1-99999)'
                    }
                }
            },
            size: {
                validators: {
                    notEmpty: {
                        message: '请输入商品的尺码'
                    },
                    //正则校验
                    regexp: {
                        regexp: /^\d{2}-\d{2}$/,
                        message: '请输入正确的尺码(xx-xx)'
                    }


                }
            },
            oldPrice: {
                validators: {
                    notEmpty: {
                        message: '请输入商品的原价'
                    }
                }
            },
            price: {
                validators: {
                    notEmpty: {
                        message: '请输入商品的价格'
                    }
                }
            },
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: '请上传三种图片'
                    }
                }
            },


        }

    })

    //校验成功事件
    $("form").on("success.form.bv", function (e) {
        e.preventDefault();
        //拼接data数据
        var param = $("form").serialize();

        param += "&picName1=" + imgs[0].picName + "&picAddr1=" + imgs[0].picAddr;
        param += "&picName2=" + imgs[1].picName + "&picAddr2=" + imgs[1].picAddr;
        param += "&picName3=" + imgs[2].picName + "&picAddr3=" + imgs[2].picAddr;
        //发送ajax
        $.ajax({
            type: 'post',
            url: '/product/addProduct',
            data: param,
            success: function (info) {
                //重置表单
                if (info.success) {
                    $("#addModal").modal('hide');
                    page = 1;
                    render();
                    $("form").data("bootstrapValidator").resetForm(true);
                    //手动
                    $(".dropdown-text").text("请选择二级分类");
                    $(".img_box img").remove();

                    //清空imgs
                    imgs = [];
                }
            }
        })

    })

})