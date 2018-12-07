<?php
	//permet d'indiquer la couleur du cercle %
	function Arrow($old_voltage_battery=array(0,0,0,0),$new_voltage_battery=array(0,0,0,0))
		{
		$arrow = array(0,0,0,0,0,0,0,0);
		for($i=0;$i<4;$i++)
		{
			//Recherche du sens de la fleche
			
			if($new_voltage_battery[$i] == $old_voltage_battery[$i])
			{
				$arrow[$i] = "icon-arrow-right";
			}
			else
			if($new_voltage_battery[$i] > $old_voltage_battery[$i])
			{
				$arrow[$i] = "icon-arrow-up";
			}
			else
			{
				$arrow[$i] = "icon-arrow-down";
			}
			

			
		}
			return $arrow;

	}


?>