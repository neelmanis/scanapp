$(document).ready(function(){
    $("#case-approve-deny").on("submit",function(e){
     e.preventDefault();        
     $(".error").html("");
     $(".error").css("display","none");
     var formdata = new FormData(this);
     var postLink = 'arbitrator/caseDenyReasonAction';
     postForm(formdata,postLink);
   });


 
 });