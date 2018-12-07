<!DOCTYPE html>
<html lang="en">
	<head>
		<!-- METTRE LE NOM DE LA PAGE -->
		<?php $nompage ="Add Value" ; ?>
		
		<!-- start: Meta -->
		<meta charset="utf-8">
		<title><?php echo $nompage; ?></title>
		<meta name="description" content="Bootstrap Monitoring Dashboard">
		<meta name="author" content="Vincent Berthet">
		<meta name="keyword" content='Monitoring, Dashboard,DUT,GEII,2016,Berthet,Vincent'>
		<!-- end: Meta -->
		
		<!-- start: Mobile Specific -->
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<!-- end: Mobile Specific -->
		
		<!-- start: CSS -->
		<link id="bootstrap-style" href="css/bootstrap.min.css" rel="stylesheet">
		<link href="css/bootstrap-responsive.min.css" rel="stylesheet">
		<link id="base-style" href="css/style.css" rel="stylesheet">
		<link id="base-style-responsive" href="css/style-responsive.css" rel="stylesheet">
		<link href='http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800&subset=latin,cyrillic-ext,latin-ext' rel='stylesheet' type='text/css'>
		<!-- end: CSS -->
		

		<!-- The HTML5 shim, for IE6-8 support of HTML5 elements -->
		<!--[if lt IE 9]>
			<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
			<link id="ie-style" href="css/ie.css" rel="stylesheet">
		<![endif]-->
		
		<!--[if IE 9]>
			<link id="ie9style" href="css/ie9.css" rel="stylesheet">
		<![endif]-->
			
		<!-- start: Favicon -->
		<link rel="shortcut icon" href="img/favicon.png">
		<!-- end: Favicon -->
		
			
			
			
	</head>
	<body>	
		<div class="container-fluid-full">
			<div class="row-fluid">
				
				<!-- DEBUT BANDEAU ---- OK   -->
				<?php include("part/header.php"); ?>
				<!-- FIN BANDEAU ---- OK   -->
			
				<!-- DEBUT MENU NAV GAUCHE ---- OK -->
				<?php include("part/navigation.php"); ?>
				<!-- FIN MENU NAV GAUCHE ---- OK -->
			
				<!-- DEBUT ALERTE JavaScript ---- OK -->
				<?php include("part/alertejs.php"); ?>
				<!-- FIN ALERTE JavaScript ---- OK -->
				
				
				<!-- DEBUT CONTENU -->
				<!-- start: Content -->
				<div id="content" class="span10">
					<!-- DEBUT RACOURCIS CHEMIN - OK -->
					<ul class="breadcrumb">
						<li>
							<i class="icon-home"></i>
							<a href="index.php">Home</a> 
							<i class="icon-angle-right"></i>
						</li>
						<li><a href="#"><?php echo $nompage; ?></a></li>
					</ul>
					<!-- FIN RACOURCIS CHEMIN - OK -->
			
					
					
					
					
<!-- /////////////////////////////////////////////////////////////////DEBUT MODIFICATIION DE LA PAGE ///////////////////////////////////////////////////////////////////////-->
					
		
		
		
		
		<!-- formulaire-->
		<form action='script/addValue_post.php' method='POST'>
			<center>	
				<p><label style="margin-right:80px" for='numBattery'>Num of battery   <input style="margin-left:10px" type='text' name='numBattery' id='numBattery' /></label></p>
				<p><label style="margin-right:50px" for='voltage'>Voltage (V)    <input style="margin-left:10px" type='text' name='voltage' id='voltage' /></label></p>
				<p><label style="margin-right:50px" for='charge'>Charge (%)    <input style="margin-left:10px" type='text' name='charge' id='charge' /></label></p>
				<p><label style="margin-right:15px" for='state'>State  <input style="margin-left:10px" type='text' name='state' id='state' /></label></p>
				<br/>				
				<button tabindex="3" type="submit" class="btn btn-success">Add in DataBase</button>
			</center>				
		</form>
		
<?php
		//Recuperation du rapport de traitement et affichage du message de rapport correspondant
		if(isset($_GET['report']))
		{
			switch($_GET['report'])
			{
				case 0:
					echo '<strong><span style="color:green;">Sucess</span> add to the DataBase</strong>';
				break;
				
				case 1:
					echo '<strong><span style="color:red;">Error</span> Num Battery <u>(1,2,3,4)</u></strong>';
				break;
				
				case 2:
					echo '<strong><span style="color:red;">Error</span> Voltage value <u>(0-14 V)</u></strong>';
				break;
				
				case 3:
					echo '<strong><span style="color:red;">Error</span> Num Battery <u>(1,2,3,4)</u> value and Voltage value <u>(0-14 V)</u></strong>';
				break;
				
				case 10:
					echo '<strong><span style="color:red;">Error</span> <u>NO</u> Num Battery</strong>';
				break;
				
				case 20:
					echo '<strong><span style="color:red;">Error</span> <u>NO</u> Voltage</strong>';
				break;
				
				case 30:
					echo '<strong><span style="color:red;">Error</span> <u>NO</u> Num Battery and <u>NO</u> Voltage</strong>';

				break;
				
				default:

			}
		}
		
	
?>
		

					
					
					
<!-- /////////////////////////////////////////////////////////////////FIN MODIFICATIION DE LA PAGE ////////////////////////////////////////////////////////////////////////-->
					
				</div><!--/.fluid-container-->
				<!-- end: Content -->
				<!-- FIN CONTENU -->
			</div><!--/#content.span10-->
		</div><!--/fluid-row-->
			
			
			
		<!-- DEBUT BAS DE PAGE -- OK -->	
		<?php include("part/footer.php"); ?>
		<!-- FIN BAS DE PAGE -- OK -->
		
		<!-- start: JavaScript-->
		<?php include("part/javascript.php"); ?>
		<!-- end: JavaScript-->
	
	</body>
</html>
