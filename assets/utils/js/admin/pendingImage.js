var filterOptions = function(data){};

var columns =  [{"targets": [0],"orderable":false}, {"targets": [1,2,3,4,5],"orderable":true},{"targets":[0,1],"width":120},{"targets":[2],"width":80},{"targets":[3],"width":50},{"targets":[4],"width":50},{"targets":[5],"width":80}];

$(document).ready(function(){
  //dataTables(tableName,paging,scrollX,scrollY,processing,serverside,recordURL,filterData,columns,no_of_records)
  table = dataTables("pendingImagesTable",true,true,false,true,true,"visitors/getPendingImageRecords",filterOptions,columns,25);
});