$(document).ready(function(){
 
  // $(".sendPaymentRequest").on("click",function(){
  //   let row_id = $(this).data('id');
  //   let ref = $(this);
  //     swal({
  //     title: "Confirm before sending request?",
  //     icon: "warning",
  //     buttons: true,
  //     dangerMode: true,
  //   })
  //   .then((willDelete) => {
  //     if (willDelete) {
  //       $.ajax({
  //           type : 'POST',
  //           data : {row_id:row_id},
  //           url : CI_ROOT + 'user/dashboard/sendPaymentRequest',
  //           dataType: "json",
  //           success:function(result){
  //             if(result.status == "success"){
  //              ref.html("Requested"); 
  //              ref.removeClass("sendPaymentRequest");
  //               swal({
  //                 title: result.message,
  //                 icon: "success",
  //                 buttons: false,
  //                 dangerMode: false,
  //                 timer: 3000
  //               });
  //             }
  //           }
  //       });
  //     }
  //   });
  // });

  
  $(".make_payment_offline").on("click",function(e){
    e.preventDefault();
    let param = $(this).data('param');
    
    $.ajax({
      type : 'POST',
      data : {param:param},
      url : CI_ROOT + 'user/dashboard/getOfflinePaymentForm',
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
  $("#sendPaymentRequestTotal").on("click",function(){
  let case_id = $(this).data('case-id');
  let party_id = $(this).data('party-id');
  var data = {case_id:case_id,party_id:party_id}
  var postLink = 'user/dashboard/sendPaymentRequestTotal';
    confirmPostData(data,postLink,function(response){
      if(response.status == "success"){
        swal({
          title: response.message,
          icon: "success",
          buttons: true,
          dangerMode: false,
          timer: 3000
        }).then(function(){
          window.location.reload();
        });
      }
    });
  });
  var success_handler = function (success_response){
    $.ajax({
      type: 'POST',
      dataType: "json",
      url: CI_ROOT + 'user/dashboard/captureOrder',
      data: success_response,
      beforeSend:function(){
        showLoader();
      },
      success: function (response) {
        hideLoader();
        if(response.status == "success"){
         
          window.location.href = CI_ROOT + response.redirect;
        
        }else if(response.status == "fail"){
          alert(response.error);
          // window.location.href = CI_ROOT + 'user/dashboard/payment';
        }
      }
    });
  };

  $(document).on("click",".make_payment",function(e){
    e.preventDefault();
    let case_id = $(this).data('case_id');
    let param = $(this).data('param');
    let data = {param:param}
    $.ajax({
      type: 'POST',
      dataType: "json",
      url: CI_ROOT + 'user/dashboard/createOrder',
      data:data, 
      beforeSend:function(){
        showLoader();
      },
      success: function (response) {
        hideLoader();
        if(response.status=="fail"){
          swal({
            title: response.title,
            text: result.message,
            icon: response.icon,
            buttons: true,
            dangerMode: true,
          })
        }else{
         //console.log(response);
          response.handler = success_handler;
          response.modal = {
                            ondismiss: function(){
                               // confirmPostData(response,function(response){

                               // }
                              // success_handler(response);
                              //console.log(response);
                            },
                            escape: false,
                            backdropclose: false
                          };
          var rzp = new Razorpay(response);
          rzp.open();
          rzp.on('payment.failed', function (response){
                  // console.log(response);
          });
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
  $(document).on("submit","#offline_payment_form", function(e){
    e.preventDefault();        
      $(".error").html("");
      $(".error").css("display","none");
      var formdata = new FormData(this);
      var postLink = 'user/dashboard/offlinePaymentAction';
      postForm(formdata,postLink);
    }); 
   
 });