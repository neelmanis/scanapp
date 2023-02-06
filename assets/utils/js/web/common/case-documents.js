$(document).ready(function(){
    $(".form_submit").on("submit",function(e){
    
    e.preventDefault();        
    let curr_id =$(this).data('id');

    $(".error").html("");
    $(".error").css("display","none");

    let formName = document.getElementById('document-form-'+curr_id);
    let formData = new FormData(formName);
    var formdata = new FormData(this);
    var postLink = 'common/caseDocsUploadAction';
    postForm(formData,postLink);
   });
  //  $("#respondant-documents").on("submit",function(e){
  //   e.preventDefault();        
  //   $(".error").html("");
  //   $(".error").css("display","none");
  //   var formdata = new FormData(this);
  //   var postLink = 'common/caseDocsUploadAction';
  //   postForm(formdata,postLink);
  // });

  $(".change_date_request").on("click", function(e){
   e.preventDefault();
   let row_id = $(this).data('id');
   $.ajax({
    type : 'POST',
    data : {row_id:row_id},
    url : CI_ROOT + 'common/sendDateRequest',
    dataType: "json",
    success:function(result){
      if(result.status == "success"){
        swal({
            title: result.title,
            icon: result.icon,
            text: result.message,
          
            timer: 3000
          }).then(function(){
            window.location.reload();
          });
       
      }
    }
});
  });

 
 });