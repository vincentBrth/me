<?php 
	function display_message($file,$display)
	{ 
		if($display==true)
		{
			$tabfich=file($file); 
			for( $i = 0 ; $i < count($tabfich) ; $i++ )
			{
				echo $tabfich[$i];
			}
		}
	}
	
	function remove_message($file,$remove)
	{
		if($remove==true)
		{
			//Suppresion du fichier sauvegarde message
			$myfile = fopen($file, 'w');
			ftruncate($myfile,0);
				
			//$message= '<p><strong>' . date('l jS \of F Y h:i:s A') . '</strong></p>test';
			fclose($myfile);
		}
	}
	

	
	function add_message($file,$message,$add)
	{
		if($add==true)
		{
			//Edition fichier sauvegarde
			$myfile = fopen($file, 'r+');
			
			fputs($myfile, strip_tags($message)); //ecrit dans le fichier
			fclose($myfile);	
		}
	}
	
	
	function add_message_date($file,$message,$add)
	{
		if($add==true)
		{
			//Edition fichier sauvegarde
			$myfile = fopen($file, 'r+');
			
			$message= '<p><strong>' . date('l jS \of F Y h:i:s A') . '</strong></p>' . $message;


			fputs($myfile, strip_tags($message)); //ecrit dans le fichier
			fclose($myfile);	
		}
	}