var table;
$(document).ready(function(){
  //datatable
  
  
  table = $('#bannedTable').DataTable({
    "paging":   true,
    "scrollX": true,
    // "scrollY": 250,
    "processing": true, //Feature control the processing indicator.
    "serverSide": true, //Feature control DataTables' server-side processing mode.
    "order": [], //Initial no order.
    // Load data for the table's content from an Ajax source
    "ajax": {
      "url": CI_ROOT+'visitors/banned/getBannedRecords',
      "type": "POST",
	  "data": function ( data ) {
        data.status = $('#status').val();
      }
    },
    "columnDefs": [
      { 
        "targets": "_all",
        "orderable": false,
      },
      { "targets": [0], "width":150},
      { "targets": [3], "width":100},
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
  
});