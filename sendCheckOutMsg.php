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

function send_sms($message,$mobile_no) {
	$message=str_replace(" ","%20",$message);
	$url = 'http://sms.gjepc.org/submitsms.jsp?user=TheGem&key=f2474d18afXX&mobile='.$mobile_no.'&message='.$message.'&senderid=GJEPCC&accusage=1';
    $ch = curl_init();
    $timeout = 5;
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST,false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER,false);
    curl_setopt($ch, CURLOPT_MAXREDIRS, 10);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
    $data = curl_exec($ch);
    curl_close($ch);
    return $data;
}

//$checkHistory = "SELECT mobile,unique_code,check_outMsg FROM scanapp.unique_scan_logs where check_outMsg='P' and (category='E' || category='V') limit 3";
$checkHistory = "SELECT mobile,unique_code,check_outMsg FROM scanapp.unique_scan_logs where check_outMsg='P' and category='V' limit 500";
$resultQuery = $conn ->query($checkHistory);
$num = $resultQuery->num_rows;

$signature_show = 'IIJS Signature 2023';
$tritiya_show = 'IIJS Tritiya Show 2023';
$show_date = '17-20 March 2023';
$show_city = 'Bangalore';
$links = 'https://registration.gjepc.org/single_visitor.php';
$amount = '1000';

if($num>0)
{	$sendMsg = 0;
	while($resultHistory = $resultQuery->fetch_assoc())
	{
		//echo '<pre>'; print_r($resultHistory); exit;
		$mobile = $resultHistory['mobile'];
		$unique_code = $resultHistory['unique_code'];
		
		//$message = "Thank you for visiting ".$signature_show.".Visitor Registration for ".$tritiya_show." is from ".$show_date." in ".$show_city." is Live, please click here ".$links." for registration, Team GJEPC";		
		$message = "Thank you for visiting ".$signature_show.". Visitor Registration for ".$tritiya_show." is from ".$show_date." in ".$show_city." is Live, please click here ".$links." for registration to avail Rs.".$amount." discount, Team GJEPC";		
		$otp_sendStatus = send_sms($message,$mobile);
		if($otp_sendStatus){
		$UpdateFlag = "UPDATE scanapp.unique_scan_logs SET check_outMsg='Y',check_outMsgTime=NOW() WHERE unique_code='$unique_code'";
		$result = $conn ->query($UpdateFlag);
		if(!$result){ die(" Error : " . $conn -> error); }	
		$sendMsg++; 
		}		
	}
	echo "Total Message Send : ".$sendMsg."<br/><br/>"; 
}
?>
