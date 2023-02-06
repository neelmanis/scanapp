$(document).ready(function(){
    $("#create-access-account").on("submit",function(e){
     e.preventDefault();        
     $(".error").html("");
     $(".error").css("display","none");
     var formdata = new FormData(this);
     var postLink = 'common/createAccessAccount';
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
            url : CI_ROOT + 'common/removeAccessAccountAction',
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
 $(".unlink-user").on("click",function(e){
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
            url : CI_ROOT + 'common/unlinkAccessAccountAction',
            dataType: "json",
            success:function(result){
              if(result.status == "success"){
                $("#row_"+row_id).remove();
              }
            }
          });
        }
      });
    });


    $("#case_all").on("click", function(){
      $('input[name="caseid[]"]').not(this).prop('checked', this.checked);
    });

    $("#give-case-access").on("submit",function(e){
      e.preventDefault();        
      $(".error").html("");
      $(".error").css("display","none");
      var formdata = new FormData(this);
      var postLink = 'common/caseAccessAction';
      postForm(formdata,postLink);
    });
 
 });