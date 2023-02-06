<?php
$hostname = "scanapp-live-db.cb7tsr2dtmip.ap-south-1.rds.amazonaws.com";
$uname = "scanappliveuser";
$pwd = "Wn7LBuigaWVMmZVE4BoC";
$database = "scanapplivedb";

// Create connection
$conn = new mysqli($hostname, $uname, $pwd, $database);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} else {
	
}


$checkHistory = "SELECT * FROM scanapplivedb.visitors_dump where amount='4500' limit 600";
$resultQuery = $conn ->query($checkHistory);
$num = $resultQuery->num_rows;
if($num>0)
{
	while($resultHistory = $resultQuery->fetch_assoc())
	{
		//		echo '<pre>'; print_r($resultHistory); exit;
		$unique_code = $resultHistory['unique_code'];
		$registration_id = $resultHistory['registration_id'];
		$visitor_id = $resultHistory['visitor_id'];
		
		$checks = "select * from scanapplivedb.visitors where visitor_id='$visitor_id' AND registration_id='$registration_id' AND unique_code='$unique_code'";
		$resultData = $conn ->query($checks);
		$countx = $resultData->num_rows;
		if($countx >0){
			
			$date = date('Y-m-d H:i:s', (time() + 15));

			  $min = 1;
			  $max = 500;
			  $sec = ' + '.rand($min,$max).' seconds';
			  
			$dateFix = '2022-08-05 15:02:48';
              //$date = date('Y-m-d H:i:s', ($dateFix + 15));
			 /// echo $newDate = date(strtotime($dateFix ,'+15 sec'));exit;
			 $newDate = date('Y-m-d H:i:s', strtotime($dateFix. $sec));
			
		/*	echo $insertscan = "INSERT into scanapplivedb.scan_logs SET unique_code='$unique_code',user_id='87',visitor_id='$visitor_id' ,category='V',current_zone='Hall 7',device_type='check_in',status='1',type='check_in',role='admin',latitude='1',
	 message='',created_at='$newDate', updated_at='$newDate' ";
		$resultDatas = $conn ->query($insertscan); */
		/*
			echo $insertscan = "INSERT into scanapplivedb.scan_logs SET unique_code='$unique_code',user_id='119',visitor_id='$visitor_id' ,category='V',current_zone='Grande',device_type='check_out',status='1',type='check_out',role='admin',latitude='1',
	 message='',created_at='$newDate', updated_at='$newDate' ";
		$resultDatas = $conn ->query($insertscan); */
			echo '</br>';
			
		}
	}

	
}
?>