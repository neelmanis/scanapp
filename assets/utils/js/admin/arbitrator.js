var filterOptions = function(data){};

var columns =  [{"targets": [0],"orderable":false}, {"targets": [1,2,3,4,5],"orderable":true},{"targets":[0],"width":50},{"targets":[1],"width":80},{"targets":[2],"width":200},{"targets":[3],"width":200},{"targets":[4],"width":150},{"targets":[5],"width":80}];

$(document).ready(function(){
  //dataTables(tableName,paging,scrollX,scrollY,processing,serverside,recordURL,filterData,columns,no_of_records)
  table = dataTables("arbitratorTable",true,true,false,true,true,"arbitrator/page",filterOptions,columns,25);
  var addButton = $('.addMore_agreement');
    var maxField = 10;
    var wrapper = $('.field_wrapper_agreement');
    var x = 0;
    $(addButton).click(function() {
        //Check maximum number of input fields

        if (x < maxField) {
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
    $(document).on('click', '.remove_button', function(e) {
        e.preventDefault();
        $(this).parent('div').parent('div').remove(); //Remove field html
        x--; //Decrement field counter
    });

    $("#add-arbitrator").on("submit", function(e) {
        e.preventDefault();
        $(".error").html("");
        $(".error").css("display", "none");

        var formdata = new FormData(this);

        var postLink = 'arbitrator/addArbitratorAction';
        postForm(formdata, postLink);
    });
    $("#update_arbitrator").on("submit", function(e) {
        e.preventDefault();
        $(".error").html("");
        $(".error").css("display", "none");

        var formdata = new FormData(this);
        postForm(formdata, "arbitrator/updateAction");
    });

    let counter = {qualification:0,experience:0,affiliations:0,jurisdiction:0}
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
                    <div class="col-md-6 form-group  mb-3"">
                        <label class="control-label"><strong>Qualifications</strong></label>
                        <input type="text" class="form-control" name="qualifications[${counter.qualification}]" placeholder="Qualifications" >
                        <label class="error" for="qualifications[${counter.qualification}]"></label>
                    </div>
                    <div class="col-md-6 form-group">
                        <div class="addButton remove_button" data-section='qualification' >
                        <a class="pointer"><img  src="${CI_ROOT}assets/web/images/icons/minusicon.png"  alt="icon" class="mr-3">Remove</a>
                        </div>
                    </div>
                </div>`); //Add field html
            }
        
            break;
            case "experience":
                //Check maximum number of input fields
                if(counter.experience < maxField){ 
                    counter.experience++; //Increment field counter
                    $("#"+wrapper).append(`<div class="row">
                        <div class="col-md-6 form-group">
                        <input type="text" class="form-control" name="professional_experience[${counter.experience}]" placeholder="Professional Experience" >
                        <label class="error" for="professional_experience[${counter.experience}]"></label>
                        </div>
                        <div class="col-md-6 form-group">
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
                    <div class="col-md-6 form-group">
                       <input type="text" class="form-control" name="affiliations[${counter.affiliations}]" placeholder="Affiliations" >
                       <label class="error" for="affiliations[${counter.affiliations}]"></label>
                    </div>
                    <div class="col-md-6 form-group">
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
                        <div class="col-md-6 form-group">
                        <input type="text" class="form-control" name="jurisdictions_worked[${counter.jurisdiction}]" placeholder="Jurisdictions Worked" >
                        <label class="error" for="jurisdictions_worked[${counter.jurisdiction}]"></label>
                        </div>
                        <div class="col-md-6 form-group">
                        <div class="addButton remove_button" data-section='jurisdiction' >
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

});