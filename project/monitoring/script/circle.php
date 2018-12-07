<?php
	//Ce fichier permet d'indiquer le sens de la fleche des batteries en fonctions de la derniere tension et de la nouvelle
	//Et également d'indiquer la couleur du cercle %
	function Circle($battery_percent = array(0,0,0,0))
	{
		$color = array(0,0,0,0);
		for($i=0;$i<4;$i++)
		{

			//Recherche de la bonne couleur
			// red < 0.1
			// 0.1 <= crimson < 0.25
			// 0.25 <= orange < 0.5
			// 0.5 <=  greenLight <0.75
			// 0.75 <= green <0.9
			// 0.9 <= greenDark <= 1
			// Sinon gris
			if($battery_percent[$i] <0.1)
			{
				$color[$i] = "red";
			}
			else if($battery_percent[$i]<0.25)
			{
				$color[$i] = "orange";	
			}
			else if($battery_percent[$i]<0.5)
			{
				$color[$i] = "yellow";
			}
			else if($battery_percent[$i]<0.75)
			{
				$color[$i] = "greenLight";
			}
			else if($battery_percent[$i]<0.9)
			{
				$color[$i] = "green";
			}
			else if($battery_percent[$i]<=1.0)
			{
				$color[$i] = "greenDark";
			}
			else
			{
				
				$color[$i] ="grey";
			}

			
		}
			return $color;
			//$return=
			//0- Arrow BAT 1
			//1- ..
			//2- ..
			//3- ..
			//4- Arrow BAT 4
			//5- Color BAT 1
			//6- ..
			//7- ..
			//8- Color BAT 4
	}
	/*
	//TEST
	$a = array (1,0.5,0.45,0.89);	
	$b = array (1,1,0,0); 
	$c = array (0,0,1,1);
	$var=ColorArrow($a,$b,$c);
	echo "<p>" . $var[0] . " - " . $var[4] ."</p>";
	echo "<p>" . $var[1] . " - " . $var[5] ."</p>";
	echo "<p>" . $var[2] . " - " . $var[6] ."</p>";
	echo "<p>" . $var[3] . " - " . $var[7] ."</p>";
	*/	

?>