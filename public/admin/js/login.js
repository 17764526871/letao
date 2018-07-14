$(function () {
    //使用表单校验插件
    $("form").bootstrapValidator({

        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //3. 指定校验字段
        fields: {
            //校验用户名，对应name表单的name属性
            username: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 3,
                        max: 6,
                        message: '用户名长度必须在3到6之间'
                    },
                    //正则校验
                    callback: {
                        message:"用户名不存在"
                    }
                }
            },
            password: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: '密码长度必须在6到12之间'
                    },
                    callback:{
                        message:"密码错误"
                    }
                }
            }
        }

    });

    //校验成功事件
    $("form").on("success.form.bv",function(e){
        e.preventDefault()
        //再发送ajax请求
        $.ajax({
            type:"post",
            url:'/employee/employeeLogin',
            data:$("form").serialize(),
            success:function(info) {
                console.log( info );
                if(info.error===1000){
                    //更新字段
                    $("form").data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
                }
                if(info.error===1001){
                    $("form").data("bootstrapValidator").updateStatus("password", "INVALID", "callback");
                }
                if(info.success){
                    location.href="index.html";
                }
            }
        })
    })

    //点击重置按钮
    $(".reset").on("click",function(){
        $("form").data('bootstrapValidator').resetForm(true)
    })
   
})