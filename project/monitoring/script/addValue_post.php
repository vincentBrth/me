<?php
	include_once('connectBattery.php');

	
	$report=0;
	//VERIFICATION SI CERTAINS PARAMETRE SONT DEFINIT AFIN DE NE PAS RENTRER DES REQUETES VIDES
	if(isset($_POST['numBattery']) )
	{
		if(	$_POST['numBattery'] == 1 OR $_POST['numBattery'] == 2 OR $_POST['numBattery'] == 3 OR $_POST['numBattery'] == 4)
		{

		}
		else
		{
			$report=$report+1;
		}	
	}
	else
	{
		$report=$report+10;
	}
	
	
	if(isset($_POST['voltage']) )
	{
		if(	$_POST['voltage'] >= 0.00 AND $_POST['voltage'] <= 14.00 AND $_POST['voltage'] != NULL) 
		{

		}
		else
		{
			$report=$report+2;
		}	
	}
	else
	{
		$report=$report+20;
	}

	
	
	//SI verification ok alors envoie de la requete
	if($report==0)
	{
		//Envoie sur le DB
		$req=$db->prepare('INSERT INTO batteries (batterie,tension,charge,date_mesure,etat) VALUES(:numbattery,:tension,:charge,NOW(),:etat)');
		$req->execute(array(
		'numbattery' => htmlspecialchars($_POST['numBattery']),
		'tension' => htmlspecialchars($_POST['voltage']),
		'charge' => htmlspecialchars($_POST['charge']),
		'etat' => htmlspecialchars($_POST['state']),
		));
		$req->closeCursor();
	}
	
	switch($report)
	{
		case 0:
			//echo 'Sucess';
			header('Location:../addValue.php?report=0');
		break;
		
		case 1:
			//echo 'Error Num Battery';
			header('Location:../addValue.php?report=1');
		break;
		
		case 2:
			//echo 'Error Voltage value ';
			header('Location:../addValue.php?report=2');
		break;
		
		case 3:
			//echo 'Error Num Battery (1,2,3,4) value and Voltage value (0-14 V)';
			header('Location:../addValue.php?report=3');
		break;
		
		case 10:
			//echo 'Error NO Num Battery';
			header('Location:../addValue.php?report=10');
		break;
		
		case 20:
			//echo 'Error NO Voltage';
			header('Location:../addValue.php?report=20');
		break;
		
		case 30:
			//echo 'Erreur NO Num Battery and NO Voltage';
			header('Location:../addValue.php?report=30');	
		break;
		
		default:
			header('Location:../index.php');	
	
	}
	

	
?>