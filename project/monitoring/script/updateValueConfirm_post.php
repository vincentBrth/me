<?php
	include_once('connectBattery.php');
	include_once('getId.php');

	$report=0;
	if(($_POST['id']!=NULL) )
	{

		$data=get_battery_id($_POST['id']);
		//VERIFICATION ID existe
		if(isset($data[0]['id']))
		{
				
				//VERIFICATION NUMERO BATTERIE
				if(($_POST['numBattery'] ==NULL))
				{
					$num_battery=$data[0]['batterie']; //Garder valeur		
				}
				else
				if(($_POST['numBattery'] ==1) OR ($_POST['numBattery'] ==2) OR ($_POST['numBattery'] ==3) OR ($_POST['numBattery'] ==4))
				{
					$num_battery=$_POST['numBattery'];	//Nouvelle valeur
				}
				else
				{
					$report=$report+3; //Mauvais valeur batterie
				}
				
				
				
				//VERIFICATION TENSION
				if(($_POST['voltage'] ==NULL))
				{
					$voltage=$data[0]['tension']; //Garder valeur
				}
				else
				if(($_POST['voltage'] >= 0) AND ($_POST['voltage'] <= 14))
				{
					$voltage=$_POST['voltage']; // Nouvelle valeur
				}
				else
				{
					$report=$report+4; //Mauvais valeur tension
				}
				
				
				//VERIFICATION CHARGE
				if(($_POST['charge'] ==NULL))
				{
					$charge=$data[0]['charge']; //Garder valeur
				}
				else
				if(($_POST['charge'] >= 0) AND ($_POST['charge'] <= 100))
				{
					$charge=$_POST['charge']; // Nouvelle valeur
				}
				else
				{
					$report=$report+5; //Mauvais valeur charge
				}
				
				
				//VERIFICATION ETAT
				if(($_POST['state']==NULL))
				{
					$state=$data[0]['etat']; //Garder valeur
				}
				else
				{
					$state=$_POST['state'];
				}
			
		}
		else
		{
			$report=$report+2; //ID n'existe pas
		}
	}
	else
	{
		$report=$report+1;		//ID non saisie
	}
	
	
	if($report==0)
	{	
		//Envoie sur le DB
		$req=$db->prepare('UPDATE batteries SET batterie=:numbattery, tension=:tension , charge=:charge, etat=:etat WHERE id=:id');
		$req->execute(array(
		'numbattery' => htmlspecialchars($num_battery),
		'tension' => htmlspecialchars($voltage),
		'charge' => htmlspecialchars($charge),
		'etat' => htmlspecialchars($state),
		'id' => htmlspecialchars($_POST['id']),
		));
		$req->closeCursor();
		
	}
	
	
	
	
	switch($report)
	{
		case 0:
			//echo 'sucess';
			header('Location:../updateValue.php?report=0');
		break;
		
		case 1:
			//echo 'ID non saisie';
			header('Location:../updateValue.php?report=1');
		break;
		
		case 2:
			//echo 'ID n\'existe pas';
			header('Location:../updateValue.php?report=2');
		break;
		
		case 3:
			//echo 'Mauvaise valeur batterie (1,2,3,4)';
			header('Location:../updateValue.php?report=3');
		break;
		
		case 4:
			//echo 'Mauvaise valeur tension (0-14 V)';
			header('Location:../updateValue.php?report=4');
		break;
		
		case 5:
			//echo 'Mauvaise valeur charge (0-100 %)';
			header('Location:../updateValue.php?report=5');
		break;
		
		case 7:
			//echo 'Mauvaise valeur tension (0-14 V) ET Mauvaise valeur batterie (1,2,3,4) ';
			header('Location:../updateValue.php?report=7');
		break;
		
		case 8:
			//echo 'Mauvaise valeur charge(0-100%) ET Mauvaise valeur batterie (1,2,3,4) ';
			header('Location:../updateValue.php?report=8');
		break;
		
		case 9:
			//echo 'Mauvaise valeur charge(0-100%) ET Mauvaise tension batteries (0-14 V)';
			header('Location:../updateValue.php?report=9');
		break;
		
		case 12:
			//echo 'Mauvaise valeur charge(0-100%) ET Mauvaise tension batteries (0-14 V) ET Mauvaise valeur batterie (1,2,3,4)';
			header('Location:../updateValue.php?report=12');
		break;

		
		default:
			header('Location:../index.php');	
	
	}
	
	
	/*
	
	
	echo '<p>' . $report . '</p>';
	
	




echo '<strong><u>OLD DATA :</u></strong>             <span  style="margin-left:25.5%"><strong><u>NEW DATA :</u></strong><br/>
	  <br/><strong>ID : </strong>' . $data[0]['id'] . '<span  style="margin-left:30%"><strong>ID : </strong>' . $data[0]['id'] . 
	' <br/><strong>Num battery : </strong>' . $data[0]['batterie'] . '<span  style="margin-left:24.5%"><strong>Num batterie : </strong>' . $data[0]['batterie'] .
	' <br/><strong>Voltage : </strong>' . $data[0]['tension'] . ' V<span  style="margin-left:25.3%"><strong>Voltage : </strong>' . $data[0]['tension'] . 
	' V<br/><strong>Charge : </strong>' . $data[0]['charge'] . ' %<span  style="margin-left:25.4%"><strong>Charge : </strong>' . $data[0]['charge'] . 
	' %<br/><strong>Date : </strong>' . $data[0]['date_aff'] . '<span  style="margin-left:15.9%"><strong>Date : </strong>' . $data[0]['date_aff'] . 
	' <br/><strong>State : </strong>' . $data[0]['etat'] . '<span  style="margin-left:26%"><strong>State : </strong>' . $data[0]['etat']; 

	*/
?>