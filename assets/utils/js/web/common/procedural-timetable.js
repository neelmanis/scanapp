
$(document).ready(function(){

  function fetchProceuralTimetable(filter){
      $.ajax({
      type : 'POST',
      data : filter,
      url  : CI_ROOT + 'common/fetchProceuralTimetable',
      dataType: "json",
      success:function(result){
          $("#procedural_timetable tbody").html(result.result);
      }
    });
  }
  let filter = {enc_data:enc_data,column:"date",order:"ASC"}
  fetchProceuralTimetable(filter);

  $(document).on("change","#sort_name", function(){
    let order = $(this).val();
    let filter = {enc_data:enc_data,column:"date",order:order}
    fetchProceuralTimetable(filter);
  });

  $(document).on("click",".get-procedural-form", function(e){
    e.preventDefault();
    let timetable_id = $(this).data('id');
    $.ajax({
            type : 'POST',
            data : {timetable_id:timetable_id},
            url : CI_ROOT + 'common/getProceduralTimetableForm',
            dataType: "json",
            success:function(result){
              if(result.status == "success"){
                $("#procedural-timetable-modal-box").html(result.output);
                $('#createEventModal').modal({ backdrop: 'static', keyboard: false});
                $('#date').datepicker({
                  format: "yyyy-mm-dd",
                  uiLibrary: 'bootstrap4',
                  iconsLibrary: "fontawesome",
                  disableDates: function(date) {
                                  const currentDate = new Date().setHours(0,0,0,0);
                                  return date.setHours(0,0,0,0) >= currentDate ? true : false;
                                },
                 
                 
              });
              }else{
                swal({
                  title: result.message,
                  icon: "success",
                  buttons: true,
                  dangerMode: false,
                });
              }
            }
          });

  });



   $("#other_box").hide();
   $("#timetable").on("change",function(){
     let value = $(this).val();
     if(value=="other"){
       $("#other_box").slideDown();
     }else{
       $("#other_box").slideUp();
     }
   });

    $("#other_action_box").hide();
    $("#actions").on("change",function(){
     let value = $(this).val();
     if(value=="other"){
       $("#other_action_box").slideDown();
     }else{
       $("#other_action_box").slideUp();
     }
   });

  $("#create-procedural-form").on("submit",function(e){
    e.preventDefault();        
    $(".error").html("");
    $(".error").css("display","none");
    var formdata = new FormData(this);
    var postLink = 'common/createProcedureAction';
    postForm(formdata,postLink);
  });
  $(document).on("submit","#update-procedural-form",function(e){
    e.preventDefault();        
    $(".error").html("");
    $(".error").css("display","none");
    var formdata = new FormData(this);
    var postLink = 'common/updateProcedureAction';
    postForm(formdata,postLink);
  });
  


  $(document).on("click",".acknowledgeAction",function(e){
   e.preventDefault();
    let row_id = $(this).data('id');
    let data = {row_id:row_id};
    var postLink = 'common/sendAcknowledgementAction';
    confirmPostData(data,postLink,function(response){
    
        swal({
          title: response.message,
          icon: response.icon,
          buttons: true,
          dangerMode: false,
          timer: 3000
        }).then(function(){
          window.location.reload();
        });
      
    });
  })

  // $(document).on("click",".reminder_form",function(e){
  //  e.preventDefault();
  //   let row_id = $(this).data('id');
  //   $("#reminder_id").val(row_id);
  //   $('#set-reminder-modal').modal('show');
  // })
  $(document).on("click",".send_reminder",function(e){
    e.preventDefault();
     let row_id = $(this).data('id');
     let data = {row_id:row_id};
     var postLink = 'common/sendReminder';
        confirmPostData(data,postLink,function(response){
         
            swal({
              title: response.message,
              icon: response.icon,
              buttons: true,
              dangerMode: false,
              timer: 3000
            });
          
        });
   })
   
  
  //  $(".action_update").on("change",function(e){
  //    e.preventDefault();
  //    let type = $(this).data('type');
  //    let row_id = $(this).data('id');
  //    let val = $(this).val();
  //    let data = {row_id:row_id};
  //   switch (val) {
  //   case "viewDoc":
  //     $.ajax({
  //       type : 'POST',
  //       data : data,
  //       url : CI_ROOT + 'common/getDocument',
  //       dataType: "json",
  //       success:function(result){
  //         if(result.status == "success"){
  //         window.open(result.url);
  //         }else{
  //           swal({
  //             title: result.message,
  //             icon: "success",
  //             buttons: true,
  //             dangerMode: false,
  //           });
  //         }
  //       }
  //     });
  //   break;
  //   case "uploadDoc":

  //     $.ajax({
  //       type : 'POST',
  //       data : data,
  //       url : CI_ROOT + 'common/uploadDocument',
  //       dataType: "json",
  //       success:function(result){
  //         if(result.status == "success"){
  //           $("#timetable-update-modal-box").html(result.output);
  //           $('#timetable-update-modal').modal('show');
  //         }
  //       }
  //     });
  //     break;
  //     case "acknowledge":
        
  //       var postLink = 'common/sendAcknowledgementAction';
  //       confirmPostData(data,postLink,function(response){
  //         if(response.status == "success"){
  //           swal({
  //             title: response.message,
  //             icon: "success",
  //             buttons: true,
  //             dangerMode: false,
  //             timer: 3000
  //           }).then(function(){
  //             window.location.reload();
  //           });
  //         }
  //       });
  //     break;
  //     case "reminder":

  //       var postLink = 'common/sendNotificationToParty';
  //       confirmPostData(data,postLink,function(response){
  //         if(response.status == "success"){
  //           swal({
  //             title: response.message,
  //             icon: "success",
  //             buttons: true,
  //             dangerMode: false,
  //             timer: 3000
  //           });
  //         }
  //       });
        
  //     break;
  //     case "due_date":
      
  //       $.ajax({
  //         type : 'POST',
  //         data : data,
  //         url : CI_ROOT + 'common/getTimetableDetails',
  //         dataType: "json",
  //         success:function(result){
  //          if(result.status == "success"){
  //             $("#pop_date").val(result.date);
  //             $("#pop_date_id").val(result.row_id);
  //             $('#date-change-modal').modal('show');
  //           }
  //         }
  //       });
  //     break;
     
  //     default:
  //       return false;
  //     break;
  //    }

  //  });

  
  // $(".action_update").on("change",function(e){
  //   e.preventDefault();
  //      let type = $(this).data('type');
  //      let id = $(this).data('id');
  //      let encrypted_id = $(this).data('encrypt');
  //      let usertype = $(this).data('usertype');
       
  //      let val = $(this).val();
      
  //     let link;
  //     switch (type) {
  //     case "document":
  //       link = CI_ROOT +usertype+"/dashboard/caseDocuments/"+encrypted_id;
  //     break;
  //     case "payment":
  //       link = CI_ROOT +usertype+"/dashboard/payment/"+encrypted_id;
  //     break; 
  //     case "hearing":
  //       link = CI_ROOT +usertype+"/dashboard/hearing/"+encrypted_id;
  //     break; 
  //     case "message":
  //       link = CI_ROOT + "message/send";  
  //     break;  
      
  //     default:
  //       link ="";
  //     break;
  //     }
  //      window.location.href=link;
  //     //console.log(link);
  // });

   
   $(document).on("submit","#upload-case-document", function(e){
    e.preventDefault();        
    $(".error").html("");
    $(".error").css("display","none");
    var formdata = new FormData(this);
    var postLink = 'common/caseDocsUploadAction';
    postForm(formdata,postLink);
  });

   $("#update_procedural_date_form").on("submit",function(e){
    e.preventDefault();        
    $(".error").html("");
    $(".error").css("display","none");
    var formdata = new FormData(this);
    var postLink = 'common/updateProceduralAction';
    postForm(formdata,postLink);
  });

  $("#update_procedural_status_form").on("submit",function(e){
    e.preventDefault();        
    $(".error").html("");
    $(".error").css("display","none");
    var formdata = new FormData(this);
    var postLink = 'common/updateProceduralAction';
    postForm(formdata,postLink);
  });
  $("#set_reminder_form").on("submit",function(e){
    e.preventDefault();        
    $(".error").html("");
    $(".error").css("display","none");
    var formdata = new FormData(this);
    var postLink = 'common/setReminderAction';
    postForm(formdata,postLink);
  });
  

  $('#date').datepicker({
      format: "dd-mm-yyyy",
      uiLibrary: 'bootstrap4',
      iconsLibrary: "fontawesome",
      disableDates: function(date) {
                      const currentDate = new Date().setHours(0,0,0,0);
                      return date.setHours(0,0,0,0) >= currentDate ? true : false;
                    },
     
     
  });
 
   $('#reminder_date').datepicker({
      format: "dd-mm-yyyy",
      uiLibrary: 'bootstrap4',
      iconsLibrary: "fontawesome",
      disableDates: function(date) {
                      const currentDate = new Date().setHours(0,0,0,0);
                      return date.setHours(0,0,0,0) >= currentDate ? true : false;
                    },
     
     
  });
 
  
   
 });