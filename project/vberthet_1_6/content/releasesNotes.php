<!DOCTYPE html>

<html lang='en'>
    <head>
        <!-- Meta -->
        <meta charset='utf-8'>
        <meta http-equiv='X-UA-Compatible' content='IE=edge'>
        <meta name='viewport' content='width=device-width, initial-scale=1'>
        <meta name='description' content='releases'>
        <meta name='author' content='Vincent Berthet'>
        <title>Releases Notes</title>
        <link rel='icon' type='image/png' href='../img/logo.png'>
        <script src='../lib/jquery/jquery.js'></script>
    </head>
    
    <body>
        <?php $host='http://' . $_SERVER['SERVER_NAME'] ?>
        <div align="center" style="margin-top:5%">
        <a  href="<?php echo $host; ?>" style="text-decoration:none;color:#000000", title="Back to Domain"><img src='../img/logo.png' alt="logo"><span style="font-size:7em">Releases Notes</span></a>
        </div>
        <div id="notes"></div>
    </body>
    <script>
        var notes_html="<ul>";
        $.getJSON('releasesNotes.json', function(data) {
            for(var i in data.version){
                notes_html +="<p style='text-align:center;'>Current release used is <b style='color:green;'>"+data.version[i].id+"</b></p><br/>"
                break;
            }
            
            for(var i in data.version){
               notes_html += [
                    "<li>",
                        "<p>",
                        "<b><u>Version "+data.version[i].id+" : </b></u>"+data.version[i].released+"<br/>",
                        data.version[i].notes,
                        "</p>",
                    "</li>"
                ].join(''); 
            }
            if(typeof data.upgrade != 'undefined'){ 
                notes_html+="</ul></br><h3 style='padding-left:20px';>TODO :</h3><ul>"  
                for(var i in data.upgrade){
                   notes_html += [
                       "<li>",
                            data.upgrade[i]+"<br/>",
                       "</li>"
                    ].join(''); 
                }
            }
            notes_html+="</ul>";
            $('#notes').html(notes_html);
            
        });
    </script>
</html>