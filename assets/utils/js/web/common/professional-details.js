$(document).ready(function(){

    $("#add-professional-details").on("submit",function(e){
     e.preventDefault();        
     $(".error").html("");
     $(".error").css("display","none");
     var formdata = new FormData(this);
     var postLink = 'common/addProfessionalDetails';
     postForm(formdata,postLink);
   });

    var maxField = 10; //Input fields increment limitation
 
    let counter = {qualification:0,experience:0,affiliations:0,jurisdiction:0}
    
    //Once add button is clicked
    $(".add_more").click(function(){
       
        var wrapper = $(this).data('section');
        switch (wrapper) {
            case "qualification":
                //Check maximum number of input fields
                if(counter.qualification < maxField){ 
                    counter.qualification++; //Increment field counter
                    $("#"+wrapper).append(`<div class="row">
                        <div class="col-md-6 form-group">
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
    
    //Once remove button is clicked
    $(document).on('click', '.remove_button', function(e){
        e.preventDefault();
        var section = $(this).data('section');
        $(this).parent('div').parent('.row').remove(); //Remove field html
        // x--; //Decrement field counter
        switch (section) {
            case "qualification":
                counter.qualification--;
            break;
            case "experience":
                counter.experience--;
            break;    
            case "affiliations":
                counter.affiliations--;
            break;
            case "worked":
                counter.jurisdiction--;
            break;    
            default:

            break;
        }
    });


 });