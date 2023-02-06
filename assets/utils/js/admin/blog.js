var filterOptions = function(data){};

var columns =  [{"targets": [0],"orderable":false}, {"targets": [1,2,3,4],"orderable":true},{"targets":[0],"width":95},{"targets":[1],"width":80},{"targets":[2],"width":250},{"targets":[3,4],"width":80}];

$(document).ready(function(){
  //dataTables(tableName,paging,scrollX,scrollY,processing,serverside,recordURL,filterData,columns,no_of_records)
  table = dataTables("blogTable",true,true,false,true,true,"blog/records",filterOptions,columns,25);

  $("#add_blog").on("submit",function(e){
    e.preventDefault();  
    $(".error").html("");
    $(".error").css("display","none");

    for (instance in CKEDITOR.instances){
      CKEDITOR.instances[instance].updateElement();
    }  
    
    var formdata = new FormData(this);
    postForm(formdata,"blog/addAction");
  });

  $("#update_blog").on("submit",function(e){
    e.preventDefault();  
    $(".error").html("");
    $(".error").css("display","none"); 
    
    for (instance in CKEDITOR.instances){
      CKEDITOR.instances[instance].updateElement();
    }  
    
    var formdata = new FormData(this);
    postForm(formdata,"blog/updateAction");
  });

  $("input[name='selectall']").click(function(e) {
    if($(this).is(':checked')){
      $("input[name='selectedRows[]'").prop('checked', true);
    }else{
      $("input[name='selectedRows[]'").prop('checked', false);
    }
  });
  
});

function deleteRecord(roleId){
  swal({
    title: "Are you sure ?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      $.ajax({
        type:'POST',
        data:{id:roleId},
        url:CI_ROOT+"blog/deleteAction",
        dataType: "json",
        beforeSend:function(){
          showLoader();
        },
        success:function(result){    
          hideLoader();

          if(result.status == "success"){
            swal({
              title: "Success",
              icon: "success",
              text: "Record deleted successfully."
            });
            table.ajax.reload();   
          }else if(result.status == "invalid"){
            swal({
              title: "Invalid Request!",
              icon: "error",
              text: "Something went wrong."
            });
          }
        }
      });
    }
  });
}