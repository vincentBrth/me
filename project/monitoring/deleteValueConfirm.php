<!DOCTYPE html>
<html lang="en">
	<head>
		<!-- METTRE LE NOM DE LA PAGE -->
		<?php $nompage ="Delete Value" ; ?>
		
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
						<li><a href="deleteValue.php"><?php echo $nompage; ?></a></li>
					</ul>
					<!-- FIN RACOURCIS CHEMIN - OK -->
			
					
					
					
					
<!-- /////////////////////////////////////////////////////////////////DEBUT MODIFICATIION DE LA PAGE ///////////////////////////////////////////////////////////////////////-->
					
		
		

			<p><em><u>Care :</u></em>  The Data will be removed</p><br/>

		
	

<?php
		//inclusion des fonctions utiliser pour l'affichage relatif au tableau
		include_once("script/displayLineTable.php");
		//Recuperation de l'ID afin d'afficher la ligne correspondante
		if(isset($_GET['id']))
		{
			$id=$_GET['id'];
				get_line_table($id,'Remove','Battery','Voltage (V)','Charge (%)','Date','State');
		}
		else
		{
			header('Location:deleteValue.php');
		}
?>
		<form action='script/deleteValueConfirm_post.php' style="margin-top:5%" method='POST'>
			<input type='hidden' name='id' value='<?php echo $id ; ?>'/></p>					
			<center><button tabindex="3" type="submit" class="btn btn-remove">Remove</button></center>				
		</form>		
					
					
<!-- /////////////////////////////////////////////////////////////////FIN MODIFICATIION DE LA PAGE ////////////////////////////////////////////////////////////////////////-->
					
				</div><!--/.fluid-container-->
				<!-- end: Content -->
				<!-- FIN CONTENU -->
			</div><!--/#content.span10-->
		</div><!--/fluid-row-->
			
			
			
		<!-- DEBUT BAS DE PAGE -- OK -->	
		<?php include_once("part/footer.php"); ?>
		<!-- FIN BAS DE PAGE -- OK -->
		
		<!-- start: JavaScript-->
		<?php include("part/javascript.php"); ?>
		<!-- end: JavaScript-->
	
	</body>
</html>
