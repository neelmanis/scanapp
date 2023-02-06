$(document).ready(function(){
    $("#arbitration-selection").on("submit",function(e){
     e.preventDefault();  
     $(".error-div").hide();      
     $(".error").html("");
     $(".error").css("display","none");
     var formdata = new FormData(this);
     var checkboxes  = $('input:checkbox:checked').length;
     if(checkboxes > 5) {
        $(".error-div").show().html("Please select maximum 5 Arbitrator");
        document.documentElement.scrollTop = 0;
      } else {
        $(".error-div").hide();
        var postLink = 'user/dashboard/selectArbitratorAction';
        postForm(formdata,postLink);
      }
     
   });

   

  $("#arbitration-request-to-institute").on("submit",function(e){
   e.preventDefault();  
    
   $(".error").html("");
   $(".error").css("display","none");
   var formdata = new FormData(this);
    $(".error-div").hide();
    var postLink = 'user/dashboard/updateArbitrationSelectionMode';
    postForm(formdata,postLink);
 });
 $("#arbitrator-show-request-to-admin").on("submit",function(e){
  e.preventDefault();  
   
  $(".error").html("");
  $(".error").css("display","none");
  var formdata = new FormData(this);
   $(".error-div").hide();
   var postLink = 'user/dashboard/updateArbitratorShowRequest';
   postForm(formdata,postLink);
});


 $(".arbitratorSelect").on("change",function(e){
  e.preventDefault();  
   let value = $(this).val();
   let enc_data = $("#enc_data").val(); 
   let selection_method = $("#selection_method").val(); 

   let data =  {value:value,enc_data:enc_data,selection_method:selection_method}
   $.ajax({
    type : 'POST',
    data : data,
    url : CI_ROOT + 'user/dashboard/singleArbitratorSelect',
    dataType: "json",
    success:function(result){
      if(result.status == "success"){
      
      }
    }
  });
   
});
 
 
});
 

//  function checkSelectedBox() {
//     var checkboxes  = $('input:checkbox:checked').length;
//     else {

//     }
//  }