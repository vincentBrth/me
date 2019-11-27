<?php
	include_once('connect.php');

	//Formulaire pour ajouter un commentaire avec comme parametre : la batterie concerner, le messga de la box par defaut et le message du button par defaut	
	function add_comment($num_battery,$text_msg,$text_button)
	{
		global $db;
?>	

		<form class="replyForm" action='script/addComment_post.php' method='POST'>

			<fieldset>
				<textarea tabindex="3" class="input-xlarge span12" id="message" name="message" rows="12" placeholder="<?php echo $text_msg ;?>"></textarea>

				<div class="actions">					
					<button tabindex="3" type="submit" class="btn btn-success"><?php echo $text_button ;?></button>					
				</div>
			</fieldset>
			<!-- Faire passer le numero du report -->
			<input type='hidden' name='adr' value='<?php echo $num_battery;?>'/>
		</form>	
<?php
	}
	//Test
	//add_comment(1);
	
?>

