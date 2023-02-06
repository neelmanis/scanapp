$(document).ready(function(){


  
   $("#contact-form").on("submit",function(e){
    e.preventDefault();        
    $(".error").html("");
    $(".error").css("display","none");

    var formdata = new FormData(this);

    var postLink = 'contactus/submitAction';
    postForm(formdata,postLink);
  });
 
 
});