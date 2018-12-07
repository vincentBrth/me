<?php	

	$name="NA";
	$mail="NA";
	$subject="NA";
	$message="NA";
	//Verification saisie name
	if((isset($_POST['name'])) AND ($_POST['name']!=NULL))
	{
		$name=htmlspecialchars($_POST['name']);
	}
	
	if((isset($_POST['mail']))AND ($_POST['mail']!=NULL))
	{
		$mail=htmlspecialchars($_POST['mail']);
	}
	
	//Verification saisie objet
	if((isset($_POST['subject']))AND ($_POST['subject']!=NULL))
	{
		$subject=htmlspecialchars($_POST['subject']);
	}
	
	//Verification saisie message
	if((isset($_POST['message']))AND ($_POST['message']!=NULL))
	{
		$message=nl2br(htmlspecialchars($_POST['message']));
		
	}
	
	//////////////////
	$myfile = fopen("contact_view.php", 'r+');	
	fputs($myfile,"<br/>Date: " . date('l jS \of F Y h:i:s A') . "<br/>Name: " . $name . "<br/>Mail: " . $mail . "<br/>Subject: " . $subject . "<br/>Message: " . $message . "<br/>" . "______________________________________<br/>"); //ecrit dans le fichier
	fclose($myfile);	
	
	/////////////
	
	
	
	
	//Destinataire
	$to  = 'vincent.berthet42@gmail.com';

	// Pour envoyer un mail HTML, l'en-tête Content-type doit être défini
	$headers  = 'MIME-Version: 1.0' . "\r\n";
	$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

	// En-têtes additionnels
	$headers .= 'To: Monitoring <http://berthet.comli.com/>' . "\r\n";

	// Envoi
	mail($to, $subject, $message, $headers);


	header('Location:contact-success/');
?>