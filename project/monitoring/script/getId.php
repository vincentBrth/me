<?php
	
	//Connexion
	include_once('connectBattery.php');
	
	//Selectionner la ligne correspondant à l'ID
	function get_battery_id($id)
	{
		global $db;
		

		$req=$db->prepare('SELECT id, batterie, tension, charge, DATE_FORMAT(date_mesure, \'%d/%m/%Y à %Hh%imin%ss\') AS date_aff, etat FROM batteries WHERE id=:id');	
		$req->bindParam(':id', $id, PDO::PARAM_INT);
		$req->execute();
		$result = $req->fetchAll();
		
		
		return $result;
		$req->closeCursor();
	}
	
	
	//TEST
	/*
	$a=10;
	$result_id=get_battery_id($a);
	if(isset($result_id[0]['id']))
	{
		echo 'id:' . $result_id[0]['id'] . ', voltage :' . $result_id[0]['tension'] . ', battery : ' . $result_id[0]['batterie'] . ', charge :' . $result_id[0]['charge'] . ', date :' . $result_id[0]['date_aff'] . ', state :' . $result_id[0]['etat'];
	}
	else
	{
		echo 'erreur';
	}
	*/