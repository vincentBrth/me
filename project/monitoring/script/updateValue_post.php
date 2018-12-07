<?php
	include_once('connect.php');
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
	
	

	
	
	
	
	switch($report)
	{
		case 0:
			//echo 'sucess';
			header('Location:../updateValueConfirm.php?id='.$_POST['id']);
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