<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Meta Tag -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    
    <!-- SEO -->
    <meta name="description" content="AF">
    <meta name="author" content="Vincent Berthet">
    <meta name="url" content="https://vberthet.net">
    <meta name="copyright" content="Vincent Berthet">
    
    <title>Request</title>
      
    <!-- Favicon -->
    <link rel="shortcut icon" href="img/vberthet/vb_black_bg_border_512.png">
    <!-- Main CSS Stylesheet -->
    <link rel="stylesheet" type="text/css" href="css/style_request.css">
    <!-- Google Web Fonts  -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:400,300,500,600,700">
 </head>

  <body>    
	<!-- Preloader Start -->
    <div id="preloader">
	  <div class="loader"></div>
    </div>
    <!-- Preloader End -->

    <!-- Content Start -->
     <div id="home" class="home-section">
         <div class="header-top-area" id="header_content"></div>
             <div class="container">
                <div class="row" id="main_content"></div>
             </div>
        <div id="counter" class="hidden"></div>
    </div>
    <!-- Content End -->
    
    <!-- Footer Start -->
    <footer class="footer-section" id="footer_content"></footer>
    <!-- Footer End -->
        
    <!-- All Javascript Plugins  -->
    <script type="text/javascript" src="plugin/jquery.min.js"></script>
    <script type='text/javascript' src='plugin/bootstrap/js/bootstrap.min.js'></script>
    <!-- Main Javascript File  -->
    <script type="text/javascript" src="js/effects.js"></script>
    <script type="text/javascript" src="js/common_content.js"></script>
    <script type="text/javascript" src="js/Nrequest.js"></script>

    <?php
        if(isset($_GET["query"])){
            $query=htmlspecialchars($_GET["query"]);
        }
        
        $host='http://' . $_SERVER['SERVER_NAME'];
        if(isset($_GET["from"])){
            $from=htmlspecialchars($_GET["from"]);
        }else{
            $from=$host;
        }
        if(isset($_GET["type"]))    $type   =   htmlspecialchars($_GET["type"]);
        if(isset($_GET["alert"]))   $alert  =   htmlspecialchars($_GET["alert"]);
        if(isset($_GET["to"]))      $to     =   htmlspecialchars($_GET["to"]);

        
        echo '<script>init("' . $query . '","' . $from . '","' . $host . '");</script>';
      ?>
  </body>
</html>