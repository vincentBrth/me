<?php
	include_once('connect.php');

	
	//Execution de la requete apres validation dans deleteValue.php
	if(isset($_POST['id']) )
	{
		if($_POST['id'] != NULL)
		{
			$report=0;
			//Envoie sur le DB
			$req=$db->prepare('DELETE FROM batteries WHERE id=:id');
			$req->execute(array(
			'id' => htmlspecialchars($_POST['id']),
			));
			$req->closeCursor();
		}
		else
		{
			$report=1;
		}
	}
	else
	{
		echo 'Erreur';
		$report=2;
	}
	
	switch($report)
	{
		case 0:
			header('Location:../deleteValue.php?report=0');	
		break;
		
		case 1:
			header('Location:../deleteValue.php?report=1');		
		break;
			
		case 2:
			header('Location:../deleteValue.php?report=2');
		break;
		

		default:
			header('Location:../index.php');	
	}
	
	
?>