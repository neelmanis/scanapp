$(document).ready(function(){
    $("#create-access-account").on("submit",function(e){
     e.preventDefault();        
     $(".error").html("");
     $(".error").css("display","none");
     var formdata = new FormData(this);
     var postLink = 'institution/profile/createAccessAccount';
     postForm(formdata,postLink);
   });

   $(".remove-access").on("click",function(e){
    e.preventDefault();

    swal({
        title: "Are you sure?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          let row_id = $(this).data('id');
          
          $.ajax({
            type : 'POST',
            data : {row_id:row_id},
            url : CI_ROOT + 'institution/profile/removeAccessAccountAction',
            dataType: "json",
            success:function(result){
              if(result.status == "success"){
                $("#row"+row_id).remove();
              }
            }
          });
        }
      });
    });
 
 });