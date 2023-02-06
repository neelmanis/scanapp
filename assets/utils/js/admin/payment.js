var filterOptions = function(data){};

var columns =  [{"targets": [0],"orderable":false}, {"targets": [1,2,3,4,5,6],"orderable":true},{"targets":[0],"width":50},{"targets":[1],"width":80},{"targets":[2,3,4],"width":100},{"targets":[5],"width":50},{"targets":[6],"width":50}];

$(document).ready(function(){
  //dataTables(tableName,paging,scrollX,scrollY,processing,serverside,recordURL,filterData,columns,no_of_records)
  table = dataTables("paymentTable",true,true,false,true,true,"payment/page",filterOptions,columns,25);


 $(".invoiceUpload").on("click",function(e){
    e.preventDefault();

    let row_id = $(this).data('id');
    $.ajax({
      type : 'POST',
      data : {row_id:row_id},
      url : CI_ROOT + 'payment/getInvoiceForm',
      dataType: "json",
      beforeSend:function(){
      showLoader();
      },
      success:function(result){
        hideLoader();
        if(result.status == "success"){
          $("#fees-modal-box").html(result.output);
          $('#fees-modal').modal({ backdrop: 'static', keyboard: false});
        }
      }
    });
  });
  $(".getInfo").on("click",function(e){
    e.preventDefault();

    let row_id = $(this).data('id');
    $.ajax({
      type : 'POST',
      data : {row_id:row_id},
      url : CI_ROOT + 'payment/getTransactionInfo',
      dataType: "json",
      beforeSend:function(){
      showLoader();
      },
      success:function(result){
        hideLoader();
        if(result.status == "success"){
          $("#fees-modal-box").html(result.output);
          $('#fees-modal').modal({ backdrop: 'static', keyboard: false});
        }
      }
    });
  });
    $(".editInfoForm").on("click",function(e){
    e.preventDefault();

    let row_id = $(this).data('id');
    $.ajax({
      type : 'POST',
      data : {row_id:row_id},
      url : CI_ROOT + 'payment/getTransactionEditForm',
      dataType: "json",
      beforeSend:function(){
      showLoader();
      },
      success:function(result){
        hideLoader();
        if(result.status == "success"){
          $("#fees-modal-box").html(result.output);
          $('#fees-modal').modal({ backdrop: 'static', keyboard: false});
        }
      }
    });
  });

  $(document).on("submit","#transaction-approval", function(e){
    e.preventDefault();        
      $(".error").html("");
      $(".error").css("display","none");
      var formdata = new FormData(this);
      var postLink = 'payment/transactionStatusUpdateAction';
      postForm(formdata,postLink);
  }); 
  $(document).on("submit","#upload_transaction_invoice", function(e){
    e.preventDefault();        
      $(".error").html("");
      $(".error").css("display","none");
      var formdata = new FormData(this);
      var postLink = 'payment/uploadInvoiceAction';
      postForm(formdata,postLink);
    });     
     $(document).on("submit","#fee-component-update", function(e){
      e.preventDefault();        
      $(".error").html("");
      $(".error").css("display","none");
      var formdata = new FormData(this);
      var postLink = 'payment/updateFeeComponentAction';
      postForm(formdata,postLink);
    });     
    
    

});