<?php
	//Get date min
	include_once('script/connectBattery.php');
	$request = $db->query("SELECT MIN(date_mesure) FROM batteries WHERE batterie=1");
	$data = $request->fetch();
	$request->closeCursor();

	//Si pas de valeur du tout dans la table alors on n'affiche pas
	if($data[0]==NULL)
	{
		echo '<center>The chart can\'t be display, there is no data for \'Battery 1\'</center><br/><br/>';
	}
	else
	{
						
?>

		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
		<style type="text/css">

${demo.css}
		</style>
		<script type="text/javascript">
		

		
		
		
$(function () {
   
   	Highcharts.setOptions(
		{
			lang: 
			{
				rangeSelectorZoom: '	',
			}
		});
   
   
   // $.getJSON('dataBattery1.php', function (data) {
   $.getJSON('script/chart/dataBattery1.php', function (data) {
        // Create the chart
        $('#container').highcharts('StockChart', {


			rangeSelector : 
			{
				buttonTheme: {
				  width: 100
				},
				buttons: [{
				type: 'day',
				  count: 1,
				  text: '1 day'
				},
				{
				type: 'week',
				  count: 1,
				  text: '1 week'
				},
				{
				 type: 'month',
				  count: 1,
				  text: '1 month'
				}, {
				  type: 'month',
				  count: 3,
				  text: '3 months'
				}, {
				  type: 'all',
				  text: 'All'
			  }],               

		
				inputDateFormat: '%e/%m/%Y',
				//inputEditDateFormat: '%e:%m:%Y.%L',
				// Custom parser to parse the %H:%M:%S.%L format
				inputDateParser: function (value) 
				{
					value = value.split(/[:\.]/);
					return Date.UTC
					(
						1970,
						0,
						1,
						parseInt(value[0], 10),
						parseInt(value[1], 10),
						parseInt(value[2], 10)
					);
				},
					selected : 4,
			},
			
			credits:{
				enabled:false
			}, 
			navigation: {
					menuStyle: {
					background: '#E0E0E0'
				 }
			 },
			
			
            title : {
                text : '<b>Battery 1</b>'
            },
			xAxis: [{
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
			}],
			yAxis: {
				labels: {
              min: -40,
              max: 50,
              format: '{value} V',
						},
				title: {
						text: '<b>Voltage</b>'
						},
							opposite: false,
			},
			
			
			tooltip: {
				xDateFormat: '%e/%m/%Y at %Hh%Mmin%Ss',                
				pointFormat: '<span style="color:{series.color}">{series.name}</span> : <b>{point.y}</b> V<br/>',
				shared: true
			},
			
						
			scrollbar : {
                enabled : false
            },

            series : [{
                name : '<span style="color:green"> Voltage </span>',
				color:'green',
                data : data,
                tooltip: {
                    valueDecimals: 2
                }
            }]
			
			
			
			
        });
    });

});

		</script>

<script src="https://code.highcharts.com/stock/highstock.js"></script>
<script src="https://code.highcharts.com/stock/modules/exporting.js"></script>
<!-- THEME -->
<script type="text/javascript" src="script/chart/theme/default.js"></script>
<div id="container" style="height: 400px; min-width: 310px"></div>
<?php
	}
?>