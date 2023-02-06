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
            $(wrapper).append('<div class="row ">'+
            '<div class="col-md-6 form-group mb-4">'+
                '<label class="labelType1 mb-2">My Rules</label>'+
                '<div class="borderType2 mb-4"></div>'+
                '<div class="form-group">'+
                '<div class="d-flex flex-wrap align-items-center">'+
                '<div class="uploadType1">'+
                '<input type="file" name="rule'+x+'" id="rule'+x+'" class="form-control">'+
                '<img src="'+CI_ROOT+'assets/web/images/icons/upload.png" alt="Icon" class="uploadImg">'+
                '<span class="paraType3 ml-3">Upload My Rules</span>'+
                '<label class="error w-100" for="rule'+x+'"></label>'+
                '</div>'+
                '</div>'+
                '</div>'+
                '</div>'+
                '<div class="col-md-6 form-group mb-4">'+
                '<label class="labelType1 mb-2">My Fees Schedules</label>'+
                '<div class="borderType2 mb-4"></div>'+
                '<div class="form-group">'+
                '<div class="d-flex flex-wrap align-items-center">'+
                '<div class="uploadType1">'+
                '<input type="file" name="schedule'+x+'" id="schedule'+x+'" class="form-control">'+
                '<img src="'+CI_ROOT+'assets/web/images/icons/upload.png" alt="Icon" class="uploadImg">'+
                '<span class="paraType3 ml-3">Upload Fees Schedule</span>'+
                '<label class="error w-100" for="schedule'+x+'"></label>'+
                '</div>'+
                '</div>'+
                '</div>'+
                '</div>'+
                '<div class="col-md-6 form-group mb-4">'+
                '<label class="labelType1 mb-2">My Arbitration Panel</label>'+
                '<div class="borderType2 mb-4"></div>'+
                '<div class="form-group">'+
                '<div class="d-flex flex-wrap align-items-center">'+
                '<div class="uploadType1">'+
                '<input type="file" name="arbitrationpanel'+x+'" id="arbitrationpanel'+x+'" class="form-control">'+
                '<img src="'+CI_ROOT+'assets/web/images/icons/upload.png" alt="Icon"class="uploadImg">'+
                '<span class="paraType3 ml-3">Upload Arbitration Panel</span>'+
                '<label class="error w-100" for="arbitrationpanel'+x+'"></label>'+
                '</div>'+
                '</div>'+
                '</div>'+
                '</div>'+
                '<div class="col-md-6 form-group mb-4">'+
                '<label class="labelType1 mb-2">Other Document</label>'+
                '<div class="borderType2 mb-4"></div>'+
                '<div class="form-group">'+
                '<div class="d-flex flex-wrap align-items-center">'+
                '<div class="uploadType1">'+
                '<input type="file" name="other'+x+'" id="other'+x+'" class="form-control">'+
                '<img src="'+CI_ROOT+'assets/web/images/icons/upload.png" alt="Icon" class="uploadImg">'+
                '<span class="paraType3 ml-3">Upload Arbitration Panel</span>'+
                '<label class="error w-100" for="other'+x+'"></label>'+
                '</div>'+
                '</div>'+
                '</div>'+
                '</div>'+
                '<div class="form-group col-md-12">'+
                '<input type="hidden" name="countcheck[]" />'+
                '<div class="remove_button addButton">'+
                '<a class="pointer" href="javascript:void(0)"><img src="'+CI_ROOT+'assets/web/images/icons/minusicon.png" alt="icon" class="mr-2">Remove</a>'+
                '</div>'+
                '</div>'+
                '</div>'); //Add field html
        }
    });
    
    //Once remove button is clicked
    $(wrapper).on('click', '.remove_button', function(e){
        e.preventDefault();
        $(this).parent('div').parent('div').remove(); //Remove field html
        x--; //Decrement field counter
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