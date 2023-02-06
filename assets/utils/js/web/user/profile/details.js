$(document).ready(function(){
   $(".imageChangeHandle").click(function(){
       $("#photo").click();
   });

  
   $("#profile-details-update").on("submit",function(e){
    e.preventDefault();        
    $(".error").html("");
    $(".error").css("display","none");

    var formdata = new FormData(this);

    var postLink = 'user/profile/detailsUpdate';
    postForm(formdata,postLink);
  });
 
 
});

function previewFile(input,previewImg){
    
    var file = $("input[type=file]").get(0).files[0];

    if(file){
        var reader = new FileReader();

        reader.onload = function(){
            $("#"+previewImg).attr("src", reader.result);
        }

        reader.readAsDataURL(file);
    }
}