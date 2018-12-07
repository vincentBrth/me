<?php
	//Ce fichier permet de renvoyer les 15 derniers tension de chaque batterie
	//La premiere valeur indique la tension la plus recente
	//Batterie 1 : $battery[0]
	//..
	//Batterie 1 : $battery[3]
	
	function voltage($battery_1_15_data = array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),$battery_2_15_data = array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),$battery_3_15_data = array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),$battery_4_15_data = array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0))
	{
		$battery=array(
						$battery_1_15_data[0] . ',' . $battery_1_15_data[1] . ',' . $battery_1_15_data[2] . ',' . $battery_1_15_data[3] . ',' .  $battery_1_15_data[4] . ',' .  $battery_1_15_data[5] . ',' .  $battery_1_15_data[6] . ',' .  $battery_1_15_data[7] . ',' .  $battery_1_15_data[8] . ',' .  $battery_1_15_data[9] . ',' .  $battery_1_15_data[10] . ',' .  $battery_1_15_data[11] . ',' .  $battery_1_15_data[12] . ',' .  $battery_1_15_data[13] . ',' .  $battery_1_15_data[14],
						$battery_2_15_data[0] . ',' . $battery_2_15_data[1] . ',' . $battery_2_15_data[2] . ',' . $battery_2_15_data[3] . ',' .  $battery_2_15_data[4] . ',' .  $battery_2_15_data[5] . ',' .  $battery_2_15_data[6] . ',' .  $battery_2_15_data[7] . ',' .  $battery_2_15_data[8] . ',' .  $battery_2_15_data[9] . ',' .  $battery_2_15_data[10] . ',' .  $battery_2_15_data[11] . ',' .  $battery_2_15_data[12] . ',' .  $battery_2_15_data[13] . ',' .  $battery_2_15_data[14],
						$battery_3_15_data[0] . ',' . $battery_3_15_data[1] . ',' . $battery_3_15_data[2] . ',' . $battery_3_15_data[3] . ',' .  $battery_3_15_data[4] . ',' .  $battery_3_15_data[5] . ',' .  $battery_3_15_data[6] . ',' .  $battery_3_15_data[7] . ',' .  $battery_3_15_data[8] . ',' .  $battery_3_15_data[9] . ',' .  $battery_3_15_data[10] . ',' .  $battery_3_15_data[11] . ',' .  $battery_3_15_data[12] . ',' .  $battery_3_15_data[13] . ',' .  $battery_3_15_data[14],
						$battery_4_15_data[0] . ',' . $battery_4_15_data[1] . ',' . $battery_4_15_data[2] . ',' . $battery_4_15_data[3] . ',' .  $battery_4_15_data[4] . ',' .  $battery_4_15_data[5] . ',' .  $battery_4_15_data[6] . ',' .  $battery_4_15_data[7] . ',' .  $battery_4_15_data[8] . ',' .  $battery_4_15_data[9] . ',' .  $battery_4_15_data[10] . ',' .  $battery_4_15_data[11] . ',' .  $battery_4_15_data[12] . ',' .  $battery_4_15_data[13] . ',' .  $battery_4_15_data[14]
					   );
		return $battery;
	}
	
	//TEST
	/*
	(float)$x=array(14,1,3.33,12.55); //bat1,bat2,bat3,bat4
   	(float)$a =array(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15); //15 valeurs
	(float)$b =array(15,14,13,12,11,10,9,8,7,6,5,4,3,2,1);
	(float)$c =array(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15);
	(float)$d =array(5,14,13,12,11,10,9,8,7,6,5,4,3,2,1);
	$var=voltage($x,$a,$b,$c,$d);
	echo '<p>' . $var[0] . '</p>';
	echo '<p>' . $var[1] . '</p>';
	echo '<p>' . $var[2] . '</p>';
	echo '<p>' . $var[3] . '</p>';
	*/
	

	
?>


