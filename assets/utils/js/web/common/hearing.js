$(document).ready(function(){
  
  function fetchHearing(){
    $.ajax({
      type : 'POST',
      data : { enc_data : enc_data },
      url  : CI_ROOT + 'common/fetchHearing',
      dataType: "json",
      success:function(result){
        $("#hearingTable tbody").html(result.result);
      }
    });
  }

  fetchHearing();

  $('#date').datepicker({
    format: "dd-mm-yyyy",
    uiLibrary: 'bootstrap4',
    iconsLibrary: "fontawesome",
    disableDates: function(date) {
      const currentDate = new Date().setHours(0,0,0,0);
      return date.setHours(0,0,0,0) >= currentDate ? true : false;
    }
  });

  $('#time').timepicker();

  $("#meetingRequestForm").on("submit",function(e){
    e.preventDefault();        
    $(".error").html("");
    $(".error").css("display","none");

    var formdata = new FormData(this);
    var postLink = 'api/meet/create';
    postForm(formdata,postLink);
  });

});