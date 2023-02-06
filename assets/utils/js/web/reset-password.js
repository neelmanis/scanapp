
$(document).ready(function(){
    $("#reset-account-password").on("submit",function(e){
     e.preventDefault();        
     $(".error").html("");
     $(".error").css("display","none");
     var formdata = new FormData(this);
     var postLink = 'login/resetPasswordAction';
     postForm(formdata,postLink);
   });
 
 });