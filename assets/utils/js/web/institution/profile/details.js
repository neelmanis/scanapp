$(document).ready(function(){
   $(".imageChangeHandle").click(function(){
       $("#photo").click();
   });

  
   $("#profile-details-update").on("submit",function(e){
    e.preventDefault();        
    $(".error").html("");
    $(".error").css("display","none");

    var formdata = new FormData(this);

    var postLink = 'institution/profile/detailsUpdate';
    postForm(formdata,postLink);
  });
 
    var maxField = 20; //Input fields increment limitation
    let counter = {contact:0,email:0}
    //Once add button is clicked
    $(".add_more").click(function(){
       
        var wrapper = $(this).data('section');
        switch (wrapper) {
            case "contact":
                //Check maximum number of input fields
                if(counter.contact < maxField){ 
                    counter.contact++; //Increment field counter
                    $("#"+wrapper).append(`
                    <div class="row">
                        <div class="col-10">
                            <div class=" form-group mb-0">
                                <input type="text" class="form-control numeric mt-2" maxlength="10" name="contact_number[${counter.contact}]" placeholder="Contact Number" autocomplete="false" >
                                <label class="error" for="contact_number[${counter.contact}]" ></label>
                            </div>
                        </div>
                        <div class="col-2">
                   
                            <div class="addButton remove_button" data-section='contact' >
                            <a class="pointer"><img  src="${CI_ROOT}assets/web/images/icons/minusicon.png"  alt="icon" class="mr-3"></a>
                            </div>
                        </div>
                    </div>
                    `); 
                    //Add field html
                }
            break;
            case "emailid":
                //Check maximum number of input fields
                if(counter.email < maxField){ 
                    counter.email++; //Increment field counter
                    $("#"+wrapper).append(`
                    <div class="row">
                    <div class="col-10">
                        <div class=" form-group mb-0">
                            <input type="text" class="form-control mt-2" name="email[${counter.email}]" placeholder="E-mail ID" autocomplete="false" >
                            <label class="error" for="email[${counter.email}]" ></label>
                        </div>
                    </div>
                    <div class="col-2">
                        
                        <div class="addButton remove_button" data-section='email' >
                        <a class="pointer"><img  src="${CI_ROOT}assets/web/images/icons/minusicon.png"  alt="icon" class="mr-3"></a>
                        </div>
                    </div>
                </div>
                `); //Add field html
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
    });

    $(document).on("click",".removeItem",function(e){
        e.preventDefault();
         let key = $(this).data('key');
         let section = $(this).data('section');
         let row_id = $(this).data('row_id');
         let data = {key:key,section:section,row_id:row_id};
         var postLink = 'institution/profile/removeProfileItemAction';
         var ref = $(this);
         confirmPostData(data,postLink,function(response){
           if(response.status == "success"){
             swal({
               title: response.message,
               icon: "success",
               buttons: true,
               dangerMode: false,
               timer: 3000
             }).then(function(){
               ref.parent().parent().remove();
             });
           }
        });
    })
});

function previewFile(input,previewImg){
    
    var file = $("input[type=file]").get(0).files[0];

    if(file){
        var reader = new FileReader();

        reader.onload = function(){
            $("#"+previewImg).attr("src", reader.result);
        }

        reader.readAsDataURL(file);
    }
}


