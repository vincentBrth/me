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
		$mysqldsn='mysql:host=db764166981.hosting-data.io;dbname=db764166981;charset=utf8';
		$mysqluser='dbo764166981';
		$mysqlpassword='Notmypassword1&';
		
	
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
