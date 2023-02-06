$(document).ready(function(){
    $("#add-arbitrator").on("submit",function(e){
     e.preventDefault();        
     $(".error").html("");
     $(".error").css("display","none");
 
     var formdata = new FormData(this);
 
     var postLink = 'institution/profile/addArbitratorAction';
     postForm(formdata,postLink);
   });
 
 });
