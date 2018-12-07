this.alert='';
this.mobile=false;
this.wip=false;
this.color='';
this.title='';
this.text='';
this.button='';
this.to='';
this.from='';
this.host='';
this.query='';
this.type='undefined';
this.json='json/Ncommon.json';
this.waitTime=10000;
this.x;
this.list;

function init(query,from,host){
    this.query=query;
    this.from=from;
    this.host=host;
   




    var available_lang = new Map();
    available_lang.set('en','json/en.json');
    available_lang.set('fr','json/fr.json');
    available_lang.set('.common','json/Ncommon.json');
    this.language = new Language(available_lang,'en');
    this.language.make = function(){make();}
    this.language.make();

     //select();
    
}

function make(){
    var common = $.getJSON(this.language.getJsonPath('.common'));
    var lang_selected = $.getJSON(this.language.getJsonPath());

    common.done(function(data_c){
        lang_selected.done(function(data){
            list=new ProjectList(data_c,data);
            //Select the kind of script used
            select();
       });
    }); 


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


function select(){
    
    //Check Project
    if(this.list.get(this.query) != 'undefined'){
        
    }
   

    /*
    $.getJSON(this.json, function(data) {
        //Check if it is an existing Project
        if(type=='undefined'){
            isProject(data);
        }  
        //Check error code

        //Check if it is Notes
        //Check if it is a existing Player




        //Data missing
        if(type=='undefined'){
            loadUnknown(data);
        }


       

        build();

    });
    */

}

function isProject(data){
    for(key in data.portfolio){
       if(key==query){
          this.type='Project';
          loadRedirect(data,data.portfolio[key],key);
          return;
       }
    }
}

function loadRedirect(data,project,name){
    //Check WIP
    this.wip = project.wip ? true : false;
    //Check Mobile
    this.mobile= project.mobile ? true : false;
    //Get to
    this.to= project.href;

    //Display first WIP page and then mobile
    if(this.wip && this.mobile){
        this.to='Nrequest.php?query='+name+'&from=Nrequest.php?query='+name;
        if(this.from=='Nrequest.php?query='+name){
            //from wip so go to mobile
            this.to=project.href;
            this.wip=false;
        }
    }

    //Redirect directly to the page
    if(!this.wip && !this.mobile){
        window.location.replace(project.href);
    }

    //Redirect Design
    var design;
    for(var key in data.redirect){
      if(key=='button')    this.button =data.redirect[key];
        if(key=='color')    this.color =data.redirect[key];
        if(key=='details'){
            if(this.wip && this.mobile){
                design=data.redirect[key].WIP_Mobile
            }else if(this.wip){
                design=data.redirect[key].WIP
            }else if(this.mobile){
                design=data.redirect[key].Mobile
            }

            for(var key2 in design){
                if(key2=='alert')   this.alert  = design[key2];
                if(key2=='title')   this.title  = design[key2];
                if(key2=='text')    this.text   = design[key2]; 
            } 
        }
    }   

}

function loadUnknown (data){
    this.type='Unknown';
    this.to= this.from;

    //Unknown Design
    var design;
    for(var key in data.unknown){
      if(key=='button')    this.button =data.unknown[key];
        if(key=='color')    this.color =data.unknown[key];
        if(key=='details'){
           design=data.unknown[key].unknown;
            for(var key2 in design){ 
                console.log(design[key2]);
                if(key2=='alert')   this.alert =design[key2]; 
                if(key2=='title')   this.title =design[key2]; 
                if(key2=='text')    this.text  =design[key2]; 
            } 
        }
    }  
    console.warn('"'+this.query+'" is not registered as a correct query in "'+this.json+'"  ');
}

function build(){ 
    if(this.type=='Project' || this.type=='Unknown'){
        makeHeader(this.color,this.type,this.host);
        makeFooter(this.color,this.host);
        makeContent(this.alert,this.color,this.title,this.text,this.button,this.to,this.host);
        makeRelease(); 
        makeCounter();      
    }
}




function makeContent(alert,color,title,text,button,to,from){
    var content_html="";
    content_html += [
                    "<div class='request col-md-12'>",
                        "<div class='request-alert'>",
                            "<img src='img/vberthet/vb_white_bg_512.png' height='200px' alt='logo_ico'/>"+alert+"",
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
                                "<img src='img/vberthet/vb_white_bg_512.png' alt='logo_ico'>Vincent <bold>Berthet</bold>",
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