$(document).ready(function() {
    $("#arbitration-selection").on("submit", function(e) {
        e.preventDefault();
        $(".error").html("");
        $(".error").css("display", "none");
        var formdata = new FormData(this);
        var postLink = 'cases/selectArbitratorAction';
        postForm(formdata, postLink);
    });


});