var filterOptions = function(data){
  data.vis_name = $('#vis_name').val();
  data.company_name = $('#company_name').val();
  data.category = $('#category').val();
  data.vis_pan = $('#vis_pan').val();
 
};

var columns =  [{"targets": [5],"orderable":false}, {"targets": [0,1,2,3,4],"orderable":true},{"targets":[0,1],"width":120},{"targets":[2],"width":80},{"targets":[3],"width":50},{"targets":[4],"width":50},{"targets":[5],"width":80}];

$(document).ready(function(){
  //dataTables(tableName,paging,scrollX,scrollY,processing,serverside,recordURL,filterData,columns,no_of_records)
  table = dataTables("allVisitorsTable",true,true,false,true,true,"visitors/getAllVisitorsRecords",filterOptions,columns,25);
  // $('#vis_name').keyup(function(){
  //   table.draw();
  // });
  // $('#company_name').keyup(function(){
  //   table.draw();
  // });
  // $('#category').keyup(function(){
  //   table.draw();
  // });


  $(document).on("click",".action_handover",function(e){
    e.preventDefault();
    let unique_id = $(this).data("id");
    var data = {unique_id:unique_id}
    var postLink = 'visitors/handoverAction';
      confirmPostData(data,postLink,function(response){
        if(response.status == "success"){
          swal({
            title: response.message,
            icon: "success",
            buttons: true,
            dangerMode: false,
            timer: 1000
          }).then(function(){
            table.ajax.reload(); 
          });
        }
      });
  });
  $(document).on("click",".action_print",function(e){
    e.preventDefault();
    let unique_id = $(this).data("id");
    var data = {unique_id:unique_id}
    var postLink = 'visitors/loadBadgeAction';
      $.ajax({
      type: "POST",
      data: data,
      url: CI_ROOT + postLink,
      dataType: "json",
      beforeSend: function(){
       showLoader();
      },
      success: function(result) {
        hideLoader();
         $("#app-modal-content").html(result.output);
         $('#app-modal').modal('show');
      }
    });
  });
  
});


$(document).ready(function(){
		
	$("#onspot-form").on("submit", function(e){
    e.preventDefault();
    $(".error").html("");
    $(".error").css("display", "none");
    var nri_card = document.getElementById('nri_card').value;
    var check = $('#nri_card_check').is(':checked');
    //$('#nri_card_check').val(check);
    var ov = $("#category").val();
    if(ov == "OV"){
      if(check == true){
        if(nri_card == null || nri_card == undefined || nri_card == ''){
          alert("Nri Card required");return false;  
        }
      }
      var business_card = document.getElementById('business_card').value;
      if(business_card == null || business_card == undefined || business_card == ''){
        alert("Business Card required");return false; 
      }
      var pass_port = document.getElementById('pass_port').value;
      if(pass_port == null || pass_port == undefined || pass_port == ''){
        alert("PassPort required");return false; 
      }
    }
    
    var t = new FormData(this);
    t.append("nri_card_check", check);
    $.ajax({
      type: "POST",
      data: t,
      url: CI_ROOT + "visitors/addOnspotAction",
      mimeType: "multipart/form-data",
      contentType: !1,
      processData: !1,
      dataType: "json",
      beforeSend: function(){
        $(".preloader").fadeIn()
      },
      success: function(result) {
        $(".preloader").fadeOut();
        if(result.status == "success"){
          window.location.href = CI_ROOT + "visitors/all_visitors";
        }else{
          $.each(result, function(e, t) {
            $("label[for='" + e + "']").html(t)
          });
          var t = Object.keys(result);
          $(".error").css("display", "block");
          $('input[name="' + t[0] + '"]').focus();
        }
      }
    })
  });
  
  
  $("#update_visitor").on("submit", function(e){
    e.preventDefault();

    $(".error").html("");
    $(".error").css("display", "none");
    var category = $("#category").val();
    var check ='';
    if(category == "OV"){
      var nri_card = document.getElementById('nri_card').value;
      check = $('#nri_card_check').is(':checked');
      var ov = $("#category").val();
    }
    
    var t = new FormData(this);
    t.append("nri_card_check", check);
    $.ajax({
      type: "POST",
      data: t,
      url: CI_ROOT + "visitors/updateOnspotVisitorAction",
      mimeType: "multipart/form-data",
      contentType: !1,
      processData: !1,
      dataType: "json",
      beforeSend: function(){
       showLoader();
      },
      success: function(result) {
        hideLoader();
        if(result.status == "success"){
          window.location.href = CI_ROOT + "visitors/all_visitors";
        }else{
          $.each(result, function(e, t) {
            $("label[for='" + e + "']").html(t)
          });
          var t = Object.keys(result);
          $(".error").css("display", "block");
          $('input[name="' + t[0] + '"]').focus();
        }
      }
    })
  });

  $("#category").change(function(){
    var ov = $("#category").val();
    if(ov == "OV"){
      $(".nri_ov_div").show();
      $(".pan-div").hide();
      $(".mobile-div").hide();
    } else {
      $(".nri_ov_div").hide();
      $(".pan-div").show();
      $(".mobile-div").show();
    }
  });
  
  $("#nri_card_check").on("click",function(e){
    var check = $('#nri_card_check').is(':checked');
    if(check == false){
      $(".nri_div").hide();
    }
    if(check == true){
      $(".nri_div").show();
    }
  });

});

  function PrintContent(){
    var DocumentContainer = document.getElementById("divtoprint");
    var WindowObject = window.open("", "PrintWindow","width=1200,height=650,top=50,left=50,toolbars=no,scrollbars=yes,status=no,resizable=yes");
    WindowObject.document.writeln(DocumentContainer.innerHTML);
    WindowObject.document.close();
    WindowObject.focus();
    WindowObject.print();
    WindowObject.close();
    $("#app-modal-content").html("");
    $('#app-modal').modal('hide');

  }