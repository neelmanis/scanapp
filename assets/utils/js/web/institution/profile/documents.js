$(document).ready(function(){
    var maxField = 5; //Input fields increment limitation
    var addButton = $('.addMore'); //Add button selector
    var wrapper = $('.field_wrapper'); //Input field wrapper
   
    var x = 0; //Initial field counter is 1
    
    //Once add button is clicked
    $(addButton).click(function(){
        //Check maximum number of input fields
        if(x < maxField){ 
            x++; //Increment field counter
            $(wrapper).append(
                `<div class=row mt-2">
                    <div class="col-5">
                        <div class=" form-group mb-0">
                            <input type="text" class="form-control mt-2" name="document_name${x}" id="document_name${x}" placeholder="Document Name">
                            <label class="error" for="document_name${x}"></label>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="form-group">
                            <div class="d-flex flex-wrap align-items-center">
                                <div class="uploadType1">
                                    <input type="file" name="other${x}" id="other${x}" class="form-control">
                                    <img src="${CI_ROOT}assets/web/images/icons/upload.png" alt="Icon" class="uploadImg">
                                    <span class="paraType3 ml-3">Browse Document</span>
                                </div>
                                <label class="error w-100" for="other${x}"></label>
                            </div>
                        </div>
                    </div>
                    <div class="col-3">
                    <input type="hidden" name="fieldCounter[]">
                    <div class="addButton remove_button">
                        <a class="pointer"><img src="${CI_ROOT}assets/web/images/icons/minusicon.png" alt="icon" class="mr-3" /></a>
                    </div>
                    </div>
                </div>`); //Add field html
        }
    });
    
    //Once remove button is clicked
    $(wrapper).on('click', '.remove_button', function(e){
        e.preventDefault();
        $(this).parent('div').parent('div').remove(); //Remove field html
        x--; //Decrement field counter
    });
    

    
    $(".delete_file").on("click",function(e){
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
                    url : CI_ROOT + 'institution/profile/removeOtherDocument',
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

    // UPLOAD DOCUMENTS ACTION
    $("#upload-documents").on("submit",function(e){
        e.preventDefault();        
        $(".error").html("");
        $(".error").css("display","none");
        var formdata = new FormData(this);
        var postLink = 'institution/profile/uploadDocumentsAction';
        postForm(formdata,postLink);
      });


});