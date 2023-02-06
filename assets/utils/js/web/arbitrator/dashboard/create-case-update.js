
$(document).ready(function(){
    var maxField = 10; //Input fields increment limitation
    var addButton = $('.addMore'); //Add button selector
    var wrapper = $('.field_wrapper'); //Input field wrapper
   
    var x = 0; //Initial field counter is 1
    
    //Once add button is clicked
    $(addButton).click(function(){
        //Check maximum number of input fields
        if(x < maxField){ 
            x++; //Increment field counter
            $(wrapper).append(`<div class="row">
            <div class="col-md-6 form-group">
                <div class="uploadTwo">
                    <div class="text1">Click to browse a file</div>
                        <input type="file" class="fileType1" name="document${x}" id="document${x}"
                            />
                       
                        <input type="hidden" name="countcheck[]" />
                    <span><i class="fa fa-link" aria-hidden="true"></i></span>
                    
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

    $("#update-case").on("submit",function(e){
        e.preventDefault();        
        $(".error").html("");
        $(".error").css("display","none");
        var formdata = new FormData(this);
        var postLink = 'institution/dashboard/updateCaseAction';
        postForm(formdata,postLink);
      });
    $(".trash-file").on("click",function(e){
        e.preventDefault();

        swal({
            title: "Are you sure?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                let file_id = $(this).data('file-id');
                $.ajax({
                    type : 'POST',
                    data : {file_id:file_id},
                    url : CI_ROOT + 'institution/dashboard/trashFile',
                    dataType: "json",
                    success:function(result){
                     if(result.status == "success"){
                        $("#row"+file_id).remove();
                      }
                    }
                  });
        
            }
          });
        
    });


    
});