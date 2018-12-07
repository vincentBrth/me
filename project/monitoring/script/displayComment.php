<?php
	include_once('connectComment.php');
	
		
		
	function display_comment($num_battery,$text_underline,$text_date)
	{
		//Recuperation des billets
		global $db;
		$req=$db->prepare('SELECT id, batterie,message, DATE_FORMAT(date, \'%d/%m/%Y at %Hh%imin%ss\') AS date_aff FROM comment WHERE batterie = :numbattery  ORDER BY id DESC LIMIT 0,1');
		$req->execute(array(
		'numbattery' => $num_battery
		));
		
		$data=$req->fetch();
		//Fin recuperation	
		$req->closeCursor();
?>
		
		<!-- Affichage -->

		<h4>
			<u><?php echo $text_underline ;?></u> <i> <?php echo $text_date . ' ' . $data['date_aff']; ?></i>		
		</h4>
				
		<p>
			<?php echo nl2br(htmlspecialchars($data['message'])); ?>
		</p>	

	
		
		
<?php		
		
	}

?>