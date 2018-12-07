<?php 

session_start();

//GET from url
$_SESSION['query'] = htmlspecialchars($_GET["q"]);
$_SESSION['host'] ='http://' . $_SERVER['SERVER_NAME'];
if(isset($_GET["from"])){
    $_SESSION['from'] =htmlspecialchars($_GET["from"]);
}else{
    $_SESSION['from'] =$_SESSION['host'];
}


//header('Location: DONE.php');


?>



<script type="text/javascript" src="plugin/jquery.min.js"></script>
<script>
this.query = '<?php echo $_SESSION['query']; ?>'; 
this.json='json/Ncommon.json';
this.done=false;



    function select(){
        //Check if it is a project
        if(!this.done){
            $.getJSON(this.json, function(data) {
                isProject(data);
            })  
        }
        
        //Check if it is a error

        //Check if it is notes

        //Check if it is player
    }





    function isProject(data){
        for(key in data.portfolio){
           if(key==query){
               <?php $_SESSION['data']=data;
               $_SESSION['project']=data.portfolio[key];
               this.done=true;
               return;
           }
        }
    }









    select();
    
</script>
<?php
    header('location:DONE.php');
?>