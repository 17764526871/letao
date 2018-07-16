$(function(){

    $.ajax({
        type:'get',
        url:"/category/queryTopCategory",
        success:function(info){
            console.log( info );
            $(".category_left ul").html(template('tpl',info));
            //获取第一个分类的id
            var id = info.rows[0].id;

            rendersecond(id);

        }
    })
    //点击功能
    $(".category_left").on("click",'li',function () { 
        $(this).addClass("active").siblings().removeClass("active");
        var id = $(this).data("id");
        rendersecond(id)
     })

    function rendersecond(id){
        $.ajax({
            type:'get',
            url:"/category/querySecondCategory",
            data:{id:id},
            success:function(info){
                console.log( info );
                $(".category_right ul").html(template('tpl2',info));
            }
        })
    }

})