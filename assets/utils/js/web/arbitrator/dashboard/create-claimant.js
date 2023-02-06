
$(document).ready(function(){


    $("#submit-claimant-details").on("submit",function(e){
        e.preventDefault();        
        $(".error").html("");
        $(".error").css("display","none");
        var formdata = new FormData(this);
        var postLink = 'institution/dashboard/createCaseStepTwoAction';
        postForm(formdata,postLink);
      });

    // $("#claimant_email").on("blur",function(e){
    //     e.preventDefault();
    //     let email = $(this).val();
    //     let userType = "user";  
    //     if(validateEmail(email)){
    //         $.ajax({
    //             type : 'POST',
    //             data : {email:email,userType:userType},
    //             url : CI_ROOT + 'institution/dashboard/checkUser',
    //             dataType: "json",
    //             success:function(result){
    //                 if(result.status == "exist"){
    //                     $("#claimant_name").val(result.data.name).attr("readonly",true);
    //                     $("#claimant_phone").val(result.data.mobile).attr("readonly",true);
    //                     $("#claimant_address").val(result.data.address).attr("readonly",true);
    //                 }else if(result.status == "notExist"){
    //                     $("#claimant_name").val("").attr("readonly",false).focus();
    //                     $("#claimant_phone").val("").attr("readonly",false);
    //                     $("#claimant_address").val("").attr("readonly",false);
    //                 }else{
    //                     swal({
    //                         title: result.title,
    //                         icon: result.icon,
    //                         text: result.message
    //                     });
    //                 }
    //             }
    //         });
    //         $('label[for="claimant_email"]').hide().text("");
    //     }else{
    //         $(this).focus();
    //         $('label[for="claimant_email"]').show().text("Please enter valid e-mail address");
    //     }
    // });
    $("#representative_email").on("blur",function(e){
        e.preventDefault();
        let email = $(this).val();
        let userType = "representative"; 
        $("#representative_name").val("").attr("readonly",false).focus();
        $("#representative_phone").val("").attr("readonly",false);
        $("#representative_address").val("").attr("readonly",false); 
        // if(validateEmail(email)){
        //     $.ajax({
        //         type : 'POST',
        //         data : {email:email,userType:userType},
        //         url : CI_ROOT + 'institution/dashboard/checkUser',
        //         dataType: "json",
        //         success:function(result){
        //             if(result.status == "exist"){
        //                 $("#representative_name").val(result.data.name).attr("readonly",true);
        //                 $("#representative_phone").val(result.data.mobile).attr("readonly",true);
        //                 $("#representative_address").val(result.data.address).attr("readonly",true);
        //             }else if(result.status == "notExist"){
        //                 $("#representative_name").val("").attr("readonly",false).focus();
        //                 $("#representative_phone").val("").attr("readonly",false);
        //                 $("#representative_address").val("").attr("readonly",false);
        //             }else{
        //                 swal({
        //                     title: result.title,
        //                     icon: result.icon,
        //                     text: result.message
        //                 });
        //             }
        //         }
        //     });
        //     $('label[for="representative_email"]').hide().text("");
        // }else{
        //    // $(this).focus();
        //    // $('label[for="representative_email"]').show().text("Please enter valid e-mail address");
        // }
    });
    $("#assistant_email").on("blur",function(e){
        e.preventDefault();
        let email = $(this).val();
        let userType = "user";  
        if(validateEmail(email)){
            $.ajax({
                type : 'POST',
                data : {email:email,userType:userType},
                url : CI_ROOT + 'institution/dashboard/checkUser',
                dataType: "json",
                success:function(result){
                    if(result.status == "exist"){
                        $("#assistant_name").val(result.data.name).attr("readonly",true);
                        $("#assistant_phone").val(result.data.mobile).attr("readonly",true);
                        $("#assistant_address").val(result.data.address).attr("readonly",true);
                    }else if(result.status == "notExist"){
                        $("#assistant_name").val("").attr("readonly",false).focus();
                        $("#assistant_phone").val("").attr("readonly",false);
                        $("#assistant_address").val("").attr("readonly",false);
                    }else{
                        swal({
                            title: result.title,
                            icon: result.icon,
                            text: result.message
                        });
                    }
                }
            });
            $('label[for="assistant_email"]').hide().text("");
        }else{
            //$(this).focus();
            //$('label[for="assistant_email"]').show().text("Please enter valid e-mail address");
        }
    });

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    
});