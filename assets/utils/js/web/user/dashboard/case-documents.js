$(document).ready(function(){
    $("#claimant-documents").on("submit",function(e){
     e.preventDefault();        
     $(".error").html("");
     $(".error").css("display","none");
     var formdata = new FormData(this);
     var postLink = 'user/dashboard/caseDocsUploadAction';
     postForm(formdata,postLink);
   });
   $("#respondant-documents").on("submit",function(e){
    e.preventDefault();        
    $(".error").html("");
    $(".error").css("display","none");
    var formdata = new FormData(this);
    var postLink = 'user/dashboard/caseDocsUploadAction';
    postForm(formdata,postLink);
  });

 
 });