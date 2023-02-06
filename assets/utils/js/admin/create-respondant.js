$(document).ready(function() {


    $("#submit-respondant-details").on("submit", function(e) {
        e.preventDefault();
        $(".error").html("");
        $(".error").css("display", "none");
        var formdata = new FormData(this);
        var postLink = 'cases/createCaseStepThreeAction';
        postForm(formdata, postLink);
    });

    // $("#respondant_email").on("blur", function(e) {
    //     e.preventDefault();
    //     let email = $(this).val();
    //     let userType = "user";
    //     if (validateEmail(email)) {
    //         $.ajax({
    //             type: 'POST',
    //             data: { email: email, userType: userType },
    //             url: CI_ROOT + 'institution/dashboard/checkUser',
    //             dataType: "json",
    //             success: function(result) {
    //                 if (result.status == "exist") {
    //                     $("#respondant_name").val(result.data.name).attr("readonly", true);
    //                     $("#respondant_phone").val(result.data.mobile).attr("readonly", true);
    //                     $("#respondant_address").val(result.data.address).attr("readonly", true);
    //                 } else if (result.status == "notExist") {
    //                     $("#respondant_name").val("").attr("readonly", false).focus();
    //                     $("#respondant_phone").val("").attr("readonly", false);
    //                     $("#respondant_address").val("").attr("readonly", false);
    //                 } else {
    //                     swal({
    //                         title: result.title,
    //                         icon: result.icon,
    //                         text: result.message
    //                     });
    //                 }
    //             }
    //         });
    //         $('label[for="respondant_email"]').hide().text("");
    //     } else {
    //         $(this).focus();
    //         $('label[for="respondant_email"]').show().text("Please enter valid e-mail address");
    //     }
    // });
    $(document).on("blur", ".person_email", function(e) {
        e.preventDefault();
        let email = $(this).val();

        let tempId = $(this).data('id');
        let userType = $("#type" + tempId).val();
        $("#person_name" + tempId).val("").attr("readonly", false).focus();
        $("#person_phone" + tempId).val("").attr("readonly", false);
        $("#person_address" + tempId).val("").attr("readonly", false);
        // if (validateEmail(email)) {
        //     $.ajax({
        //         type: 'POST',
        //         data: { email: email, userType: userType },
        //         url: CI_ROOT + 'institution/dashboard/checkUser',
        //         dataType: "json",
        //         success: function(result) {
        //             if (result.status == "exist") {
        //                 $("#person_name" + tempId).val(result.data.name).attr("readonly", true);
        //                 $("#person_phone" + tempId).val(result.data.mobile).attr("readonly", true);
        //                 $("#person_address" + tempId).val(result.data.address).attr("readonly", true);
        //             } else if (result.status == "notExist") {
        //                 $("#person_name" + tempId).val("").attr("readonly", false).focus();
        //                 $("#person_phone" + tempId).val("").attr("readonly", false);
        //                 $("#person_address" + tempId).val("").attr("readonly", false);
        //             } else {
        //                 swal({
        //                     title: result.title,
        //                     icon: result.icon,
        //                     text: result.message
        //                 });
        //             }
        //         }
        //     });
        //     $('label[for="person_email[]"]').hide().text("");
        // } else {

        //     $('label[for="person_email[]"]').show().text("Please enter valid e-mail address");
        // }
    });


    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    var maxField = 10; //Input fields increment limitation
    var addButton = $('.addMore'); //Add button selector
    var wrapper = $('.field_wrapper'); //Input field wrapper

    var x = 0; //Initial field counter is 1

    //Once add button is clicked
    $(addButton).click(function() {
        //Check maximum number of input fields
        if (x < maxField) {
            x++; //Increment field counter
            $(wrapper).append(`
           
            <div class="row ">
            <div class="col-12">
                <div class="border mb-3"></div>
            </div>
            <div class="col-md-6 form-group">
            
                <label>Select Authorized Person</label>
                <select class="form-control" name="type[${x}]" id="type${x}" >
                    <option value="">Select</option>
                    <option value="representative">Representative</option>
                    <option value="counsel">Counsel</option>
                </select>
                <label class="error" for="type[${x}]"></label>
            </div>
            <div class="col-md-6 ">
                        
                    </div>
           
            <div class="col-md-6 form-group">
                <label>Email</label>
                <input type="text" class="form-control person_email" name="person_email[${x}]" id="person_email${x}" data-id="${x}" placeholder="Email">
                <label class="error" for="person_email[${x}]"></label>
            </div>
            <div class="col-md-6 form-group">
                <label>Full Name</label>
                <input type="text" class="form-control" name="person_name[${x}]" id="person_name${x}"  placeholder="Full Name" readonly>
                <label class="error" for="person_name[${x}]"></label>
            </div>

            <div class="col-md-6 form-group">
                <label>Mobile</label>
                <input type="text" class="form-control numeric" name="person_phone[${x}]" id="person_phone${x}" maxlength="10" placeholder="Mobile Number" readonly>
                <label class="error" for="person_phone[${x}]"></label>
            </div>
            <div class="col-md-6 form-group">
                <label>Address</label>
                <input type="text" class="form-control" name="person_address[${x}]" id="person_address${x}" placeholder="Address" readonly>
                <label class="error" for="person_address[${x}]"></label>
            </div>
            <div class="col-md-6 form-group d-flex align-items-center">
            <div class="addButton remove_button">
            <a class="pointer" href="javascript:void(0)"><img src="${CI_ROOT}assets/web/images/icons/minusicon.png" alt="icon" class="mr-2">Remove</a>
            </div>
        </div>
        </div>`);
        }
    });

    //Once remove button is clicked
    $(wrapper).on('click', '.remove_button', function(e) {
        e.preventDefault();
        $(this).parent('div').parent('div').remove(); //Remove field html
        x--; //Decrement field counter
    });

});