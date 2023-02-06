$(document).ready(function(){
  $("#add-arbitrator").on("submit",function(e){
     e.preventDefault();        
     $(".error").html("");
     $(".error").css("display","none");
 
     var formdata = new FormData(this);
 
     var postLink = 'institution/profile/addArbitratorAction';
     postForm(formdata,postLink);
  });

  $(".accept_arbitrator").on("click",function(e){
     var postLink = 'institution/profile/acceptArbitratorsRequestAction';
     let map_id = $(this).data("id");

     var data = {map_id:map_id}
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
  $(".remove_arbiitrator").on("click",function(e){
     var postLink = 'institution/profile/removeArbitratorAction';
     let map_id = $(this).data("id");

     var data = {map_id:map_id}
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
    
  
  var maxField = 10; //Input fields increment limitation
  var addButton = $('.addMore'); //Add button selector
  var wrapper = $('.field_wrapper'); //Input field wrapper
  
  var x = 0; //Initial field counter is 1
  
  //Once add button is clicked
  $(addButton).click(function(){
      //Check maximum number of input fields
      if(x < maxField){ 
          x++; //Increment field counter
          $(wrapper).append(`<div class="row mt-2">
          <div class="col-md-6 form-group mb-3">
              <div class="uploadType1">
              <input type="file"  name="document${x}" id="document${x}"
                          />
              <img src="${CI_ROOT}assets/web/images/icons/upload.png" alt="Icon"
                  class="uploadImg">
                  <input type="hidden" name="countcheck[]" />
              <span class="paraType3 ml-3">Click to browse a file</span>
              </div>
              
              <label class="error" for="document${x}"></label>
          </div>
          <div class="col-md-6 form-group">
              <div class="addButton remove_button">
              <a class="pointer" href="javascript:void(0)"><img src="${CI_ROOT}assets/web/images/icons/minusicon.png" alt="icon" class="mr-2">Remove</a>
              </div>
          </div>
      </div>`);
      }
  });
  
  //Once remove button is clicked
  $(wrapper).on('click', '.remove_button', function(e){
      e.preventDefault();
      $(this).parent('div').parent('div').remove(); //Remove field html
      x--; //Decrement field counter
  }); 
 });
