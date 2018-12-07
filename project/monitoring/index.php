<!DOCTYPE html>
<html lang="en">
	<head>
		<!-- METTRE LE NOM DE LA PAGE -->
		<?php $nompage ="Dashboard" ; ?>
		
		<!-- start: Meta -->
		<meta charset="utf-8">
		<title><?php echo $nompage; ?></title>
		<meta name="description" content="Bootstrap Monitoring Dashboard">
		<meta name="author" content="Vincent Berthet">
		<meta name="keyword" content="Monitoring, Monitoring UI, Dashboard, Bootstrap, Admin, Template, Theme, Responsive, Fluid, Retina">
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
	
		<?php
			include_once('script/displayDashboard.php');
			//Contient les infos pour les variables
		?>
	

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
					
			<!-- DEBUT ICONE BATTERIES  15 barres -->
			<div class="row-fluid">

				<div class="span3 statbox green" onTablet="span6" onDesktop="span3">
					<div class="boxchart"><?php echo $result_voltage[0]; ?> </div>         
					<div class="number"><?php echo "<font size=5>" . $new_battery_voltage[0] . " V </font></>"; ?><i class="<?php echo $result_arrow[0] ?>"></i></div>
					<div class="title">Battery 1 </div>
					<div class="footer">
						<a href="battery1Report.php"> read full report</a>
					</div>
				</div>
				<div class="span3 statbox green" onTablet="span6" onDesktop="span3">
					<div class="boxchart"><?php echo $result_voltage[1]; ?> </div>
					<div class="number"><?php echo "<font size=5>" . $new_battery_voltage[1] . " V </font></>"; ?><i class="<?php echo $result_arrow[1] ?>"></i></div>
					<div class="title">Battery 2 </div>
					<div class="footer">
						<a href="battery2Report.php"> read full report</a>
					</div>
				</div>
				<div class="span3 statbox green noMargin" onTablet="span6" onDesktop="span3">
					<div class="boxchart"><?php echo $result_voltage[2]; ?> </div>
					<div class="number"><?php echo "<font size=5>" . $new_battery_voltage[2] . " V </font></>"; ?><i class="<?php echo $result_arrow[2] ?>"></i></div>
					<div class="title">Battery 3</div>
					<div class="footer">
						<a href="battery3Report.php"> read full report</a>
					</div>
				</div>
				<div class="span3 statbox green" onTablet="span6" onDesktop="span3">
					<div class="boxchart"><?php echo $result_voltage[3]; ?> </div>
					<div class="number"><?php echo "<font size=5>" . $new_battery_voltage[3] . " V </font></>"; ?><i class="<?php echo $result_arrow[3] ?>"></i></div>
					<div class="title">Battery 4</div>
					<div class="footer">
						<a href="battery4Report.php"> read full report</a>
					</div>
				</div>	
				
			</div>		
			<!-- FIN ICONES BATTERIES -->
			
			
			<!-- DEBUT GRAPHE -->
			<div >
					<?php
							//Get date min
							$request = $db->query("SELECT MIN(date_mesure) FROM batteries");
							$data = $request->fetch();
							$request->closeCursor();
		
							
							
							//Si pas de valeur du tout dans la table alors on n'affiche pas
							if($data[0]!=NULL)
							{
					?>
					
					
					
					<br/>
					<?php 

					include_once('script/chart/chartBatteryAll.php');
					?>
					<center><em style="font-size:10px;">Click on the plots you want to display/hide - you can also zoom</em></center>
					<br/>
					<br/>
					<?php
							}
							else
							{
								echo '<br/><br/><br/><br/><center>The chart can\'t be display because there is no Data in the table \'batteries\' of the DataBase</center><br/><br/><br/><br/>';
								
							}	
					?>

			</div>
			
			
			
			
			<!-- DEBUT CERCLE % -->
			<!-- Valeur arrondit javascript : custom.js -->

		 
			<div class="row-fluid hideInIE8 circleStats">
			
				<div class="span2" onTablet="span4" onDesktop="span2"  style="margin-left:0%">
                	<div class="circleStatsItemBox <?php echo $result_color[0]; ?>">
						<div class="header">Battery 1</div>
						<span class="percent">%</span>
						<div class="circleStat">
						
                    	<input type="text" value="<?php echo $battery_percent[0]*100; ?>" class="whiteCircle" />
						</div>
						<div class="footer">
							<span class="count">
								<span class="number">0</span>
								<span class="unit">V</span>
							</span>
							<span class="sep"> / </span>
							<span class="value">
								<span class="number">14</span>
								<span class="unit">V</span>
							</span>	
						</div>
                	</div>
				</div>
				
			
				<div class="span2" onTablet="span4" onDesktop="span2" style="margin-left:6.8%">
                	<div class="circleStatsItemBox <?php echo $result_color[1]; ?>">
						<div class="header">Battery 2</div>
						<span class="percent">%</span>
                    	<div class="circleStat">
                    		<input type="text" value="<?php echo $battery_percent[1]*100; ?>" class="whiteCircle" />
						</div>
						<div class="footer">
							<span class="count">
								<span class="number">0</span>
								<span class="unit">V</span>
							</span>
							<span class="sep"> / </span>
							<span class="value">
								<span class="number">14</span>
								<span class="unit">V</span>
							</span>	
						</div>
                	</div>
				</div>
		

				<div class="span2" onTablet="span4" onDesktop="span2" style="margin-left:6.8%">
                	<div class="circleStatsItemBox <?php echo $result_color[2]; ?>">
						<div class="header">Battery 3</div>
						<span class="percent">%</span>
                    	<div class="circleStat">
                    		<input type="text" value="<?php echo $battery_percent[2]*100; ?>" class="whiteCircle" />
						</div>
						<div class="footer">
							<span class="count">
								<span class="number">0</span>
								<span class="unit">V</span>
							</span>
							<span class="sep"> / </span>
							<span class="value">
								<span class="number">14</span>
								<span class="unit">V</span>
							</span>	
						</div>
                	</div>
				</div>

				<div class="span2" onTablet="span4" onDesktop="span2" style="margin-left:6.8%">
                	<div class="circleStatsItemBox <?php echo $result_color[3]; ?>">
						<div class="header">Battery 4</div>
						<span class="percent">%</span>
                    	<div class="circleStat">
                    		<input type="text" value="<?php echo $battery_percent[3]*100; ?>	" class="whiteCircle" />
						</div>
						<div class="footer">
							<span class="count">
								<span class="number">0</span>
								<span class="unit">V</span>
							</span>
							<span class="sep"> / </span>
							<span class="value">
								<span class="number">14</span>
								<span class="unit">V</span>
							</span>	
						</div>
                	</div>
				</div>
						
						
						
				<div class="span2" onTablet="span3" onDesktop="span2" style="margin-left:6.8%">
                	<div class="circleStatsItemBox white">
						<div class="header">Average</div>
						<span class="percent">%</span>
                    	<div class="circleStat">
                    		<input type="text" value="<?php echo ($voltage_avg/14)*100; ?>" class="whiteCircle" />
						</div>
						<div class="footer">
							<span class="count">
								<span class="number">0</span>
								<span class="unit">V</span>
							</span>
							<span class="sep"> / </span>
							<span class="value">
								<span class="number">14</span>
								<span class="unit">V</span>
							</span>	
						</div>
                	</div>
				</div>
			</div>		

		
			<!-- FIN CERCLER % 
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
