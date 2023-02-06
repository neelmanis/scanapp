var filterOptions = function(data){};

var columns =  [{"targets": [0],"orderable":false}, {"targets": [1,2,3,4],"orderable":true},{"targets":[0],"width":130},{"targets":[1],"width":80},{"targets":[2],"width":200},{"targets":[3],"width":180},{"targets":[4],"width":80}];

$(document).ready(function(){
  //dataTables(tableName,paging,scrollX,scrollY,processing,serverside,recordURL,filterData,columns,no_of_records)
  table = dataTables("institutionTable",true,true,false,true,true,"institution/page",filterOptions,columns,25);

  $("#add_institution").on("submit",function(e){
    e.preventDefault();  
    $(".error").html("");
    $(".error").css("display","none");

    var formdata = new FormData(this);
    postForm(formdata,"institution/addAction");
  });

  $("#update_institution").on("submit",function(e){
    e.preventDefault();  
    $(".error").html("");
    $(".error").css("display","none"); 
    
    var formdata = new FormData(this);
    postForm(formdata,"institution/updateAction");
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
        url:CI_ROOT+"institution/deleteAction",
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