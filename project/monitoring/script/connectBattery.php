<?php
	//Connection Database
	try
	{	

		/*
		//FOXG20
		$mysqldsn='mysql:host=localhost;dbname=B13_Monitoring;charset=utf8';
		$mysqluser='root';
		$mysqlpassword='';
		*/
		//WEB
		$mysqldsn='mysql:host=db701348581.db.1and1.com;dbname=db701348581;charset=utf8';
		$mysqluser='dbo701348581';
		$mysqlpassword='Justaniceberg1';
		
	
		//LOCAL
		//$mysqldsn='mysql:host=localhost;dbname=b13_monitoring;charset=utf8';
		//$mysqluser='root';
		//$mysqlpassword='root';
	
			
		$db = new PDO($mysqldsn, $mysqluser, $mysqlpassword,array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
	}
	catch (Exception $erreur)
	{
		//Message d'erreur	
		die('Erreur SQL : ' . $erreur->getMessage());
	}
?>
