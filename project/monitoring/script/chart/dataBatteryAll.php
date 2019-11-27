<?php
	
	header("Content-type: text/json");
	include_once('../connect.php');
	include_once('../countLine.php');
	include_once('../getBattery.php');

	

function calc_line($l1,$l2,$l3,$l4,$choice)
	{
		if($choice == 'min')
		{
			//calcule pour les valeurs min AVG
			if($l1 <= $l2 AND $l1 <= $l3 AND $l1 <= $l4)
			{
				$line = $l1;
			}
			else
				if($l2 <= $l1 AND $l2 <= $l3 AND $l2 <= $l4)
			{
				$line = $l2;
			}	
			else
			if($l3 <= $l1 AND $l3 <= $l2 AND $l3 <= $l4)
			{
				$line = $l3;
			}
			else
			{
				$line = $l4;
			}
		}
		else
		if($choice == 'max')	
		{
			//calcule pour les valeurs max AVG
			if($l1 >= $l2 AND $l1 >= $l3 AND $l1 >= $l4)
			{
				$line = $l1;
			}
			else
			if($l2 >= $l1 AND $l2 >= $l3 AND $l2 >= $l4)
			{
				$line = $l2;
			}	
			else
			if($l3 >= $l1 AND $l3 >= $l2 AND $l3 >= $l4)
			{
				$line = $l3;
			}
			else
			{
				$line = $l4;			
			}
			
		}
			
		return $line;
	}

	$l1=get_nb_line_battery(1);
	$l2=get_nb_line_battery(2);
	$l3=get_nb_line_battery(3);
	$l4=get_nb_line_battery(4);
	
	$line_min=calc_line($l1,$l2,$l3,$l4,'min');
	$line_max=calc_line($l1,$l2,$l3,$l4,'max');
	
	
	
	
	
	
	
	//Get value date_mesure,tension of each battery
	$error = '0';
	if($l1!=0)
	{
		$data1=get_battery_chart(1);
	}
	else
	{
		$error=$error . '1';
	}

	if($l2!=0)
	{
		$data2=get_battery_chart(2);
	}
	else
	{
		$error=$error . '2';
	}

	
	if($l3!=0)
	{
		$data3=get_battery_chart(3);
	}
	else
	{
		$error=$error . '3';
	}

	
	if($l4!=0)
	{
		$data4=get_battery_chart(4);
	}
	else
	{
		$error=$error . '4';
	}

	//a calc pour avg
	if($error == '0')
	{
		$line=$line_min;
	}
	else
	{
		$line=1;
	}
	
	
	switch($error)
	{
		case '0':
			
		break;
		
		case '01':
			for($i=0;$i!=$line_max;$i++)
			{
				$data1[]=[$data2[$i][0],0];
			}
		break;
		
		case '02':
			for($i=0;$i!=$line_max;$i++)
			{
				$data2[]=[$data1[$i][0],0];
			}
		break;
		
		case '03':
			for($i=0;$i!=$line_max;$i++)
			{
				$data3[]=[$data1[$i][0],0];
			}
		break;
		
		case '04':
			for($i=0;$i!=$line_max;$i++)
			{
				$data4[]=[$data1[$i][0],0];
			}
		break;
		
		case '012':
			for($i=0;$i!=$line_max;$i++)
			{
				$data1[]=[$data3[$i][0],0];
			}
			$data2=$data1;
		break;
		
		case '013':
			for($i=0;$i!=$line_max;$i++)
			{
				$data1[]=[$data2[$i][0],0];
			}
			$data3=$data1;
		break;
		
		case '014':
			for($i=0;$i!=$line_max;$i++)
			{
				$data1[]=[$data2[$i][0],0];
			}
			$data4=$data1;
		break;		
		
		case '023':
			for($i=0;$i!=$line_max;$i++)
			{
				$data2[]=[$data1[$i][0],0];
			}
			$data3=$data2;
		break;

		case '024':
			for($i=0;$i!=$line_max;$i++)
			{
				$data2[]=[$data1[$i][0],0];
			}
			$data4=$data2;
		break;

		case '034':
			for($i=0;$i!=$line_max;$i++)
			{
				$data3[]=[$data1[$i][0],0];
			}
			$data4=$data3;
		break;
		
		case '0123':
			for($i=0;$i!=$line_max;$i++)
			{
				$data1[]=[$data4[$i][0],0];
			}
			$data2=$data1;
			$data3=$data1;
		break;
		
		case '0124':
			for($i=0;$i!=$line_max;$i++)
			{
				$data1[]=[$data3[$i][0],0];
			}
			$data2=$data1;
			$data4=$data1;
		break;
		
		case '0134':
			for($i=0;$i!=$line_max;$i++)
			{
				$data1[]=[$data2[$i][0],0];
			}
			$data3=$data1;
			$data4=$data1;
		break;		
		
		
		case '0234':
			for($i=0;$i!=$line_max;$i++)
			{
				$data2[]=[$data1[$i][0],0];
			}
			$data3=$data2;
			$data4=$data2;
		break;	

		case '01234':
			$data1[]=[time()*1000,0];
			$data2=$data1;
			$data3=$data1;
			$data4=$data1;
		break;	
		
		
		default:
			$data1[]=[time()*1000,0];
			$data2=$data1;
			$data3=$data1;
			$data4=$data1;
		break;	
			
	}
	//a def

	for($i=0;$i<$line;$i++)
	{
		$avg[]=[($data1[$i][0]+$data2[$i][0]+$data3[$i][0]+$data4[$i][0])/4,($data1[$i][1]+$data2[$i][1]+$data3[$i][1]+$data4[$i][1])/4];
	}

	
	
$ret = array(
  ($data1),
  ($data2),
  ($data3),
  ($data4),
  ($avg)
   );
echo json_encode($ret);	
	