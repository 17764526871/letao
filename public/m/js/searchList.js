$(function () {
    //功能1加载获取的数据并渲染
    var key = tools.getSearch("key");
    $(".search_input").val(key);
    render()
    //功能2搜索功能
    //功能3排序功能

    function render() {
        $(".product").html('<div class="loading"></div>');
        //这个就是参数对象
        var param = {};
        param.page = 1;
        param.pageSize = 100;
        param.proName = $(".search_input").val().trim();
        var $now = $(".lt_sort a.now");
        if ($now.length > 0) {
            var type = $now.data("type"); //price num
            var value = $now.find("span").hasClass("fa-angle-down") ? 2 : 1;
            param[type] = value;
        }
        //发送请求
        $.ajax({
            type: "get",
            url: "/product/queryProduct",
            data: param,
            success: function (info) {

                setTimeout(function () {
                    $(".lt_product").html(template("tpl", info));
                }, 1000);

            }
        });
    }


})