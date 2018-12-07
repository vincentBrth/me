<?php

	include_once('connectBattery.php');
	include_once('getBattery.php');
	include_once('countLine.php');
	//verifie s'il y a assez de valeur pour effectuer les bonnes requetes SQL
	function Enough_Value($battery_data,$limit,$nb_line)
	{
		if($nb_line<$limit)
		{
			$nb_null_entries=$limit-$nb_line;
			
			for($nb_null_entries;$nb_null_entries!=0;$nb_null_entries--)
			{
				$line=$limit-$nb_null_entries;
				$battery_data[$line]['tension']=0;
			}
		}
		
		return $battery_data;
	}
	
	//TEST
	/*
	$limit=15;
	$nb_line_battery_1=get_nb_line_battery(1);

	$battery_1=get_battery(1,0,$limit);
	$battery_data_modif=Not_Enougth_Value($battery_1,$limit,$nb_line_battery_1);
	
	for($i=0;$i<$limit;$i++)
	{
		echo '<p>' . $battery_data_modif[$i]['tension'] . '</p>';
	}
	*/