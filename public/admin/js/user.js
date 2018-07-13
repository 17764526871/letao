$(function(){
    var page=1;
    var pageSize=5;
    render();
    var id;
    var isDelete;
   $("tbody").on("click",".btn",function(){
    $('#userModal').modal('show');

    id = $(this).parent().data("id");
    console.log( id );
    isDelete =$(this).hasClass("btn-success")? 1:0;

   })
   //点击禁用或启用
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


    function render(){
        $.ajax({
            type:'get',
            url:'/user/queryUser',
            data:{
                page:page,
                pageSize:pageSize
            },
            success:function(info){
                console.log( info );
                $("tbody").html(template("tpl",info));

                //分页功能
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3, //指定bootstrap的版本
                    size: 'small',  //设置分页控件的大小
                    currentPage: page, //设置当前页
                    totalPages: Math.ceil(info.total / info.size), //设置总页数,需要计算
                    onPageClicked: function(a,b,c,p){
                
                  //修改当前页
                        page = p;
                        //重新渲染
                        render();
                    }
                });
            }
        })
    }  

})
