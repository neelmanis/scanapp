$(document).ready(function(){

    $("#custom_component_div").hide();
  
  $("#fee_component").on("change",function(e){
   let value = $(this).val();

   if(value =="Miscellaneous fees"){
    $("#custom_component_div").slideDown();
   }else{
    $("#custom_component_div").slideUp();
   }
  });

  $(".respondPaymentRequest").on("click",function(e){
    e.preventDefault();

    let row_id = $(this).data('id');
    $.ajax({
      type : 'POST',
      data : {row_id:row_id},
      url : CI_ROOT + 'institution/dashboard/getFeesDetails',
      dataType: "json",
      success:function(result){
        if(result.status == "success"){
          $("#fees-modal-box").html(result.output);
          $('#fees-modal').modal('show');
        }else{
           swal({
            title: result.title,
            icon: "warning",
            text: result.message,
            buttons:false,
            timer: 3000
            })
        }
      }
    });
  });
  $(".invoiceUpload").on("click",function(e){
    e.preventDefault();

    let row_id = $(this).data('id');
    $.ajax({
      type : 'POST',
      data : {row_id:row_id},
      url : CI_ROOT + 'institution/dashboard/getInvoiceForm',
      dataType: "json",
      success:function(result){
        if(result.status == "success"){
          $("#fees-modal-box").html(result.output);
          $('#fees-modal').modal('show');
        }else{
           swal({
            title: result.title,
            icon: "warning",
            text: result.message,
            buttons:false,
            timer: 3000
            })
        }
      }
    });
  });
    $(".showTransactions").on("click",function(e){
    e.preventDefault();

    let row_id = $(this).data('id');
    $.ajax({
      type : 'POST',
      data : {row_id:row_id},
      url : CI_ROOT + 'institution/dashboard/getFeesTransactions',
      dataType: "json",
      success:function(result){
        if(result.status == "success"){
          $("#fees-modal-box").html(result.output);
          $('#fees-modal').modal({ backdrop: 'static', keyboard: false});
        }else{
           swal({
            title: result.title,
            icon: "warning",
            text: result.message,
            buttons:false,
            timer: 3000
            })
        }
      }
    });
  });
  


  $(document).on("submit","#update_fees_details", function(e){
  e.preventDefault();        
    $(".error").html("");
    $(".error").css("display","none");
    var formdata = new FormData(this);
    var postLink = 'institution/dashboard/updateFees';
    postForm(formdata,postLink);
  }); 

  $(document).on("submit","#create-fees-form", function(e){
  e.preventDefault();        
    $(".error").html("");
    $(".error").css("display","none");
    var formdata = new FormData(this);
    var postLink = 'institution/dashboard/createFees';
    postForm(formdata,postLink);
  }); 
  $(document).on("submit","#upload_fees_invoice", function(e){
    e.preventDefault();        
      $(".error").html("");
      $(".error").css("display","none");
      var formdata = new FormData(this);
      var postLink = 'institution/dashboard/uploadInvoiceAction';
      postForm(formdata,postLink);
    }); 
    $(document).on("submit","#fee-component-update", function(e){
        e.preventDefault();        
      $(".error").html("");
      $(".error").css("display","none");
      var formdata = new FormData(this);
      var postLink = 'institution/dashboard/updateFeeComponentAction';
      postForm(formdata,postLink);
  
    });
    
    $(".getInfo").on("click", function(e) {
        e.preventDefault();

        let row_id = $(this).data('id');
        $.ajax({
            type: 'POST',
            data: { row_id: row_id },
            url: CI_ROOT + 'institution/dashboard/getTransactionInfo',
            dataType: "json",
            beforeSend: function() {
                showLoader();
            },
            success: function(result) {
                hideLoader();
                if (result.status == "success") {
                    $("#fees-modal-box").html(result.output);
                    $('#fees-modal').modal({ backdrop: 'static', keyboard: false });
                }
            }
        });
    });

    $(".editInfoForm").on("click", function(e) {
        e.preventDefault();

        let row_id = $(this).data('id');
        $.ajax({
            type: 'POST',
            data: { row_id: row_id },
            url: CI_ROOT + 'institution/dashboard/getTransactionEditForm',
            dataType: "json",
            beforeSend: function() {
                showLoader();
            },
            success: function(result) {
                hideLoader();
                if (result.status == "success") {
                    $("#fees-modal-box").html(result.output);
                    $('#fees-modal').modal({ backdrop: 'static', keyboard: false });
                }
            }
        });
    });
    $(document).on("submit", "#transaction-approval", function(e) {
        e.preventDefault();
        $(".error").html("");
        $(".error").css("display", "none");
        var formdata = new FormData(this);
        var postLink = 'institution/dashboard/transactionStatusUpdateAction';
        postForm(formdata, postLink);
    });


});