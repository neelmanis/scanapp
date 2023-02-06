<?php 
$hostname = "scanapp-gjepc-kwebmaker.cb7tsr2dtmip.ap-south-1.rds.amazonaws.com";
$uname = "admin";
$pwd = "jlzcTdnoZiqFJXlxmcY5";
$database = "scanapp";

// Create connection
$conn = new mysqli($hostname, $uname, $pwd, $database);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} else {
	
}

if($_SERVER['REQUEST_METHOD'] == "POST"){

$json = file_get_contents('php://input');
$obj = json_decode($json,true);

$username = $obj['username'];
$password = $obj['password']; 

$sqlx = "SELECT u.id,v.unique_code,v.registration_id,v.visitor_id,v.company,v.pan_no,u.category,u.created_at,u.discount FROM visitors v right JOIN unique_scan_logs u ON v.unique_code=u.unique_code where u.category='V' AND u.discount='P' order by u.created_at asc limit 0,500";
$sqlDatas = $conn->query($sqlx);
if($username=="neelmani@kwebmaker.com" && $password=="123456"){
	if($sqlDatas->num_rows > 0) {
				$strResponse = array();
				while($result = $sqlDatas->fetch_assoc())
				{		
					$id = $result['id'];
					$unique_code = $result['unique_code'];
					$registration_id = $result['registration_id'];
					$visitor_id = $result['visitor_id'];
					$pan_no = trim($result['pan_no']);
														
					array_push($strResponse,
                    array(
                        "unique_code" => $unique_code,
                        "registration_id" => $registration_id, 
                        "visitor_id" => $visitor_id,
                        "pan_no" => $pan_no
                        )
                    );
															
				$download = "update unique_scan_logs set discount='Y' where unique_code='$unique_code' AND category='V' AND id='$id'";
				$updates = $conn->query($download);
				}
				$conn->close();
				
				$strResponse = array(
								"Result"=>$strResponse,
								"query"=>'', 
								"Message"=>'Success',
								"status"=>"true"
								);
	} else {
				$strResponse=array(
								"Result"=>'',
								"Message"=>'No Record Found.',
								"status"=>"false"
									);
	}
	} else {
				$strResponse=array(
								"Result"=>'',
								"Message"=>'Username & Password does not match.',
								"status"=>"false"
									);
		}	
	} else {
				$strResponse=array(
								"Result"=>'',
								"Message"=>'Use POST method.',
								"status"=>"false"
									);
	}
	header('Content-type: application/json');
     echo json_encode(array("Response"=>$strResponse));


/*
	$json = file_get_contents('php://input');
	$obj = json_decode($json,true);

	header('Content-type: application/json');
	$sqlx = "SELECT u.id,v.unique_code,v.registration_id,v.visitor_id,v.company,v.pan_no,u.category,u.created_at,u.discount FROM visitors v right JOIN unique_scan_logs u ON v.unique_code=u.unique_code where u.category='V' AND u.discount='P' order by u.created_at asc limit 0,2";
	$sqlDatas = $conn->query($sqlx);
	$count = $sqlDatas->num_rows;
	if($count > 0) {
		while($result = $sqlDatas->fetch_assoc())
		{
					$arr[]=$result;
					$unique_code = $result['unique_code'];
					$id = $result['id'];

					echo $download = "update unique_scan_logs set discount='Y' where unique_code='$unique_code' AND category='V' AND id='$id'"; 
					$sqlDownload = $conn->query($download);		
		}
		echo json_encode(['status'=>'true','data'=>$arr,'result'=>'found']);
	} else {
		echo json_encode(['status'=>'true','data'=>'No Data found','result'=>'not found']);
	}
*/
?>