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

$sqlx = "SELECT * FROM scanapp.visitors order by post_date desc limit 0,10"; /* Visitor */
$sqlDatas = $conn->query($sqlx);
if($username=="mukesh@kwebmaker.com" && $password=="123456"){
	if($sqlDatas->num_rows > 0) {
				$strResponse = array();
				while($result = $sqlDatas->fetch_assoc())
				{					
					$post_date = $result['post_date'];
					$id = $result['id'];
					$unique_code = $result['unique_code'];
					$registration_id = $result['registration_id'];
					$RegistrationNumber = $result['RegistrationNumber'];
					$company = strtoupper(str_replace(array('&amp;','&AMP;'), '&', $result['company']));
					$name = $result['Name'];
					$mobile = $result['mobile'];
					$pan_no = $result['pan_no'];
					$status = $result['status'];
					$email = $result['email'];
					$designation = $result['designation'];			
					$photo_url = $result['photo_url'];			
					$category = $result['category'];
					$updateStatus = $result['updateStatus'];
					$isReplaced = $result['isReplaced'];
					if($result['dose1_status'] == "Y" && $result['dose2_status'] == "Y"){
						$dose_status = 2;
					}else if($result['dose1_status'] != "Y" && $result['dose2_status'] == "Y"){
						$dose_status = 2;
					}else if($result['dose1_status'] == "Y" && $result['dose2_status'] != "Y"){
						$dose_status = 1;
					}else if($result['dose1_status'] == "P" && $result['dose2_status'] == "P"){
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
					        $agency_category = $result['agency_category'];
					        if($designation == "CHAIRMAN" || $designation == "PROPRIETOR" || $designation =="DIRECTOR" || $designation == "PARTNER" || $designation == "CEO" || $designation == "MANAGING DIRECTOR" ){
								$category = "OE";
					        }else{
					        	$category = "E";
					        }

					        if($agency_category =="S"){
							  $category = "ES";
							}else{
							   $category = $category;
							}
						   
					  break;
					  case 'EXHM':
						   $category = "ME";
					  break;
					  case 'CONTR':
							$agency_category = $result['agency_category'];
							$committee = $result['committee'];

							if($agency_category =="CM"){
							  $category = $committee;
							}else{
							   $category = $agency_category;
							}
					  break;
					  default:
						   $category="";
					  break;
					}
									
					array_push($strResponse,
                    array(
                        "post_date" => $post_date, 
                        "unique_code" => $unique_code,
                        "registration_id" => $registration_id, 
                        "registration_number" => $RegistrationNumber, 
                        "company" => $company, 
                        "name" => $name, 
                        "mobile" => $mobile,
                        "pan_no" => $pan_no,
                        "email" => $email,
                        "status" => $status,
                        "designation" => $designation,
                        "photo_url" => $photo_url,
                        "category" => $category,
                        "dose_status" => $dose_status,
                        "updateStatus"=>$updateStatus,
                        "isReplaced"=>$isReplaced
                        )
                    );
															
				$download = "update gjepclivedatabase.globalExhibition set isDataPosted='Y' where id='$id'";
				$updates = $conn->query($download);	
				
				}
				$conn->close();
				$strResponse = array(
								"Result"=>$strResponse,
								"query"=>$download,
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
?>