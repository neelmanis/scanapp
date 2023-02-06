$(document).ready(function(){
  $('#date').datepicker({
    modal: true,
    header: true,
    footer: true,
    showOtherMonths: true,
    selectOtherMonths: true,
    format: 'yyyy-mm-dd'
  });

  $('#time').timepicker();

  $(".meetingResp").hide();

  $("#createMeeting").on("submit",function(e){
    e.preventDefault();  
    $(".error").html("");
    $(".error").css("display","none"); 
    
    let formdata = new FormData(this);

    $.ajax({
      type:'POST',
      data:formdata,
      url: CI_ROOT + "meet/createAction",
      contentType: false,
      processData: false,
      dataType: "json",
      beforeSend:function(){
        showLoader();
      },
      success:function(result){
        hideLoader();
  
        if(result.status == "SUCCESS"){
          $('#createMeeting')[0].reset();
          $(".meetingForm").hide();
          $(".meetingResp").show();
          $("#meetingId").val(result.response["meetingId"]);
          $("#meetingPassword").val(result.response["password"]);
        }else if(result.status == "ALERT"){
          swal({
            title: result.title,
            icon: result.icon,
            text: result.message,
          });
        }else{
          $.each(result, function(i, v) {
            $("label[for='"+i+"']").html(v);
          });
          var keys = Object.keys(result);
          $(".error").css("display","block");
          $('input[name="'+keys[0]+'"]').focus();
        }
      }
    });
  });

});