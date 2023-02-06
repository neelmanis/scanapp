<?php
$hostname = "scanapp-gjepc-kwebmaker.cb7tsr2dtmip.ap-south-1.rds.amazonaws.com";
$uname = "admin";
$pwd = "jlzcTdnoZiqFJXlxmcY5";
$database = "carpass";

// Create connection
$conn = new mysqli($hostname, $uname, $pwd, $database);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} else {
	
}

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://registration.gjepc.org/getParkingData.php',
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

//echo '<pre>'; print_r($data); exit;
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
	$company = strtoupper(str_replace(array('&amp;','&AMP;'), '&', $row['company']));		
	$category = $row['category'];
	$gate_no = $row['gate_no'];
	$pan_no = $row['pan_no'];
	$area = $row['area'];
	$hall_no = $row['hall_no'];
	$status = $row['status'];
	$car_pass = $row['car_pass'];
	$ground_no = $row['ground_no'];			
	$ban_reason = $row['ban_reason'];				
	$vehicle_no = $row['vehicle_no'];
	$vehicle_parking_date = $row['vehicle_parking_date'];
	$arrival_time = $row['arrival_time'];
    
	$doCheck  = "SELECT id,unique_code,registration_id FROM carpass.`visitors` WHERE unique_code='$unique_code'";
	$doResult = $conn->query($doCheck);
	$countxx = $doResult->num_rows;
	if($countxx > 0){
	 echo ' UPDATE QUERY';
	} else {
	

    $sql = "INSERT INTO carpass.`visitors`(`unique_code`, `registration_id`, `company`, `category`, `gate_no`, `area`, `hall_no`, `post_date`, `status`, `source`, `created_at`,`car_pass`,`ground_no`,`ban_reason`,`vehicle_no`,`vehicle_parking_date`,`arrival_time`) VALUES ('$unique_code','$registration_id','$company','$category','$gate_no','$area','$hall_no','$post_date','$status','online',NOW(),'$car_pass','$ground_no','$ban_reason','$vehicle_no','$vehicle_parking_date','$arrival_time')";
    $result = $conn->query($sql);
	if(!$result){ die('Error : ' . mysql_error());  }
	}
	}
}
?>