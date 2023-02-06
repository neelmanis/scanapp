<?php
$hostname = "localhost";
$uname = "kwebscanappuser";
$pwd = "Uiy71s6*";
$database = "kweb-scanapp-db";

// Create connection
$conn = new mysqli($hostname, $uname, $pwd, $database);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} else {
	
}

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://registration.gjepc.org/getTestVisitorData.php',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 28800, // set this to 8 hours so we dont timeout on big files
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_POSTFIELDS =>'{
"username": "mukesh@kwebmaker.com",
"password": "123456"
}',
  CURLOPT_HTTPHEADER => array(
    'Content-Type: application/json'
  ),
));

$response = curl_exec($curl);

curl_close($curl);
$data = json_decode($response, true);

//echo '<pre>'; print_r($data);
//echo count($data['Response']['Result']);

$dataSize = count($data['Response']['Result']);
echo $totalRecord  = '<h1>Total Records: '.$dataSize.'';

for($i = 0; $i < $dataSize; $i++) 
{
	foreach($data['Response']['Result'] as $row)
    {
		//echo '<pre>'; print_r($row);
	$post_date = $row['post_date'];
	$id = $row['id'];
	$unique_code = $row['unique_code'];
	$registration_id = $row['registration_id'];
	$visitor_id = $row['registration_number'];
	$company = strtoupper(str_replace(array('&amp;','&AMP;'), '&', $row['company']));
	$name = $row['name'];
	$mobile = $row['mobile'];
	$designation = $row['designation'];			
	$photo_url = $row['photo_url'];			
	$category = $row['category'];
	$updateStatus = $row['updateStatus'];
	$isReplaced = $row['isReplaced'];
	$dose1_status = $row['dose1_status'];
	$dose2_status = $row['dose2_status'];
	
	if($dose1_status == "Y" && $dose2_status == "Y"){
	$dose_status = 2;
	} else if($dose1_status != "Y" && $dose2_status == "Y"){
	$dose_status = 2;
	}else if($dose1_status == "Y" && $dose2_status != "Y"){
	$dose_status = 1;
	}else if($dose1_status == "P" && $dose2_status == "P"){
	$dose_status = 0;
	} 
					
	switch ($category) {					 
	case 'VIS':
	$category = "V";
	break;
	case 'IGJME':
	$category = "MV";
	break;
	case 'INTL':
	$category = "OV";
	break;
	case 'EXH':
	$category = "E";
	break;
	case 'EXHM':
	$category = "ME";
	break;
	case 'CONTR':
	$agency_category = $row['agency_category'];
	$committee = $row['committee'];

	if($agency_category =="CM"){
	$category = $committee;
	} else {
	$category = $agency_category;
	}
	break;
	default:
	$category="";
	break;
	}
	
	/* Download Image From URL */
	$pathInfoName = pathinfo($photo_url); // Get File name & Extension
//	echo '<pre>'; print_r($pathInfoName);
	$imgName = $pathInfoName['basename']; // get image name
	$imgNameWithoutExtension = $pathInfoName['filename']; // get image name without extension
	$imgNameWithExtension = $pathInfoName['extension']; // get image name without extension
//	echo '==>'.$imgsize_arr = getimagesize($imgName);
	
	/*list($width, $height, $type, $attr) = getimagesize($photo_url); 
	if (!empty($width) && !empty($height)) {
    echo "Valid Image";
    }else{
    echo "In Valid Image";
    }
	$arr = array('h' => $height, 'w' => $width, 't' => $type, 'a' => $attr );
	print_r($arr);
	*/

	$photo_name = $unique_code.".".$imgNameWithExtension;	
	$save_loc = "images/".$photo_name;
	$imgagesName = file_get_contents($photo_url,true);
	$msg = file_put_contents($save_loc, $imgagesName);
	if($msg)
	{
        echo "File downloaded successfully";
    }
    else
    {
        echo "File downloading failed.";
    }
	// Use file_get_contents() function to get the file from url and use file_put_contents() function to save the file by using base name
	/* Download Image From URL */
    
	$doCheck  = "SELECT id,unique_code,registration_id FROM `visitors` WHERE unique_code='$unique_code'";
	$doResult = $conn->query($doCheck);
	$countxx = $doResult->num_rows;
	if($countxx > 0){
	 echo ' UPDATE QUERY';
	} else {
    $sql = "INSERT INTO `visitors`(`unique_code`, `registration_id`, `visitor_id`, `company`, `name`, `mobile`, `email`, `designation`, `photo_url`, `photo_name`,`category`, `dose_status`, `updateStatus`, `isReplaced`, `post_date`, `status`,  `source`, `created_at`) VALUES ('$unique_code','$registration_id','$visitor_id','$company','$name','$mobile','$email','$designation','$photo_url','$photo_name','$category','$dose_status','$updateStatus','$isReplaced','$post_date','$status','online',NOW())"; 
    $result = $conn->query($sql);
	if(!$result){ die('Error : ' . mysql_error());  }
	}
	}
}
?>