<!DOCTYPE html>
<html lang="en">
	<head>
		<!-- METTRE LE NOM DE LA PAGE -->
		<?php $nompage ="Contact" ; ?>
		
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
	<?php
		include_once('script/message.php');

		
		if((isset($_GET['report'])) AND ($_GET['report']==0)) //Formulaire envoyer
		{
	?>		
			<center><h2><strong><span style="color:green;">Sucess</span> a mail has been sent</strong></h2></center><br/>
			<p>Thanks for your mail, I will contact you as soon as possible ! </p><br/>
			
			<p><strong>Vincent Berthet</strong></p><br/>
			
	
	<?php
		}
		else //Afficher formulaire
		{  
			//Suppresion du dernier message enregistrer si pas de report
			if(!isset($_GET['report']))
			{
				remove_message('script/keepMessage.txt',true);
			}
			

			
			//Recuperation des valeurs saisie si erreur
			if(isset($_GET['name']))
			{
				$name=$_GET['name'];
			}
			else
			{
				$name=NULL;
			}
			
			if(isset($_GET['surname']))
			{
				$surname=$_GET['surname'];
			}
			else
			{
				$surname=NULL;
			}
			
			if(isset($_GET['mail']))
			{
				$mail=$_GET['mail'];
			}
			else
			{
				$mail=NULL;
			}
			
			if(isset($_GET['subject']))
			{
				$subject=$_GET['subject'];
			}
			else
			{
				$subject=NULL;
			}
			

			

			
			
	?>
			<form class="replyForm"  action='script/mail_post.php' method='POST'>
				<p><label  for='First Name'>Name   <input style="margin-left:32px" type='text' name='name' id='name' value='<?php echo $name ;?>' autofocus /></label></p>
				<p><label  for='Surname'>Surname    <input style="margin-left:13px" type='text' name='surname' id='surname'  value='<?php echo $surname ;?>'/></label></p>
				<p><label  for='mail'>Your mail    <input style="margin-left:11px" type='email' name='mail' id='mail' value='<?php echo $mail ;?>' /></code></label></p>
				<p><label  for='subject'>Subject    <input style="margin-left:25px" type='text' name='subject' id='subject' value='<?php echo $subject ;?>' /></label></p>
					
				<div class="controls">
					<p><label  for='attachment' >Attachment   <input class="input-file uniform_on" id="file" type="file"></label></p>
				</div>
				<br/>
				<fieldset>
					<textarea tabindex="3" class="input-xlarge span12" id="message" name="message" rows="12" placeholder="Contact me !"><?php display_message('script/keepMessage.txt',true) ;?></textarea>

					<div class="actions">					
						<button tabindex="3" type="submit" class="btn btn-success">Send mail</button>					
					</div>
				</fieldset>
			</form>
			<br/>
			
			
			
			
			
			
	<?php
		}

		

		if(isset($_GET['report']))
		{
			switch($_GET['report'])
			{
				case 0:
					//sucess
				break;
				
				case 1:
					echo '<strong><span style="color:red;">Error</span> Empty <u>Name</u></strong>';
				break;
				
				case 2:
					echo '<strong><span style="color:red;">Error</span> Empty <u>Surname</u></strong>';
				break;
				
				case 3:
					echo '<strong><span style="color:red;">Error</span> Empty <u>Name</u> and <u>Surname</u></strong>';
				break;
				
				case 4:
					echo '<strong><span style="color:red;">Error</span> Empty <u>Mail</u></strong>';
				break;
				
				case 5:
					echo '<strong><span style="color:red;">Error</span> Empty <u>Name, Surname</u> and <u>Mail</u></strong>';
				break;
				
				case 6:
					echo '<strong><span style="color:red;">Error</span> Empty  <u>Surname</u> and <u>Mail</u></strong>';
				break;
				
				case 7:
					echo '<strong><span style="color:red;">Error</span> Empty  <u>Name, Surname</u> and <u>Mail</u></strong>';
				break;
				
				case 8:
					echo '<strong><span style="color:red;">Error</span> Empty  <u>Subject</u></strong>';
				break;
				
				case 9:
					echo '<strong><span style="color:red;">Error</span> Empty  <u>Name</u> and <u>Subject</u></strong>';
				break;
				
				case 10:
					echo '<strong><span style="color:red;">Error</span> Empty  <u>Surname</u> and <u>Subject</u></strong>';
				break;
				
				case 11:
					echo '<strong><span style="color:red;">Error</span> Empty  <u>Name, Surname</u> and <u>Subject</u></strong>';
				break;
				
				case 12:
					echo '<strong><span style="color:red;">Error</span> Empty  <u>Mail</u> and <u>Subject</u></strong>';
				break;
				
				case 13:
					echo '<strong><span style="color:red;">Error</span> Empty  <u>Name, Mail</u> and <u>Subject</u></strong>';
				break;
				
				case 14:
					echo '<strong><span style="color:red;">Error</span> Empty  <u>Surname, Mail</u> and <u>Subject</u></strong>';
				break;
				
				case 15:
					echo '<strong><span style="color:red;">Error</span> Empty  <u>Name, Surname, Mail</u> and <u>Subject</u></strong>';
				break;
				
				case 16:
					echo '<strong><span style="color:red;">Error</span> Empty  <u>Message</u></strong>';
				break;
				
				case 17:
					echo '<strong><span style="color:red;">Error</span> Empty  <u>Name</u> and <u>Message</u></strong>';
				break;
				
				case 18:
					echo '<strong><span style="color:red;">Error</span> Empty  <u><Surname/u> and <u>Message</u></strong>';
				break;
				
				case 19:
					echo '<strong><span style="color:red;">Error</span> Empty  <u>Name, Surname</u> and <u>Message</u></strong>';
				break;
				
				case 20:
					echo '<strong><span style="color:red;">Error</span> Empty  <u>Mail</u> and <u>Message</u></strong>';
				break;
				
				case 21:
					echo '<strong><span style="color:red;">Error</span> Empty  <u>Name, Mail</u> and <u>Message</u></strong>';
				break;
				
				case 22:
					echo '<strong><span style="color:red;">Error</span> Empty  <u>Surname, Mail</u> and <u>Message</u></strong>';
				break;
				
				case 23:
					echo '<strong><span style="color:red;">Error</span> Empty  <u>Name, Surname, Mail</u> and <u>Message</u></strong>';
				break;
				
				case 24:
					echo '<strong><span style="color:red;">Error</span> Empty  <u>Subject</u> and <u>Message</u></strong>';
				break;
				
				case 25:
					echo '<strong><span style="color:red;">Error</span> Empty  <u>Name, Subject</u> and <u>Message</u></strong>';
				break;
				
				case 26:
					echo '<strong><span style="color:red;">Error</span> Empty  <u>Surname, Subject</u> and <u>Message</u></strong>';
				break;
				
				case 27:
					echo '<strong><span style="color:red;">Error</span> Empty  <u>Name, Surname, Subject</u> and <u>Message</u></strong>';
				break;
				
				case 28:
					echo '<strong><span style="color:red;">Error</span> Empty  <u>Mail, Subject</u> and <u>Message</u></strong>';
				break;
				
				case 29:
					echo '<strong><span style="color:red;">Error</span> Empty  <u>Name, Mail, Subject</u> and <u>Message</u></strong>';
				break;
				
				case 30:
					echo '<strong><span style="color:red;">Error</span> Empty  <u>Surname, Mail, Subject</u> and <u>Message</u></strong>';
				break;
				
				case 31:
					echo '<strong><span style="color:red;">Error</span> <u>All fields are empty</u></strong>';
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
