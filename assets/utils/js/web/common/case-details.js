$(document).ready(function(){

    $("#update-case-status-form").on("submit",function(e){
     e.preventDefault();        
     $(".error").html("");
     $(".error").css("display","none");
     var formdata = new FormData(this);
     var postLink = 'common/updateCaseStatusAction';
     postForm(formdata,postLink);
   });



 
 });