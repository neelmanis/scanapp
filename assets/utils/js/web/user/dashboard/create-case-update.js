
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

    var addButton_agreement = $('.addMore_agreement'); //Add button selector
    var wrapper_agreement = $('.field_wrapper_agreement'); //Input field wrapper
    var y = 0; //Initial field counter is 1
    //Once add button is clicked
    $(addButton_agreement).click(function(){
        //Check maximum number of input fields
        if(y < maxField){ 
            y++; //Increment field counter
            $(wrapper_agreement).append(`<div class="row mt-2">
            <div class="col-md-6 form-group mb-3">
                <div class="uploadType1">
                <input type="file"  name="arbitrator_agreement${y}" id="arbitrator_agreement${y}"
                            />
                <img src="${CI_ROOT}assets/web/images/icons/upload.png" alt="Icon"
                    class="uploadImg">
                    <input type="hidden" name="countcheck_agreement[]" />
                <span class="paraType3 ml-3">Click to browse a file</span>
                </div>
               
                <label class="error" for="arbitrator_agreement${y}"></label>
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
    $(document).on('click', '.remove_button', function(e){
        e.preventDefault();
        $(this).parent('div').parent('div').remove(); //Remove field html
        x--; //Decrement field counter
    });

    $("#update-case").on("submit",function(e){
        e.preventDefault();        
        $(".error").html("");
        $(".error").css("display","none");
        var formdata = new FormData(this);
        var postLink = 'user/dashboard/updateCaseAction';
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
                let param = $(this).data('param');
                let document = $(this).data('doc');
                $.ajax({
                    type : 'POST',
                    data : {file_id:file_id,param:param,document:document},
                    url : CI_ROOT + 'user/dashboard/trashFile',
                    dataType: "json",
                    success:function(result){
                     if(result.status == "success"){
                        $("#"+document+file_id).remove();
                      }
                    }
                  });
        
            }
          });
        
    });
    const numFormatter = new Intl.NumberFormat('en-US', {
      style: "decimal",
      maximumFractionDigits: 2
    })

   $("#claim_value").on("blur",function(){
    let claim_value = parseFloat(numFormatter.format($("#claim_value").val()).replace(/,/g,"")) ;
    let counter_claim_value =  parseFloat(numFormatter.format($("#counter_claim_value").val()).replace(/,/g,""))  ;
    let total_claim_value = claim_value+counter_claim_value;
    $("#total_claim_value").val(total_claim_value);
   });
   $("#counter_claim_value").on("blur",function(){
    let claim_value = parseFloat(numFormatter.format($("#claim_value").val()).replace(/,/g,"")) ;
    let counter_claim_value =  parseFloat(numFormatter.format($("#counter_claim_value").val()).replace(/,/g,""))  ;
    let total_claim_value = claim_value+counter_claim_value;
    $("#total_claim_value").val(total_claim_value);
   });

    
});