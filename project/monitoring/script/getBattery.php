<?php
	
	//Connexion
	include_once('connect.php');
	//Recupere toute les lignes avec toutes les informations correspondante à la batterie
	function get_battery($num_battery,$offset, $limit)
	{
		global $db;
		
		(int)$num_battery;
		(int)$offset;
		(int)$limit;
			
		$req=$db->prepare('SELECT id, batterie, tension, charge, DATE_FORMAT(date_mesure, \'%d/%m/%Y à %Hh%imin%ss\') AS date_aff, etat FROM batteries WHERE batterie = :numbattery ORDER BY id DESC LIMIT :offset, :limit');	
		$req->bindParam(':numbattery', $num_battery, PDO::PARAM_INT);
		$req->bindParam(':offset', $offset, PDO::PARAM_INT);
		$req->bindParam(':limit', $limit, PDO::PARAM_INT);
		$req->execute();
		$result = $req->fetchAll();
		
		
		return $result;
		$req->closeCursor();
	}
	//TEST
	//$var = get_battery(1,0,15);
	//echo $var[0]['id'] . ' , ' . $var[1]['id'];

	function get_battery_chart($numbattery)
	{
		global $db;
		
		$request = $db->prepare("SELECT date_mesure,tension FROM batteries WHERE batterie = :numbattery ORDER BY date_mesure ASC");
		$request->bindParam(':numbattery',$numbattery, PDO::PARAM_INT);

		$request->execute();

		while($row = $request->fetch()) 
		{
			$value = $row['tension'];
			//$timestamp = strtotime($row['date_mesure']) * 1000; //date.timezone = Europe/Paris
			$timestamp = strtotime($row['date_mesure']) * 1000 + 3600000;
			$data[] = [$timestamp, (float)$value];
		} 
		return $data;
		$request->closeCursor();
	}
	
?>



	
	

	
