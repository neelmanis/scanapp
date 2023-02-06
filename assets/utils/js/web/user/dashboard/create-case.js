
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

    $("#create-new-case").on("submit",function(e){
        e.preventDefault();        
        $(".error").html("");
        $(".error").css("display","none");
        var formdata = new FormData(this);
        var postLink = 'user/dashboard/createCaseAction';
        postForm(formdata,postLink);
      });
  

  $("input[name='user_type']").on("change", function(){
   let value = $(this).val();

   if(value =="claimant"){
    $("#case_person").html(`<option value="">Select</option>
                            <option value="self">Claimant</option>
                            <option value="representative">Authorised Representative</option>
                            <option value="counsel">Legal Counsel</option>
                            `);

    $("#claim_value_box").show();
    $("#counter_claim_value_box").hide();

   }else{
    $("#case_person").html(`<option value="">Select</option>
                            <option value="self">Respondent</option>
                            <option value="representative">Authorised Representative</option>
                             <option value="counsel">Legal Counsel</option>
                             `);
    $("#counter_claim_value_box").show();
    $("#claim_value_box").hide();

   }
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