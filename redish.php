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

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$redis = new Redis();
$redis->connect('scanapp-redis-node.kkquph.ng.0001.aps1.cache.amazonaws.com', 6379);
$redis->auth('REDIS_PASSWORD');

$key = 'PRODUCTS';

if (!$redis->get($key)) {
    $sqlx = "SELECT * FROM scanapp.visitors order by post_date desc limit 0,10";
    $sqlDatas = $conn->query($sqlx);

    while($row = $sqlDatas->fetch_assoc()){
       $products[] = $row;
    }

    $redis->set($key, serialize($products));
    $redis->expire($key, 10);

} else {
     $source = 'Redis Server';
     $products = unserialize($redis->get($key));

}

echo $source . ': <br>';
print_r($products);
/*
public function test_redis()
	{
		$this->load->library('redis');
		$redis = $this->redis->config();
		$set = $redis->set('key1', 'My name is santy.');
		$get = $redis->get('key1');
		echo $get;
	}
*/
?>