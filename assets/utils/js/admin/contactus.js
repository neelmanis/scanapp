var filterOptions = function(data){};

var columns =  [{"targets": [0],"orderable":false}, {"targets": [1,2,3,4],"orderable":true},{"targets":[0],"width":50},{"targets":[1],"width":80},{"targets":[2,3],"width":120},{"targets":[4],"width":80}];

$(document).ready(function(){
  //dataTables(tableName,paging,scrollX,scrollY,processing,serverside,recordURL,filterData,columns,no_of_records)
  table = dataTables("contactUsTable",true,true,false,true,true,"contactus/page",filterOptions,columns,25);



    
    
    

});