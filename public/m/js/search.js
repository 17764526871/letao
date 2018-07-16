$(function(){
    //列表渲染功能
    render();

    function render(){
        //获取localstory数据
        var history = getHistory();
        $('.lt_history').html(template("tpl",{list:history}))
    }
    function getHistory(){
        var result = localStorage.getItem('hcc_history');
        return JSON.parse(result)||[];

    }

//清空功能
$(".lt_history").on("click",".btn_empty",function(){
    //提示删除
    mui.confirm("你确定要删除吗?", "温馨提示", ["否", "是"],function(e){
        if(e.index===1){
            localStorage.removeItem("hcc_history");
            render();
        }
    })
})

//删除功能
$(".lt_history").on("click",".btn_delete",function(){
    var index =$(this).data("index");
    //提示删除
    mui.confirm("你确定要删除这条记录吗?", "温馨提示", ["取消", "确定"], function (e){
        if(e.index===1){
            var history=getHistory()
            history.splice(index,1);
            localStorage.setItem("hcc_history",JSON.stringify(history));
            render();
        }
    })
})

//添加功能
$(".lt_search button").on("click",function(){
    var val = $(".lt_search input").val();
    //清空表单
    $(".lt_search input").val('');
    if(val==="") {
        mui.toast("请输入搜索内容");
        return ;
    }
    //获取历史记录
    var history=getHistory();

    var index=history.indexOf(val);
    if(index != -1){
        history.splice(index,1);
    }
    if(history.length>9){
        history.pop();
    }
    history.unshift(val);
    localStorage.setItem("hcc_history",JSON.stringify(history));
    render();
    //跳转页面并传递参数
    location.href="searchList.html?key="+val;


})



})