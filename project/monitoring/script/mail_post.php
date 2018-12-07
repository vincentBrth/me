<?php
	include_once('message.php');
	$report=0;
	
	//Verification saisie name
	if((isset($_POST['name'])) AND ($_POST['name']!=NULL))
	{
		$name=htmlspecialchars($_POST['name']);
	}
	else
	{
		$report=$report+1;
	}
	
	//Verification saisie surname
	if((isset($_POST['surname']))AND ($_POST['surname']!=NULL))
	{
		$surname=htmlspecialchars($_POST['surname']);
	}
	else
	{
		$report=$report+2;
	}
	
	//Verification saisie mail
	if((isset($_POST['mail']))AND ($_POST['mail']!=NULL))
	{
		$mail=htmlspecialchars($_POST['mail']);
	}
	else
	{
		$report=$report+4;
	}

	//Verification saisie objet
	if((isset($_POST['subject']))AND ($_POST['subject']!=NULL))
	{
		$subject=htmlspecialchars($_POST['subject']);
	}
	else
	{
		$report=$report+8;
	}
	
	//Verification saisie message
	if((isset($_POST['message']))AND ($_POST['message']!=NULL))
	{
		$message=nl2br(htmlspecialchars($_POST['message']));
		
	}
	else
	{
		$report=$report+16;
		$message=NULL;
	}

	
	
	
	 //Suppresion du fichier sauvegarde message 
	remove_message('keepMessage.txt',true);
	
	if($report==0)
	{

		 //Destinataire
		 $to  = 'vincent.berthet42@gmail.com';



		 // Pour envoyer un mail HTML, l'en-tête Content-type doit être défini
		 $headers  = 'MIME-Version: 1.0' . "\r\n";
		 $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

		 // En-têtes additionnels
		 $headers .= 'To: Monitoring <http://berthet.comli.com/>' . "\r\n";


		 // Envoi
		 mail($to, $subject, $message, $headers);
	}
	else
	{
		//sauvegarde message
		add_message('keepMessage.txt',$message,true);
	}
	
	//Probleme saut a la ligne avec : '&message=' . nl2br(htmlspecialchars($message)) erreur header
	switch($report)
	{
		case 0:
			//echo 'Sucess';
			header('Location:../mail.php?report=0');
		break;
		
		case 1:
			//echo 'No name';
			header('Location:../mail.php?report=1&surname=' . $surname . '&mail=' . $mail . '&subject=' . $subject);
		break;
		
		case 2:
			//echo 'No surname';
			header('Location:../mail.php?report=2&name='. $name . '&mail=' . $mail . '&subject=' . $subject);
		break;
		
		case 3:
			//echo 'No name and surname';
			header('Location:../mail.php?report=3&mail=' . $mail . '&subject=' . $subject);
		break;
		
		case 4:
			//echo 'No mail';
			header('Location:../mail.php?report=4&name='. $name . '&surname=' . $surname . '&subject=' . $subject);
		break;
		
				
		case 5:
			//echo 'No name and mail';
			header('Location:../mail.php?report=5&surname=' . $surname . '&subject=' . $subject);
		break;
		
				
		case 6:
			//echo 'No surname and mail';
			header('Location:../mail.php?report=6&name='. $name . '&subject=' . $subject);
		break;
		
				
		case 7:
			//echo 'No name and surname and mail';
			header('Location:../mail.php?report=7&subject=' . $subject);
		break;
				
		case 8:
			//echo 'No subject';
			header('Location:../mail.php?report=8&name='. $name . '&surname=' . $surname . '&mail=' . $mail);
		break;
		
				
		case 9:
			//echo 'No name and subject';
			header('Location:../mail.php?report=9&surname=' . $surname . '&mail=' . $mail);
		break;
		
				
		case 10:
			//echo 'No surname and subject';
			header('Location:../mail.php?report=10&name='. $name . '&mail=' . $mail);
		break;
		
		case 11:
			//echo 'No name and surname and subject';
			header('Location:../mail.php?report=11&mail=' . $mail);
		break;
		
		case 12:
			//echo 'No mail and subject';
			header('Location:../mail.php?report=12&name='. $name . '&surname=' . $surname);
		break;
		
		case 13:
			//echo 'No name and mail and subject';
			header('Location:../mail.php?report=13&surname=' . $surname);
		break;
		
		case 14:
			//echo 'No surname and mail and subject';
			header('Location:../mail.php?report=14&name='. $name);
		break;
		case 15:
			//echo 'No name and surname and mail and subject';
			header('Location:../mail.php?report=15');
		break;
		
		case 16:
			//echo 'No message';
			header('Location:../mail.php?report=16&name='. $name . '&surname=' . $surname . '&mail=' . $mail . '&subject=' . $subject);
		break;
		
		case 17:
			//echo 'No name and message';
			header('Location:../mail.php?report=17&surname=' . $surname . '&mail=' . $mail . '&subject=' . $subject);
		break;
		
		case 18:
			//echo 'No surname and message';
			header('Location:../mail.php?report=18&name='. $name . '&mail=' . $mail . '&subject=' . $subject);
		break;
		
		case 19:
			//echo 'No name and surname and message';
			header('Location:../mail.php?report=19&mail=' . $mail . '&subject=' . $subject);
		break;
		
				
		case 20:
			//echo 'No mail and message';
			header('Location:../mail.php?report=20&name='. $name . '&surname=' . $surname . '&subject=' . $subject);
		break;
		
		case 21:
			//echo 'No name and mail and message';
			header('Location:../mail.php?report=21&surname=' . $surname . '&subject=' . $subject);
		break;
		
		case 22:
			//echo 'No surname and mail and message';
			header('Location:../mail.php?report=22&name='. $name . '&surname=' . '&subject=' . $subject);
		break;
		
		case 23:
			//echo 'No name and surname and mail and message';
			header('Location:../mail.php?report=23&subject=' . $subject);
		break;
		
		case 24:
			//echo 'No subject and message';
			header('Location:../mail.php?report=24&name='. $name . '&surname=' . $surname . '&mail=' . $mail);
		break;
		
		case 25:
			//echo 'No name and subject and message';
			header('Location:../mail.php?report=25&surname=' . $surname . '&mail=' . $mail);
		break;
		
		case 26:
			//echo 'No surname and subject and message';
			header('Location:../mail.php?report=26&name='. $name . '&mail=' . $mail);
		break;
		
		case 27:
			//echo 'No name and surname and subject and message';
			header('Location:../mail.php?report=27&mail=' . $mail);
		break;
		
		case 28:
			//echo 'No mail and subject and message';
			header('Location:../mail.php?report=28&name='. $name . '&surname=' . $surname);
		break;
		
		case 29:
			//echo 'No name and mail and subject and message';
			header('Location:../mail.php?report=29&surname=' . $surname);
		break;
		
		case 30:
			//echo 'No surname and mail and subject and message';
			header('Location:../mail.php?report=30&name='. $name);
		break;
		
		case 31:
			//echo 'No name and surname and mail and subject and message';
			header('Location:../mail.php?report=31');
		break;
		
		default:
			//echo 'Error';
			header('Location:../mail.php');
	}

	
	