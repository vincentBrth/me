/**
 * @param {Define the kind of the request [Redirect,Notes,Player,Error,Unknown]} type 
 * @param {Details of the request} id 
 * @param {link to go} to 
 * @param {source link} from 
 * @param {main domain link} host 
 */


 /**
  * Initialize request.html depending of the request selected
  */
function init(type,id,to,from,host){
    this.type=type;
    this.id=id;
    this.to=to;
    this.host=host
    if(host=="" || host==null) this.host="./";
    this.from=from;
    if(from=="" || from==null) this.from=this.host;
    this.waitTime=10;
    this.x;
    document.title = this.id;
    if(document.title=="null") document.title=this.type;
    this.language.setLang(".request");
    this.language.initNightShift();
    this.language.make();
}


/**
 * Call after initalization to make the correct content of the page
 */
async function make(){
    let data_lang=await this.language.getData();

    if(this.type=="Notes"){
            makeNotes(data_lang);
    }else if(this.type=="Player"){
            makePlayer(data_lang);  
    }else if(this.type=="Download"){
            makeDownload(data_lang);
   }else if(this.type=="WebGL"){
            makeWebGL(data_lang);
    }else{
            makeRequest(data_lang);
            makeCounter();      
    }   
    makeFooter(await this.language.getData("en"));
    document.documentElement.style.setProperty('--primary-color', checkColor(type));
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
async function makeDownload(data){
    let main_html="";
    let public=await this.language.getGithubPublicURL();
    for(let key in data.download){
        if(key==this.id){
            if(data.download[key].title!=undefined) document.title=data.download[key].title;
            main_html += [
                    "<div class='container'>",
                        "<div class='request-center col-md-12'>",
                            "<div class='request-logo'>",
                                "<img src='img/vberthet/vb_white_bg_512.png' alt='logo_ico'/>Download",
                            "</div>",
                            "<div class='request-title'>",
                                "<h3>"+data.download[key].name+"</h3>",
                            "</div>",
                            "<p><h5><i>"+data.download[key].description+"</i></h5><p>",
                            "<div>",
                                "<a class='button button-style button-style-dark' href='"+public+data.download[key].href+"' onclick=''><i class='far fa-arrow-alt-circle-down'></i> "+data.download[key].type+"</a>",
                            "</div>",
                        "</div>",
                    "</div>"
                    ].join('');
                    $('#main_content').html(main_html);
                    break;
        }
    }

    
    //if there is content for this id main_html shouldn't be empty
    if(main_html!=""){
        $('#main_content').html(main_html)
        makeHeader(this.type);
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
    let main_html="";
    for(let key in data.player){
        console.log(this.id);
        if(key==this.id){
            if(data.player[key].title!=undefined) document.title=data.player[key].title;
            main_html=[
                "<div class='container'>",
                    "<h1>"+data.player[key].name+"</h1>",
                    "<p>"+data.player[key].description+"</p>",
                    "<div class='col-md-12 request-center video-container'>",
                        "<iframe width='854' height='480' src='"+data.player[key].href+"' frameborder='0' allow='autoplay; encrypted-media' allowfullscreen></iframe>",
                    "</div>",
                "</div>"
            ].join('');
            break;
        }
    }

    //if there is content for this alert main_html shouldn't be empty
    if(main_html!=""){
        $('#main_content').html(main_html)
        makeHeader(this.type);
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
async function makeWebGL(data){
    let main_html="";
    let width='960';
    let height='643';
    let page=await this.language.getGithubPageURL();
    let githubURL=await this.language.getGithubURL();
    for(let key in data.player){
        let o=data.player[key];
        if(key==this.id){
            if(data.player[key].title!=undefined) document.title=data.player[key].title;
            
            href=page+o.href;
            width=o.width != undefined ? o.width : width;
            height=o.height != undefined ? o.height : height;
        
            main_html=[
                "<div class='container'>",
                    "<h1>"+o.name+"</h1>",
                    "<p>"+o.description+"</p>",
                    "<p><a href='"+githubURL+o.href.split('/')[0]+"' target='_blank'><i class='fab fa-github'></i> Github source</a></p>",
                    "<div class='request-center'><iframe width='"+width+"' height='"+height+"' src='"+href+"' frameborder='0' allow='autoplay; encrypted-media' allowfullscreen></iframe><div>", 
                "</div>"
            ].join('');
            break;
        }
    }

    //if there is content for this alert main_html shouldn't be empty
    if(main_html!=""){
        $('#main_content').html(main_html)
        makeHeader(this.type);
    }else{
        console.error("type : "+this.type+" content error for id : "+this.id);
        this.type="player_error";
        make();
    }
}

async function makeNotes(data){
    let updates_html=[  "<div class='col-sm-6'>",
                        "<h1>Updates</h1><br/>",
                        "<ul>"        
    ].join(''); 
    let todo_html=[  "<div class='col-sm-6'>",
                        "<h1>To Do</h1><br/>",
                        "<ul>"        
    ].join('');            
   
    let url=await this.language.getGithubURL();
    for(let key in data.notes){   
        let id=data.notes[key].id;
        if(data.notes[key].github==true) id="<a href='"+url+"vberthet/releases/tag/"+id+"' target='_blank'>"+id+"</a>";  
        updates_html += [
            "<li>",
                "<p>",
                "<b><u>Version "+id+" :</b></u> "+data.notes[key].released+"<br/>",
                data.notes[key].text,
                "</p>",
            "</li>"
        ].join('');     
    }
    updates_html +="</ul></div>";
    for(let key in data.todo){

        todo_html += [
            "<li>",
                data.todo[key],
            "</li>"
        ].join('');       
    }
    todo_html+="</ul></div>";
    
    $('#main_content').html("<div class='container'>"+updates_html+todo_html+"</div>");
    makeHeader(this.type);
} 

function makeRequest(data){    
    let id="";
    let color="";
    let title="";
    let text="";
    let button="";
    
    if((this.type=='Redirect' && checkRequest(data.redirect) && this.to !="") || (this.type=='Error' && checkRequest(data.error))){
         if(this.type=='Error'){
            data=data.error;
            this.to=this.from;
        }else if(this.type=='Redirect'){
            data=data.redirect;
            if(this.id=='WIP_Mobile') this.to='request.html?type=Redirect&id=Mobile&to='+this.to;   
        }
    }else{
        //Not enough data to launch a valid request
        console.warn("unknown request");
        data=data.unknown;
        this.id='unknown';
        this.type="Unknown";
        this.to=this.from;
    }

    //Execute request
    for(let key in data){
        if(key=='button')   button=data[key];
        if(key=='color')    color=data[key];
        if(key=='details'){
            for(let key2 in data[key]){
                if(key2==this.id){
                    id=data[key][key2].id;
                    title=data[key][key2].title;
                    text=data[key][key2].text;
                }
            }
        }
      
    }
     
    makeHeader(this.type);
    makeContent(color,title,text,button,this.to,this.host);
}


function checkRequest(data){
    //Check if the data are valid  
    for(let key in data.details){
        if(key==this.id) return true;
    }
    return false;
}

function makeContent(color,title,text,button,to,from){
    let content_html="";
    content_html += [
                    "<div class='container'>",
                        "<div class='request-center col-md-12'>",
                            "<div class='request-logo'>",
                                "<img src='img/vberthet/vb_white_bg_512.png' alt='logo_ico'/>Download",
                            "</div>",
                            "<div class='request-title'>",
                                "<h1>"+title+"</h1>",
                            "</div>",
                            "<p><h4><i>"+text+"</i></h4><p>",

                            "<div class='counter'>",
                                "<p>You will be automatically redirected in <span id='counter'>x</span> s</p>",
                            "</div>",
                                "<div>",
                                    "<a class='button button-style button-style-dark' href='"+to+"'>"+button+"</a>",
                                "</div>",
                        "</div>",
                    "</div>"
                    ].join('');
    $('#main_content').html(content_html);
    
}

function makeHeader(type){
    $('#request_nav').html(type);
}

function checkColor(type){
    var style = getComputedStyle(document.body);
    let color=style.getPropertyValue('--'+type.toLocaleLowerCase()+'-color');

    if(color==""){
        console.error("Color not found use '--primary-color' instead");
        color=style.getPropertyValue('--primary-color');
    } 

    return color;
}