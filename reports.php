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

$json = file_get_contents('php://input');
$obj = json_decode($json,true);

$date = $_REQUEST['date'];

$sqlx = "SELECT count(*) as 'count',category FROM scanapp.unique_scan_logs where 1 and day='$date' group by category";
$sqlDatas = $conn->query($sqlx);
$countx = $sqlDatas->num_rows;
if($sqlDatas->num_rows > 0) 
	{
				$strResponse = array();
				while($result = $sqlDatas->fetch_assoc())
				{
				$category = $result['category'];
				$count = $result['count'];
				
				array_push($strResponse,
                    array(
                        "category" => $category,
                        "count" => $count
                        )
                    );			
				}
				header('Content-type: application/json');
				echo json_encode(array("Response"=>$strResponse));
	} else {
		$strResponse=array(
								"Result"=>'',
								"Message"=>'No Record Found.',
								"status"=>"false"
									);
	}
?>