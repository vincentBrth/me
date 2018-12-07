<?php

	include_once('../connectBattery.php');
	include_once('../getBattery.php');


	
	$data=get_battery_chart(3);
	

    json_encode($data);
	print json_encode($data);
	
		
?>