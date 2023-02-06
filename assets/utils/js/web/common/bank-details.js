$(document).ready(function(){

    $("#verify-bank-account").on("submit",function(e){
     e.preventDefault();        
     $(".error").html("");
     $(".error").css("display","none");
     var formdata = new FormData(this);
     var postLink = 'common/verifyBankAccount';
     postForm(formdata,postLink);
   });


  $(".change-to-primary").on("click",function(e){
    e.preventDefault();

    swal({
        title: "Are you sure?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          let row_id = $(this).data('id');
          
          $.ajax({
            type : 'POST',
            data : {row_id:row_id},
            url : CI_ROOT + 'common/setPrimaryAccountAction',
            dataType: "json",
            success:function(result){
              if(result.status == "success"){
                window.location.reload();
              }
            }
          });
        }
      });
    });
    var addButton = $('.addButton');
    var wrapper = $('.field_wrapper');
    var x = 0;
    $(addButton).click(function(){
        //Check maximum number of input fields
        if(x < maxField){ 
            x++; //Increment field counter
            $(wrapper).append(
                `<div class=row mt-2">
                    <div class="col-4">
                        <div class="form-group">
                            <div class="d-flex flex-wrap align-items-center">
                                <div class="uploadType1">
                                    <input type="file" name="document${x}" id="document${x}" class="form-control">
                                    <img src="${CI_ROOT}assets/web/images/icons/upload.png" alt="Icon" class="uploadImg">
                                    <span class="paraType3 ml-3">Click to browse a file</span>
                                </div>
                                <label class="error " for="document${x}"></label>
                            </div>
                        </div>
                    </div>
                    <div class="col-3">
                    <input type="hidden" name="countcheck[]">
                    <div class="addButton remove_button">
                        <a class="pointer"><img src="${CI_ROOT}assets/web/images/icons/minusicon.png" alt="icon" class="mr-3" /></a>
                    </div>
                    </div>
                </div>`); //Add field html
        }
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
                let arbitratorId = $("#arbitratorId").val();
                 let registrationId = $("#registrationId").val();
                
                $.ajax({
                    type : 'POST',
                    data : {file_id:file_id,arbitratorId:arbitratorId,registrationId:registrationId},
                    url : CI_ROOT + 'institution/profile/trashFile',
                    dataType: "json",
                    success:function(result){
                     if(result.status == "success"){
                        location.reload();
                      }
                    }
                  });
        
            }
          });
        
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
    

    let counter = {qualification:0,experience:0,affiliations:0,jurisdiction:0, remark:0, conflict:0}
    var maxField = 10;
    $(".addMore_professional_details").click(function(){
      //var wrapper = $(this).data('section');
      var wrapper = $(this).data('section');
      //Check maximum number of input fields
      switch (wrapper) {
          case "qualification":
          //Check maximum number of input fields
          if(counter.qualification < maxField){ 
              counter.qualification++; //Increment field counter
              $("#"+wrapper).append(`<div class="row">
                  <div class="col-md-7 form-group  mb-3"">
                      <label class="control-label"><strong>Qualifications</strong></label>
                      <input type="text" class="form-control" name="qualifications[${counter.qualification}]" placeholder="Qualifications" >
                      <label class="error" for="qualifications[${counter.qualification}]"></label>
                  </div>
                  <div class="col-md-5 form-group">
                      <div class="addButton remove_button" data-section='qualification' >
                      <a class="pointer"><img  src="${CI_ROOT}assets/web/images/icons/minusicon.png"  alt="icon" class="mr-3">Remove</a>
                      </div>
                  </div>
              </div>`); //Add field html
          }
      
          break;
          case "professional_experience":
              //Check maximum number of input fields
              if(counter.experience < maxField){ 
                  counter.experience++; //Increment field counter
                  $("#"+wrapper).append(`<div class="row">
                      <div class="col-md-7 form-group">
                      <input type="text" class="form-control" name="professional_experience[${counter.experience}]" placeholder="Professional Experience" >
                      <label class="error" for="professional_experience[${counter.experience}]"></label>
                      </div>
                      <div class="col-md-5 form-group">
                      <div class="addButton remove_button" data-section='experience' >
                          <a class="pointer"><img  src="${CI_ROOT}assets/web/images/icons/minusicon.png"  alt="icon" class="mr-3">Remove</a>
                      </div>
                      </div>
                  </div>`); //Add field html
              }
          break;
          case "affiliations":
              //Check maximum number of input fields
              if(counter.affiliations < maxField){ 
                  counter.affiliations++; //Increment field counter
                  $("#"+wrapper).append(`<div class="row">
                  <div class="col-md-7 form-group">
                     <input type="text" class="form-control" name="affiliations[${counter.affiliations}]" placeholder="Affiliations" >
                     <label class="error" for="affiliations[${counter.affiliations}]"></label>
                  </div>
                  <div class="col-md-5 form-group">
                     <div class="addButton remove_button"  data-section='experience'>
                     <a class="pointer"><img  src="${CI_ROOT}assets/web/images/icons/minusicon.png"  alt="icon" class="mr-3">Remove</a>
                     </div>
                  </div>
               </div>`); //Add field html
              }
          break;
          case "jurisdiction":
              //Check maximum number of input fields
              if(counter.jurisdiction < maxField){ 
                  counter.jurisdiction++; //Increment field counter
                  $("#"+wrapper).append(`<div class="row">
                      <div class="col-md-7 form-group">
                      <input type="text" class="form-control" name="jurisdictions_worked[${counter.jurisdiction}]" placeholder="Jurisdictions Worked" >
                      <label class="error" for="jurisdictions_worked[${counter.jurisdiction}]"></label>
                      </div>
                      <div class="col-md-5 form-group">
                      <div class="addButton remove_button" data-section='jurisdiction' >
                          <a class="pointer"><img  src="${CI_ROOT}assets/web/images/icons/minusicon.png"  alt="icon" class="mr-3">Remove</a>
                      </div>
                      </div>
                  </div>`); //Add field html
              }
          break;

          case "remark":
                //Check maximum number of input fields
                if (counter.remark < maxField) {
                    counter.remark++; //Increment field counter
                    $("#" + wrapper).append(`<div class="row">
                    <div class="col-md-7 form-group">
                    <input type="text" class="form-control" name="remark[${counter.remark}]" placeholder="remark" >
                    <label class="error" for="remark[${counter.remark}]"></label>
                    </div>
                    <div class="col-md-5 form-group">
                    <div class="addButton remove_button" data-section='remark' >
                        <a class="pointer"><img  src="${CI_ROOT}assets/web/images/icons/minusicon.png"  alt="icon" class="mr-3">Remove</a>
                    </div>
                    </div>
                </div>`); //Add field html
                }
            break;
            case "conflict":
                //Check maximum number of input fields
                if (counter.conflict < maxField) {
                    counter.conflict++; //Increment field counter
                    $("#" + wrapper).append(`<div class="row">
                    <div class="col-md-7 form-group">
                    <input type="text" class="form-control" name="conflict[${counter.conflict}]" placeholder="Known Conflict" >
                    <label class="error" for="conflict[${counter.conflict}]"></label>
                    </div>
                    <div class="col-md-5 form-group">
                    <div class="addButton remove_button" data-section='conflict' >
                        <a class="pointer"><img  src="${CI_ROOT}assets/web/images/icons/minusicon.png"  alt="icon" class="mr-3">Remove</a>
                    </div>
                    </div>
                </div>`); //Add field html
                }

                break;

          default:
              break;
      }
  });

  $(document).on('click', '.remove_button', function(e) {
    e.preventDefault();
    $(this).parent('div').parent('div').remove(); //Remove field html
    x--; //Decrement field counter
});

    $("#update-arbitrator").on("submit", function(e) {
        e.preventDefault();
        $(".error").html("");
        $(".error").css("display", "none");

        var formdata = new FormData(this);
        postForm(formdata, "institution/profile/updateAction");
    });

 });