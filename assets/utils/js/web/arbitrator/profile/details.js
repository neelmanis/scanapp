$(document).ready(function(){
   $(".imageChangeHandle").click(function(){
       $("#photo").click();
   });

  
    $("#profile-details-update").on("submit",function(e){
        e.preventDefault();        
        $(".error").html("");
        $(".error").css("display","none");

        var formdata = new FormData(this);

        var postLink = 'arbitrator/profile/detailsUpdate';
        postForm(formdata,postLink);
    });

    $("#add-institute-form").on("submit",function(e){
        e.preventDefault();        
        $(".error").html("");
        $(".error").css("display","none");

        var formdata = new FormData(this);

        var postLink = 'arbitrator/profile/mapInstitutionAction';
        postForm(formdata,postLink);
    });

   
    $(".remove_institute").on("click",function(e){
       var postLink = 'arbitrator/profile/unmapInstituteAction';
       let institution_id = $(this).data("institution");

       var data = {institution_id:institution_id}
        confirmPostData(data,postLink,function(response){
          if(response.status == "success"){
            swal({
              title: response.message,
              icon: "success",
              buttons: true,
              dangerMode: false,
              timer: 3000
            }).then(function(){
              window.location.reload();
            });
          }
        });
    });

    $(".request_remove_institute").on("click",function(e){
       var postLink = 'arbitrator/profile/unmapRequestInstituteAction';
       let institution_id = $(this).data("institution");

       var data = {institution_id:institution_id}
        confirmPostData(data,postLink,function(response){
          if(response.status == "success"){
            swal({
              title: response.message,
              icon: "success",
              buttons: true,
              dangerMode: false,
              timer: 3000
            }).then(function(){
              window.location.reload();
            });
          }
        });
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