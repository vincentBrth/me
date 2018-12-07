
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
		<style type="text/css">

${demo.css}
		</style>
		<script type="text/javascript">
		

  
$(function() {
	

	Highcharts.setOptions(
		{
			lang: 
			{
				//Trick pour decaler  a droite la barre des buttons, non clickable car c'est des label et donc invisilbe pour l'utilisateur
				rangeSelectorZoom: '<span style="color:white">................</span>',
			}
		});

 var chart;
  chart = new Highcharts.StockChart({
    chart: {
      zoomType: 'xy',
      renderTo: 'container',
      events: {
        load: requestData

      }
    },
	
	credits:{
		enabled:false
	}, 
	navigation: {
            menuStyle: {
            background: '#E0E0E0'
         }
     },


	 
    title: {
      text: '<b>Batteries</b>'
    },
	
    xAxis: [{
      categories: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jui',
        'Jul', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec'
      ],
    }],

    scrollbar: {
      enabled: false
    },
    legend: {
      enabled: true
    },

    yAxis: [{
      labels: {
        min: -40,
        max: 50,
        format: '{value} V',

      },
      title: {
        text: '<b>Voltage</b>',


      },
      opposite: false
    }],


	
	
	tooltip: {
		xDateFormat: '%e/%m/%Y at %Hh%Mmin%Ss',                
		pointFormat: '<span style="color:{series.color}">{series.name}</span> : <b>{point.y}</b> V<br/>',
		shared: true
	},

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
	  
    series: []

  });

  

  
  
  //Get value from DB
  
  function requestData() {
   $.ajax({
       // url: 'test2.php',
       url: 'script/chart/dataBatteryAll.php',
		datatype: 'json',
        success: function(data) {
        <!--alert(data); -->
        chart.series[0].setData(data[0]); //B1
		chart.series[1].setData(data[1]); //B2
		chart.series[2].setData(data[2]); //B3
		chart.series[3].setData(data[3]); //B4
		chart.series[4].setData(data[4]); //AVG


        },
        cache: false
    });


   var chart = this,
      data = [
		

        [
			<!-- data 1 -->
        ],
		[
			<!-- data 2 -->
        ],
		[
			<!-- data 3 -->
        ],
		[
			<!-- data 4 -->
        ],
		[
			<!-- data 5 -->
        ]
      ];
	
	
    Highcharts.each(data, function(p, i) {
      
     chart.addSeries({
        name: i === 4 ? 'Average' : 'Battery ' + (i + 1),
        data: p,
        visible: i % 2 ? true : true
      }, false)
    });
    chart.redraw();
  }



});

</script>

<script src="https://code.highcharts.com/stock/highstock.js"></script>
<script src="https://code.highcharts.com/stock/modules/exporting.js"></script>

<!-- THEME -->
<!-- <script type="text/javascript" src="theme/dark-blue.js"></script> -->
<script type="text/javascript" src="script/chart/theme/default.js"></script>
<div id="container" style="height: 400px; min-width: 310px"></div>
