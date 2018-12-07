<?php

	//fct qui incremente la valeur du compteur de vue a chaque appel (fct utiliser dans le footer)
	function add_count_visit($file,$add)
	{
		if($add==true)
		{
			$myfile = fopen($file, 'r+');
			
			$line = fgets($myfile);
			$line++;
			fseek($myfile, 0);	//cursor au debut
			fputs($myfile, $line);
			
			fclose($myfile);
		}
	}
	
	//Recupere la valeur du .txt
	function display_count_visit($file,$text_begin,$text_end)
	{
		$tabfich=file($file); 
		
		for( $i = 0 ; $i < count($tabfich) ; $i++ )
		{
			echo $text_begin . ' ' .$tabfich[$i] . ' ' . $text_end;
		}
		
		
		
	}
	
	//display_count_visit('../forms/countVisit.txt','coucou','heheh');