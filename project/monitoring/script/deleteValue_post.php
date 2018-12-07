<?php
	include_once('connectBattery.php');
	include_once('getId.php');

	//TEST si l'ID est définit dans le formulaire
	if(($_POST['id']!=NULL) )
	{

		$data=get_battery_id($_POST['id']);
		//VERIFICATION ID existe dans la table
		if(isset($data[0]['id']))
		{
			$report=0;
		}
		else
		{
			$report=$report+2; //ID non valide
		}

	}
	else
	{
		$report=$report+1;		//ID non saisie
	}
	

	
	switch($report)
	{
		case 0:
			//echo 'sucess';
			header('Location:../deleteValueConfirm.php?id='.$_POST['id']);
		break;
		
		case 1:
			//echo 'ID non saisie';
			header('Location:../deleteValue.php?report=1');
		break;
		
		case 2:
			//echo 'ID n\'existe pas';
			header('Location:../deleteValue.php?report=2');
		break;
		

		
		default:
			header('Location:../index.php');	
	
	}
	
	

	
	

?>