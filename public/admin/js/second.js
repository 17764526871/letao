$(function(){
    var page=1;
    var pageSize=5;
    render();
    //添加分类
    $(".btn_add").on("click",function(){
        $("#addModal").modal('show');
    })
    //确认添加事件
    //图片上传功能
    //表单校验
    //校验成功事件


    function render(){
        $.ajax({
            type:'get',
            url:'/category/querySecondCategoryPaging',
            data:{
                page:page,
                pageSize:pageSize
            },
            success:function(info){
                console.log( info );
                $('tbody').html(template('tpl',info))
                //分页
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:page,
                    totalPages:Math.ceil(info.total/info.size),
                    onPageClicked:function(a,b,c,p){
                        page=p;
                        render();
                    }
                })
            }
        })
    }

})