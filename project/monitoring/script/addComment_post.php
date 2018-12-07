<?php
	include_once('connectComment.php');
	//header('Location:index.php');	
	
	//Appeler si addComment.php valide le formulaire
	//Traitement de la requete et renvoie d'un rapport
	if(isset($_POST['message']) )
	{
		//Envoie sur le DB
		$req=$db->prepare('INSERT INTO comment(batterie,message,date) VALUES(:numbattery,:message,NOW())');
		$req->execute(array(
		'message' => htmlspecialchars($_POST['message']),
		'numbattery' => htmlspecialchars($_POST['adr']),
		));
		$req->closeCursor();

		
		switch($_POST['adr'])
		{
			case 1:
				header('Location:../battery1Report.php');	
			break;
			
			case 2:
				header('Location:../battery2Report.php');		
			break;
			
			case 3:
				header('Location:../battery3Report.php');		
			break;
		
			case 4:
				header('Location:../battery4Report.php');	
			break;
			
			default:
				header('Location:../index.php');	
		}
	}
	else
	{
		echo 'Erreur';
	}
	
	
	
?>