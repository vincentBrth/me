<?php
	
	include_once('connect.php');
	include_once('getId.php');
	include_once('countLine.php');


	//Affichage d'une ligne 
	function get_line_table($id,$nom,$col_1,$col_2,$col_3,$col_4,$col_5)
	{
		$battery_nb=1;
		$battery=get_battery_id($id);
?>
			<div class="row-fluid sortable">		
				<div class="box span12">
					<div class="box-header" data-original-title>
						<h2><i class="halflings-icon hdd"></i><span class="break"></span><?php echo $nom; ?></h2>
						<div class="box-icon">
							<a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>
							<a href="#" class="btn-close"><i class="halflings-icon remove"></i></a>
						</div>
					</div>
					<div class="box-content">
						<table class="table table-striped table-bordered bootstrap-datatable datatable">
						  <thead>
							  <tr>
								  <th><?php echo $col_1;?></th>	<!-- Batterie -->
								  <th><?php echo $col_2;?></th> <!-- Voltage -->
								  <th><?php echo $col_3;?></th> <!-- Load (%) -->
								  <th><?php echo $col_4;?></th> <!-- Date(%)-->
								  <th><?php echo $col_5;?></th> <!-- State-->
							  </tr>
						  </thead>   
						  <tbody>
<?php
		
		for($i=0;$i<$battery_nb;$i++)
		{
?>
			<tr>
					<td><?php echo $battery[$i]['batterie'] ?></td>										<!-- batterie -->						
					<td class="center"><?php echo $battery[$i]['tension'] ?></td>				<!-- Tension -->
					<td class="center"><?php echo $battery[$i]['charge'] ?></td>				<!-- Charge -->
					<td class="center"><?php echo $battery[$i]['date_aff'] ?></td>				<!-- Date -->
		
					<td class="center">
<?php
					if($battery[$i]['etat'] == 'charge')
					{
?>
						<span class="label label-success"><?php echo 'Charge' ?></span> <!-- Etat -->
<?php
					}
					else
					if($battery[$i]['etat'] == 'decharge')
					{
?>
						<span class="label label-important"><?php echo 'Discharge' ?></span>
<?php
					}
					else
					{
?>	
						<span class="label label-warning"><?php echo 'Unknown' ?></span>
<?php
					}



?>
					
					
					
					

				</td>
			</tr>
<?php
			
			
		}
?>
					  </tbody>
					  </table>            
					</div>
				</div><!--/span-->
			</div>
<?php
	}
	

?>