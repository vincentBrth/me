console.info("Hi there curious person, you're welcome on my Portfolio !");
/*
	Check if a language is defined
	@return the language currently used [EN,FR]
*/
function checkLanguage(){
    if(typeof this.current_language == 'undefined'){
        this.current_language = 'en';
     }
       return this.current_language;
}

/*
	Change the language which will be used and update the content
*/
function updateLanguage(){
  if(checkLanguage()=='en'){
      this.current_language='fr';
    }else{
      this.current_language='en';
    }
  updateContent();
}

/*
	Check if a date exist and put it in a standard format
	@param string date : the date checked
	@return a date in the format : Tue Feb 20 1996 00:00:00 GMT+0100 (Paris, Madrid)
*/
function checkDate(date) {
  var yMin=1850; 
  var yMax=2500; 
  var separator="/";
  var d=(date.substring(0,2));
  var m=(date.substring(3,5));
  var y=(date.substring(6));
  var ok=1;

  if ( ((isNaN(d))||(d<1)||(d>31)) && (ok==1) ) {
     console.error("Invalid day"); ok=0;
  }
  if ( ((isNaN(m))||(m<1)||(m>12)) && (ok==1) ) {
      console.error("Invalid month."); ok=0;
  }
  if ( ((isNaN(y))||(y<yMin)||(y>yMax)) && (ok==1) ) {
       console.error("Invalid year"); ok=0;
  }
  if ( ((date.substring(2,3)!=separator)||(date.substring(5,6)!=separator)) && (ok==1) ) {
      console.error("Invalid "+separator); ok=0;
  }
  if (ok==1) {
    var date2=new Date(y,m-1,d);
    d2=date2.getDate();
    m2=date2.getMonth()+1;
    y2=date2.getYear();
    if (y2<=100) {y2=1900+y2}
    if ( (d!=d2)||(m!=m2)||(y!=y2) ) {
      console.error("Date "+date+" doesn't exist");
      ok=0;
    }
    ok=date2;
  }
 return ok;
}

/*
	Get an age in function of a date inserted
	@param string dt : the date of birth used
	@param string format : used to customize the string returned
	@return a string with age information
*/
function getAge(dt,format) {
  var date=checkDate(dt)
  var m=new Date()
  var age=""; var age_y=0;var age_m=0;
  if (date!=0) {
    if (date.getTime()>m.getTime()) {
      age="NA";
      console.error("Date of birth is in the future");
      document.formage.dt_naissance.focus();
    }
    age_y = m.getFullYear()-date.getFullYear();
    m.setYear(date.getYear());
    if ((date.getTime()>m.getTime())&&(date.getMonth()-m.getMonth()!=0)) {age_y--;}
    if (date.getMonth() >= m.getMonth()) {
      age_m = 12 - (date.getMonth()-m.getMonth())
    } else {
      age_m = (m.getMonth()-date.getMonth())
    }
    if (age_m==12) {age_m=0;}
    if (age_y==1) { age=age_y+" year"}
    if (age_y>1) { age=age_y+" years old"}
    if ((age_y>0)&&(age_m>0)) {age+=" and "}
    if (age_m>0) {age+=age_m+" month"}
    if (age=="") { age="less than 1 month"}
  } else {
    document.formage.dt_naissance.focus();
  }
  if(format=="year"){
    return age_y;
  }else{
   return age;
  }
}

/*
	Update the content of the sections depending of the language currently used
*/
function updateContent(){
  if(checkLanguage()=='fr'){
    this.fileLanguage='content/fr.json';
  }else{
  	this.fileLanguage='content/en.json';
  }

  $.getJSON(this.fileLanguage, function(data) {
      
    $('#navigationContent_bio').html(data.navigation.bio.menu);
    $('#navigationContent_projects').html(data.navigation.projects.menu);
    $('#navigationContent_skills').html(data.navigation.skills.menu);
    $('#navigationContent_networks').html(data.navigation.networks.menu);
    $('#langFlag').html(data.lang.flag);

    $('#descriptionContent').html(data.preview.title);
    $('#quoteContent').html(data.preview.quote);
    $('#bioContent').html("<h2>"+data.navigation.bio.title+"</h2>"+data.navigation.bio.content.part_1+ getAge("20/02/1996","year") + data.navigation.bio.content.part_2 + (getAge("20/02/1996","year")-14) +data.navigation.bio.content.part_3);
    $('#skillsContent').html(data.navigation.skills.title);
   

    makeProjects(data);
    makeNetworks(data);
    makeFooter(data);
  
  });

};

/*
    Build the different display of projects listed in the *langu*.json
*/
function makeProjects(data){
    var content=data.projects;
    var project_html="<h2>"+data.navigation.projects.title+"</h2>";
    for(var i in content){ 
       if(typeof content[i].hide == 'undefined' || content[i].hide==false){
        var on_click="";
        if(typeof content[i].mobile != 'undefined' && content[i].mobile==true) on_click=" onclick='mobileAlert()'";
        if(typeof content[i].wip != 'undefined' && content[i].wip==true) on_click=" onclick='wipAlert()'";
        
        project_html += [
               "<figure class='effect-project'>",
                    "<img src='"+content[i].ico+"' alt='"+content[i].title+" missing image'/>",
                    "<figcaption>",
                        "<div>",
                            "<div class='icon-links'><a href='"+content[i].href+"'  target='_blank'"+on_click+"><span class='icon-external-link'></span></a></div>",
                                "<h2>"+content[i].title+"</h2>",
                                "<p>"+content[i].description+"</p>",
                        "</div>",
                    "</figcaption>",			
                "</figure>"
            ].join('');    
       }
    }
     $('#projectsContent').html(project_html);
}

/*
    Build the different networks button listed in the *langu*.json
*/
function makeNetworks(data){
    var content=data.networks;
    var net_html="<h2>"+data.navigation.networks.title+"</h2><p>"+data.navigation.networks.subtitle+"</p><ul class='list-inline banner-social-buttons'>";
    
    for(var i in content){ 
      
        net_html += [
            "<li>",
                "<a href='"+content[i].href+"' target='_blank' class='btn btn-default btn-lg' title='"+content[i].title+"'><i class='fa "+content[i].class_ico+" fa-fw'></i> <span class='network-name'>"+content[i].name+"</span></a>",
            "</li>"
        ].join('');
    }
    net_html+="</ul>";

     $('#networksContent').html(net_html);
}


/*
    Get the current release and then make the footer
*/
function makeFooter(data){ 
    $.getJSON('content/releasesNotes.json', function(v) {
        for(var i in v.version){
            buildFooter(data,v.version[i].id)
            break;
        }
    });
}
   
/*
    Build the content of the footer
*/
function buildFooter(data,current_release){
    var content=data.footer;

    $('#year').html((new Date()).getFullYear());
    $('#release').html(current_release);
    $('#footerContent').html(content);
}

/*
	Display an alert message [EN,FR] to alert the user that the following content is designed for mobile platform
*/
function mobileAlert() {
  if(checkLanguage()=='fr'){
    $.getJSON('content/fr.json', function(data) {
      alert(data.alert.mobile);
    });
  }else{
    $.getJSON('content/en.json', function(data) {
      alert(data.alert.mobile);
    });
  }
}

/*
  	Display an alert message [EN,FR] to alert the user that the following content isn't available yet
*/
function wipAlert() {
  if(checkLanguage()=='fr'){
    $.getJSON('content/fr.json', function(data) {
      alert(data.alert.wip);
    });
  }else{
    $.getJSON('content/en.json', function(data) {
      alert(data.alert.wip);
    });
  }
}

//Launch the updateContent() when the page is completely loaded
$(document).ready(updateContent());