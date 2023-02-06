var table;
$(document).ready(function(){
  //datatable
  table = $('#CategoryTable').DataTable({
    "paging":   true,
    "scrollX": true,
    // "scrollY": 250,
    "processing": true, //Feature control the processing indicator.
    "serverSide": true, //Feature control DataTables' server-side processing mode.
    "order": [], //Initial no order.
    // Load data for the table's content from an Ajax source
    "ajax": {
      "url": CI_ROOT+'category/getCategoryLists',
      "type": "POST",
	  "data": function ( data ) {
        data.categoryStatus = $('#categoryStatus').val();
      }
    },
    "columnDefs": [
      { 
        "targets": "_all",
        "orderable": false,
      },
      { "targets": [0], "width":20},
      { "targets": [3], "width":50},
    ],
    dom: 'Bfrtip',
    buttons: []
  });
	
	  $('#btn-filter').click(function(e){ //button filter event click
      e.preventDefault();
      table.ajax.reload();  //just reload table
	  });

	  $('#btn-reset').click(function(e){ //button reset event click
		e.preventDefault();
		$('#form-filter')[0].reset();
		table.ajax.reload();  //just reload table
	  });
	
	jQuery('#title').on('keyup',function(event){
		//var value = String.fromCharCode(event.keyCode).toLowerCase();
		var $this = jQuery(this);

		var text = $this.val();
		text = text.replace(/[&\/\\#, +()$~%.'":;*?<>{}]/g,'-').toLowerCase();
		jQuery('input[name=slug]').val(text);
	});
	
	
	$("#add_category").on("submit",function(e){
    e.preventDefault();        
    $(".error").html("");
    $(".error").css("display","none");
    
    //var formdata = $(this).serialize();
	var formdata = new FormData(this);
    
    $.ajax({
      type:'POST',
      data:formdata,
      url:CI_ROOT+"category/addAction",
	  contentType: false,
      processData: false,
      dataType: "json",
	  mimeType : 'multipart/form-data',	 
			
      beforeSend:function(){
        $(".preloader").show(); 
      },
      success:function(result){      
        $(".preloader").hide();
        if(result['status'] == "success"){
          window.location.href = CI_ROOT + 'category/lists';
        }else if(result['status'] == "invalid"){
          $(".preloader").hide(); 
          swal({
            title: "Invalid Request!",
            icon: "error",
            text: "Something went wrong."
          });
        }else{
          $.each(result, function(i, v) {
            $("label[for='"+i+"']").html(v);
          });
                    
          var keys = Object.keys(result);
          $(".error").css("display","block");
          $('input[name="'+keys[0]+'"]').focus();
          $(".preloader").hide(); 
        }
      }
    });
  });
	
	
	$("#update_category").on("submit",function(e){
    e.preventDefault();        
    $(".error").html("");
    $(".error").css("display","none");
    
    var formdata = new FormData(this);
    
    $.ajax({
	  type:'POST',
      data:formdata,
      url:CI_ROOT+"category/updateAction",
	  contentType: false,
      processData: false,
      dataType: "json",
	  mimeType : 'multipart/form-data',	
	  
      beforeSend:function(){
        $(".preloader").show(); 
      },
      success:function(result){      
        $(".preloader").hide();
        if(result['status'] == "success"){
          window.location.href = CI_ROOT + 'category/lists';
        }else if(result['status'] == "invalid"){
          $(".preloader").hide(); 
          swal({
            title: "Invalid Request!",
            icon: "error",
            text: "Something went wrong."
          });
        }else{
          $.each(result, function(i, v) {
            $("label[for='"+i+"']").html(v);
          });
                    
          var keys = Object.keys(result);
          $(".error").css("display","block");
          $('input[name="'+keys[0]+'"]').focus();
          $(".preloader").hide(); 
        }
      }
    });
  });
  
});