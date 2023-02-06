$(document).ready(function(){
  
  $('[data-toggle="tooltip"]').tooltip()

  $("#reset_password").on("submit",function(e){
    e.preventDefault();        
    $(".error").html("");
    $(".error").css("display","none");
    
    var formdata = new FormData(this);
    var postLink = 'admin/recoverPasswordAction';
    
    postForm(formdata,postLink);
  });
  
});