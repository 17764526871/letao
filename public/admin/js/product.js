$(function () {
    var page = 1;
    var pageSize = 2;

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

   
})