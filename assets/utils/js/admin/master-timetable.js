var filterOptions = function(data){};

var columns =  [{"targets": [0],"orderable":false}, {"targets": [1,2,3,4],"orderable":true},{"targets":[0],"width":60},{"targets":[1,2],"width":80},{"targets":[3],"width":300},{"targets":[4],"width":80}];

$(document).ready(function(){
  //dataTables(tableName,paging,scrollX,scrollY,processing,serverside,recordURL,filterData,columns,no_of_records)
  table = dataTables("timeTable",true,true,false,true,true,"master/timetable/page",filterOptions,columns,25);

  $("#add_timetable").on("submit",function(e){
    e.preventDefault();  
    $(".error").html("");
    $(".error").css("display","none");

    var formdata = new FormData(this);
    postForm(formdata,"master/timetable/addAction");
  });

  $("#update_timetable").on("submit",function(e){
    e.preventDefault();  
    $(".error").html("");
    $(".error").css("display","none"); 
    
    var formdata = new FormData(this);
    postForm(formdata,"master/timetable/updateAction");
  });

  $("input[name='selectall']").click(function(e) {
    if($(this).is(':checked')){
      $("input[name='selectedRows[]'").prop('checked', true);
    }else{
      $("input[name='selectedRows[]'").prop('checked', false);
    }
  });
  
});

function orderChange(id){
  let selected = $("#"+id).val();

  $.ajax({
    type:'POST',
    data:{id:id, position:selected},
    url:CI_ROOT+"master/timetable/orderChangeAction",
    dataType: "json",
    beforeSend:function(){
      showLoader();
    },
    success:function(result){
      hideLoader();

      if(result.status == "success"){
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

function deleteRecord(id){
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
        data:{id:id},
        url:CI_ROOT+"master/timetable/deleteAction",
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