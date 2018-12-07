
		
		<div class="clearfix"></div>
		
		<!-- DEBUT BAS DE PAGE -- OK -->
		<?php 
			include_once('script/countVisit.php'); 
			add_count_visit('script/countVisit.txt',true);
		?>
		<footer>

			<p>
				<span style="text-align:left;float:left">&copy; 2016 <a href="" alt="Bootstrap_Monitoring_Dashboard">DUT Project</a> | Developed by <a href="http://vincent-berthet.net">Vincent Berthet</a></span>
				<span style="text-align:left;float:right"><a href="" alt="Bootstrap_Monitoring_Dashboard"><?php display_count_visit('script/countVisit.txt','Already',' pages have been viewed !') ; ?></a></span>
			</p>

		</footer>
		<!-- FIN BAS DE PAGE -- OK -->
