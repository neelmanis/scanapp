
$(document).ready(function(){
        $("#disclosure-form").on("submit",function(e){
                e.preventDefault();        
                $(".error").html("");
                $(".error").css("display","none");
                var formdata = new FormData(this);
                var postLink = 'arbitrator/dashboard/disclosureAction';
                postForm(formdata,postLink);
        });
        // $("#accept").hide();
        $("#reject").hide();
        $("input[name='option']").on("change",function(){
         let option = $(this).val();
         if(option =="1"){
                $("#accept").show();
                $("#reject").hide();
         }else{
                $("#accept").hide();
                $("#reject").show();
         }
         
        });
});