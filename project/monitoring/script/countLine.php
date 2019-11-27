<?php
	include_once('connect.php');
	//fct permetant de compter le nombre de ligne par battery afin d'éviter des erreurs lors des requets SQL
	function get_nb_line_battery($num_battery)
	{
		global $db;

		
		$req= $db->prepare('SELECT COUNT(*) AS nb_mesure FROM batteries WHERE batterie=:numbattery');
		$req->execute(array(':numbattery' =>$num_battery));
		
			while ($data = $req->fetch())
		{
			$result_count = $data['nb_mesure'];
		}
	
		return $result_count;
		$req->closeCursor();
	}
	
	
	//TESt
	//$nb_mes=get_nb_ligne_battery(1);
	//echo 'Nombre de mesure : ' . $nb_mes;

	//fct permetant de compter le nombre de ligne de la tabale afin d'éviter des erreurs lors des requets SQL
	function get_nb_line_all()
	{
		global $db;

		
		$req= $db->query('SELECT COUNT(*) AS nb_mesure FROM batteries');
		
			while ($data = $req->fetch())
		{
			$result_count = $data['nb_mesure'];
		}
	
		return $result_count;
		$req->closeCursor();
	}
	
	//TESt
	//$a=get_nb_line_battery
	
	//$nb=get_nb_line_all();
	//echo 'Nombre de ligne : ' . $nb;
	
	
?>