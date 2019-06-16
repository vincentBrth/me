/**
 * @param {Define the kind of the request [Redirect,Notes,Player,Error,Unknown]} type 
 * @param {Details of the request} alert 
 * @param {link to go} to 
 * @param {source link} from 
 * @param {main domain link} host 
 */

 var onWeb="";
 /**
  * Initialize request.php depending of the request selected
  */
function init(type,alert,to,from,host){
    this.json=onWeb+'json/request.json';
    this.type=type;
    this.alert=alert;
    this.to=to;
    this.from=from;
    if(from=="") this.from=host;
    this.host=host;
    
    this.waitTime=10;
    this.x;
    make();
}

//CHECK FUNCTION to determine if unknown


/**
 * Call after initalization to make the correct content of the page
 */
function make(){
    if(this.type=="Notes"){
        $.getJSON(this.json, function(data) {
            makeNotes(data);  
            makeRelease();
        })
    }else if(this.type=="Player"){
        $.getJSON(this.json, function(data) {
            makePlayer(data);  
            makeRelease();
        })
    }else if(this.type=="Download"){
        $.getJSON(this.json, function(data) {
            makeDownload(data);  
            makeRelease();
        })
   }else if(this.type=="WebGL"){
        $.getJSON(this.json, function(data) {
            makeWebGL(data);  
            makeRelease();
        })
    }else{
        $.getJSON(this.json, function(data) {
            makeRequest(data);   
            makeRelease(); 
            makeCounter();      
        })    
    }
}

/**
 *  Replace the hidden label 'counter' by the waiting time remaining before automatic action
 */
function makeCounter() {
    window.document.getElementById('counter').innerHTML = this.waitTime;
    window.document.getElementById('counter').innerHTML = this.waitTime;
    this.x = window.setInterval('count()', 1000);
}

/**
 * Count until redirection
 */
function count() {
    ((this.waitTime > 0)) ? (window.document.getElementById('counter').innerHTML = --this.waitTime) : (window.clearInterval(x));
    if (this.waitTime == 0) {
        window.location = this.to;
    }
}

/**
 * Download page
 * @param {request.json content} data 
 */
function makeDownload(data){
    var main_html="";
    for(var key in data.download){
        if(data.download[key].name==this.alert){
            main_html += [
                    "<div class='request col-md-12'>",
                        "<div class='request-alert'>",
                            "<img src='"+onWeb+"img/vberthet/vb_white_bg_512.png' height='200px' alt='logo_ico'/>Download",
                        "</div>",
                        "<div class='request-player-color'>",
                            "<h1>"+data.download[key].name+"</h1>",
                        "</div>",
                        "<p><h4><i>"+data.download[key].description+"</i></h4><p>",
                        "<div class='request-player-color'>",
                            "<a class='button button-style button-style-dark' href='"+data.download[key].href+"'><i class='far fa-arrow-alt-circle-down'></i> "+data.download[key].type+"</a>",
                        "</div>",
                    "</div>"
                    ].join('');
                    $('#main_content').html(main_html);
                    break;
        }
    }



    
    //if there is content for this alert main_html shouldn't be empty
    if(main_html!=""){
        $('#main_content').html(main_html)
        makeHeader('request-player-color',this.type,this.host);
        makeFooter('request-player-color',this.host);
    }else{
        console.error(this.type+" content error");
        this.type="download_error";
        make();
    }
}


/**
 * Make an embeded player and description
 * @param {request.json content} data 
 */
function makePlayer(data){
    var main_html="";
    for(var key in data.player){
        if(data.player[key].name==this.alert){
            main_html=[
                "<div class='align-center'>",
                    "<h1>"+data.player[key].name+"</h1>",
                        "<div class='col-md-12 video-container'>",
                            "<iframe width='854' height='480' src='"+data.player[key].href+"' frameborder='0' allow='autoplay; encrypted-media' allowfullscreen></iframe>",
                        "</div>",
                    "<p>"+data.player[key].description+"</p>",
                "</div>"
            ].join('');
            break;
        }
    }

    //if there is content for this alert main_html shouldn't be empty
    if(main_html!=""){
        $('#main_content').html(main_html)
        makeHeader('request-player-color',this.type,this.host);
        makeFooter('request-player-color',this.host);
    }else{
        console.error(this.type+" content error");
        this.type="player_error";
        make();
    }
}

/**
 * Make an embeded  web gl player with Unity default template
 * @param {request.json content} data 
 */
function makeWebGL(data){
    var main_html="";
    for(var key in data.player){
        if(data.player[key].name==this.alert){
            main_html=[
                "<div class='align-center'>",
                    "<h1>"+data.player[key].name+"</h1>",
                        "<iframe width='960' height='643' src='"+data.player[key].href+"' frameborder='0' allow='autoplay; encrypted-media' allowfullscreen></iframe>", 
                    "<p>"+data.player[key].description+"</p>",
                "</div>"
            ].join('');
            break;
        }
    }

    //if there is content for this alert main_html shouldn't be empty
    if(main_html!=""){
        $('#main_content').html(main_html)
        makeHeader('request-player-color',this.type,this.host);
        makeFooter('request-player-color',this.host);
    }else{
        console.error(this.type+" content error");
        this.type="player_error";
        make();
    }
}

function makeNotes(data){
    var updates_html=[  "<div class='col-sm-6'>",
                        "<h1>Updates</h1><br/>",
                        "<ul>"        
    ].join(''); 
    var todo_html=[  "<div class='col-sm-6'>",
                        "<h1>To Do</h1><br/>",
                        "<ul>"        
    ].join('');            
   
    for(var key in data.notes){        
        updates_html += [
            "<li>",
                "<p>",
                "<b><u>Version "+data.notes[key].id+" :</b></u> "+data.notes[key].released+"<br/>",
                data.notes[key].text,
                "</p>",
            "</li>"
        ].join('');     
    }
    updates_html +="</ul></div>";
    for(var key in data.todo){

        todo_html += [
            "<li>",
                data.todo[key],
            "</li>"
        ].join('');       
    }
    todo_html+="</ul></div>";
    
    $('#main_content').html(updates_html+todo_html);
    makeHeader('request-notes-color',this.type,this.host);
    makeFooter('request-notes-color',this.host);
} 

function makeRequest(data){    
    var alert="";
    var color="";
    var title="";
    var text="";
    var button="";
    
    if((this.type=='Redirect' && checkRequest(data.redirect) && this.to !="") || (this.type=='Error' && checkRequest(data.error))){
         if(this.type=='Error'){
            data=data.error;
            this.to=this.from;
        }else if(this.type=='Redirect'){
            data=data.redirect;
            if(this.alert=='WIP_Mobile') this.to='request.php?type=Redirect&alert=Mobile&to='+this.to;   
        }
    }else{
        //Not enough data to launch a valid request
        console.error(this.type+" content error");
        data=data.unknown;
        this.alert='unknown';
        this.type="Unknown";
        this.to=this.from;
    }

    //Execute request
    for(var key in data){
        if(key=='button')   button=data[key];
        if(key=='color')    color=data[key];
        if(key=='details'){
            for(var key2 in data[key]){
                if(key2==this.alert){
                    alert=data[key][key2].alert;
                    title=data[key][key2].title;
                    text=data[key][key2].text;
                }
            }
        }
      
    }
     
    makeHeader(color,this.type,this.host);
    makeFooter(color,this.host);
    makeContent(alert,color,title,text,button,this.to,this.host);
}


function checkRequest(data){
    //Check if the data are valid  
    for(var key in data.details){
        if(key==this.alert) return true;
    }
    return false;
}




function makeContent(alert,color,title,text,button,to,from){
    var content_html="";
    content_html += [
                    "<div class='request col-md-12'>",
                        "<div class='request-alert'>",
                            "<img src='"+onWeb+"img/vberthet/vb_white_bg_512.png' height='200px' alt='logo_ico'/>"+alert+"",
                        "</div>",
                        "<div class='"+color+"'>",
                            "<h1>"+title+"</h1>",
                        "</div>",
                        "<p><h4><i>"+text+"</i></h4><p>",

                        "<div class='counter'>",
                            "<p>You will be automatically redirected in <span id='counter'>x</span> s</p>",
                        "</div>",
                            "<div class='"+color+"'>",
                                "<a class='button button-style button-style-dark' href='"+to+"'>"+button+"</a>",
                            "</div>",
                    "</div>"
                    ].join('');
    $('#main_content').html(content_html);
    
}
function makeHeader(color,type,from){
    var header_html="";
    header_html += [
        "<div class='header-top-area'>",
            "<div class='container'>",
                "<div class='row'>",
                
                    "<div class='col-sm-4'>",
                        "<div class='logo "+color+"'>",
                            "<a class='smoth-scroll' href='"+from+"'>",
                                "<img src='"+onWeb+"img/vberthet/vb_white_bg_512.png' alt='logo_ico'>Vincent <bold>Berthet</bold>",
                            "</a>",
                        "</div>",
                    "</div>",
                    
                    "<div class='col-sm-8'>",
                        "<div class='navigation-menu'>",
                            "<div class='navbar'>",
                                "<div class='navbar-header'>",
                                    "<button type='button' class='navbar-toggle' data-toggle='collapse' data-target='.navbar-collapse'>",
                                        "<span class='sr-only'>Toggle navigation</span>",
                                        "<span class='icon-bar'></span>",
                                        "<span class='icon-bar'></span>",
                                        "<span class='icon-bar'></span>",
                                    "</button>",
                                "</div>",
                                "<div class='navbar-collapse collapse'>",
                                    "<ul class='nav navbar-nav navbar-right "+color+"'>",
                                        "<li>",
                                            "<a class='smoth-scroll' href='#home'>"+type+"</a>",
                                        "</li>",
                                    "</ul>",
                                "</div>",
                            "</div>",
                        "</div>",
                    "</div>",
                "</div>",
            "</div>",
        "</div>"
    ].join('');
    $('#header_content').html(header_html);
}

function makeFooter(color,from){
    var footer_html="";
    footer_html += [
                "<div class='container text-center "+color+"'>",
                    "&copy; "+new Date().getFullYear()+"<a href='"+from+"'> Vincent Berthet's Website</a> - <a href='request.php?type=Notes' >V<span id='release'></span></a> | Developed by <a href='"+from+"'> Vincent Berthet</a>",
                "</div>"
        ].join('');
    $('#footer_content').html(footer_html);
}