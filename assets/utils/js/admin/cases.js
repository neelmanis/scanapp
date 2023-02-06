var filterOptions = function(data){};

var columns =  [{"targets": [0],"orderable":false}, {"targets": [1,2,3,4],"orderable":true},{"targets":[0],"width":50},{"targets":[1],"width":80},{"targets":[2,3],"width":120},{"targets":[4],"width":80}];

$(document).ready(function(){
  //dataTables(tableName,paging,scrollX,scrollY,processing,serverside,recordURL,filterData,columns,no_of_records)
  table = dataTables("caseTable",true,true,false,true,true,"cases/page",filterOptions,columns,25);
  $(".arbitratorShowRequestAction").on("click",function(){
    let status = $(this).data("response");
    let case_id = $(this).data("case_id");
    let data = {status:status,case_id:case_id}
    var postLink = 'cases/showArbitratorRequestAction';
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

  $("#checkArbitrator").click(function(e){
      e.preventDefault();
      var claimant = $("input[name='party_arbitrator']:checked").val();
      var case_id = $("#case_id").html();

      if(claimant == undefined || claimant == null) {
        swal({
          title: "Error",
          icon: "error",
          text: "Please Select Arbitrator"
        });
      } 
    
      $.ajax({
        type:'POST',
        data:{'claimant':claimant, 'case_id':case_id},
        url:CI_ROOT+"cases/checkArbitraor",
        dataType: "json",
        
        success:function(result){
          hideLoader();
          
          if(result.status == "update"){
            swal({
              title: "Success",
              icon: "success",
              text: "Arbitrator updated successfully."
            });
            $("input[name='selectall']").prop('checked', false);
            table.ajax.reload();   
          } else if(result.status == "notUpdate") {
             
              swal({
                title: "Invalid Request!",
                icon: "error",
                text: "Arbitrator Is Already Updated."
              });
              $("#selectArb").show();
              $("#selectArbitrator").show();
          }
        }
      });
    
    });

    $("#adminSelectedArb").click(function(e){
      e.preventDefault();
      var claimant = $("input[name='admin_arbitrator']:checked").val();
      var case_id = $("#case_id").html();

      if(claimant == undefined || claimant == null) {
        swal({
          title: "Error",
          icon: "error",
          text: "Please Select Arbitrator"
        });
      } 
      

      $.ajax({
        type:'POST',
        data:{'claimant':claimant, 'case_id':case_id},
        url:CI_ROOT+"cases/adminSelectedArb",
        dataType: "json",
        
        success:function(result){
          hideLoader();
          
          if(result.status == "success"){
            swal({
              title: "Success",
              icon: "success",
              text: "Arbitrator updated successfully."
            });
            $("input[name='selectall']").prop('checked', false);
            table.ajax.reload();   
          }  if(result.status == "fail") {
            swal({
              title: "Invalid Request!",
              icon: "error",
              text: "Arbitrator Is Already Updated."
            });
          }
        }
      });
    
    });
    



});

