<?php
	//Ce fichier contient les variables permettant de faire varier les valeur du dashboard.
	include_once('connectBattery.php');
	include_once('circle.php');
	include_once('arrow.php');
	include_once('voltage.php');
	include_once('getBattery.php');
	include_once('countLine.php');
	include_once('enoughValue.php');
	
	

	//--------------------------------------------------------DEBUT - BAR GRAPH

	//Recuperation des 15 dernieres valeurs des batteries
	$battery_1_15_data=get_battery(1,0,15);
	$battery_2_15_data=get_battery(2,0,15);
	$battery_3_15_data=get_battery(3,0,15);
	$battery_4_15_data=get_battery(4,0,15);
		
	//SECURITE --- COMPTAGE DU NOMBRE DE VALEUR MIN 
	$battery_1_nb = get_nb_line_battery(1);
	$battery_2_nb = get_nb_line_battery(2);
	$battery_3_nb = get_nb_line_battery(3);
	$battery_4_nb = get_nb_line_battery(4);	
		
	$battery_1_15_data=Enough_Value($battery_1_15_data,15,$battery_1_nb);
	$battery_2_15_data=Enough_Value($battery_2_15_data,15,$battery_2_nb);
	$battery_3_15_data=Enough_Value($battery_3_15_data,15,$battery_3_nb);
	$battery_4_15_data=Enough_Value($battery_4_15_data,15,$battery_4_nb);
		
		
	//Preparation conversion pour affichage
	(float)$bar_graph_battery_1 =array($battery_1_15_data[14]['tension'],$battery_1_15_data[13]['tension'],$battery_1_15_data[12]['tension'],$battery_1_15_data[11]['tension'],$battery_1_15_data[10]['tension'],$battery_1_15_data[9]['tension'],$battery_1_15_data[8]['tension'],$battery_1_15_data[7]['tension'],$battery_1_15_data[6]['tension'],$battery_1_15_data[5]['tension'],$battery_1_15_data[4]['tension'],$battery_1_15_data[3]['tension'],$battery_1_15_data[2]['tension'],$battery_1_15_data[1]['tension'],$battery_1_15_data[0]['tension']); //15 valeurs
	(float)$bar_graph_battery_2 =array($battery_2_15_data[14]['tension'],$battery_2_15_data[13]['tension'],$battery_2_15_data[12]['tension'],$battery_2_15_data[11]['tension'],$battery_2_15_data[10]['tension'],$battery_2_15_data[9]['tension'],$battery_2_15_data[8]['tension'],$battery_2_15_data[7]['tension'],$battery_2_15_data[6]['tension'],$battery_2_15_data[5]['tension'],$battery_2_15_data[4]['tension'],$battery_2_15_data[3]['tension'],$battery_2_15_data[2]['tension'],$battery_2_15_data[1]['tension'],$battery_2_15_data[0]['tension']); //15 valeurs
	(float)$bar_graph_battery_3 =array($battery_3_15_data[14]['tension'],$battery_3_15_data[13]['tension'],$battery_3_15_data[12]['tension'],$battery_3_15_data[11]['tension'],$battery_3_15_data[10]['tension'],$battery_3_15_data[9]['tension'],$battery_3_15_data[8]['tension'],$battery_3_15_data[7]['tension'],$battery_3_15_data[6]['tension'],$battery_3_15_data[5]['tension'],$battery_3_15_data[4]['tension'],$battery_3_15_data[3]['tension'],$battery_3_15_data[2]['tension'],$battery_3_15_data[1]['tension'],$battery_3_15_data[0]['tension']); //15 valeurs
	(float)$bar_graph_battery_4 =array($battery_4_15_data[14]['tension'],$battery_4_15_data[13]['tension'],$battery_4_15_data[12]['tension'],$battery_4_15_data[11]['tension'],$battery_4_15_data[10]['tension'],$battery_4_15_data[9]['tension'],$battery_4_15_data[8]['tension'],$battery_4_15_data[7]['tension'],$battery_4_15_data[6]['tension'],$battery_4_15_data[5]['tension'],$battery_4_15_data[4]['tension'],$battery_4_15_data[3]['tension'],$battery_4_15_data[2]['tension'],$battery_4_15_data[1]['tension'],$battery_4_15_data[0]['tension']); //15 valeurs
		
		
	//Conversion pour affichage des barres
	$result_voltage = voltage($bar_graph_battery_1,$bar_graph_battery_2,$bar_graph_battery_3,$bar_graph_battery_4);	
	
	//Sens de la fleche
	(float)$old_battery_voltage=array($battery_1_15_data[1]['tension'],$battery_2_15_data[1]['tension'],$battery_3_15_data[1]['tension'],$battery_4_15_data[1]['tension']);	
	(float)$new_battery_voltage=array($battery_1_15_data[0]['tension'],$battery_2_15_data[0]['tension'],$battery_3_15_data[0]['tension'],$battery_4_15_data[0]['tension']);
	$result_arrow = Arrow($old_battery_voltage,$new_battery_voltage);	
	
	//on regarde s'il la table est vide pour afficher si c'est le cas
	for($i=0;$i!=4;$i++)
	{
		if($result_voltage[$i]=='0,0,0,0,0,0,0,0,0,0,0,0,0,0,0')
		{
			$sum_result_voltage[$i]=true; //table vide
			$new_battery_voltage[$i]='NA';
		}
		else
		{
			$sum_result_voltage[$i]=false;	
		}
	}

	
	
	
	
	//--------------------------------------------------------FIN - BAR GRAPH
	

	//--------------------------------------------------------DEBUT -  % Cirlce	
	(float)$new_battery_percent=array(14/14,7/14,6/14.33/14,12/14.55/14);
		
	(float)$battery_percent[0] = $new_battery_voltage[0]/14;
	(float)$battery_percent[1] = $new_battery_voltage[1]/14;
	(float)$battery_percent[2] = $new_battery_voltage[2]/14;
	(float)$battery_percent[3] = $new_battery_voltage[3]/14;				
	(float)$voltage_avg=($new_battery_voltage[0]+$new_battery_voltage[1]+$new_battery_voltage[2]+$new_battery_voltage[3])/4;

	$result_color = circle($battery_percent);
	//--------------------------------------------------------FIN -  % Cirlce	
	
	
	
?>