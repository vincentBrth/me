console.info("Hi there ! You are welcome to examine the code");
/*
    ******************************************************************************************* 
                                        Table 
    ******************************************************************************************* 
    1.Language
    2.Date/Age
    3.Footer
*/

/*
    ******************************************************************************************* 
                                        1.Language 
    ******************************************************************************************* 
*/
/*
    Language object
    @param string lang : the name of the language [en,fr,..]
*/
function Language(available_lang,lang='en'){
    this.lang=lang;
    this.available_lang = available_lang;
    this.set(this.lang);
}

/*
    Check if the language is valid [en,fr,..] and set the right json file
    @param string lang : the name of the language
*/
Language.prototype.set = function(lang){
    if(typeof this.available_lang.get(lang) != 'undefined'){
        this.lang=lang;
    }else{
        console.error('"'+lang+'"'+' is not a valid language of the map used : ['+this.getLangAvailable()+']');
    }
}

/*
    Get the name of the language used [en,fr,..]
    @return the lang
*/
Language.prototype.getLang = function(){
    return this.lang;
}

/*
    Get the list of the language available
    @return the name of each language available
*/
Language.prototype.getLangAvailable = function(){
    var result=[];
    this.available_lang.forEach(function(value,key){
        result.push(key);
    });
    return result;
}

/*
    Get the path of the json file associated 
    @return the path of the json
*/
Language.prototype.getJsonPath = function(lang=this.getLang()){
    return this.available_lang.get(lang);
}

/*
    Declare the make function
*/
Language.prototype.make = function(){
    console.error('make is not implemented');
}

/*
    Declare the update function
*/
Language.prototype.update = function(){
    console.error('update is not implemented');
}

/*
    Switch to the language and then update the content
*/
Language.prototype.switch = function(){
    if(this.getLang()=='en'){
        this.set('fr');
    }else{
        this.set('en');
    }
    this.update();
}

/*
    ******************************************************************************************* 
                                        2.Date/Age 
    ******************************************************************************************* 
*/

/*
	Check if a date exist and put it in a standard format
	@param string date : the date checked
	@return a date 
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
    ******************************************************************************************* 
                                        3. Footer
    ******************************************************************************************* 
*/
/*
    Build the release with the latest update wrote in the request.json
*/
function makeRelease(){
    current_release='X';
    var json=$.getJSON('/json/request.json');
    //var json=$.getJSON('/json/request.json'); //#WEB
    json.done(function(data) {
        for(var i in data.notes){
            current_release=data.notes[i].id;
            $('#release').html(current_release);
            break;
        } 
    });
}

/*
    Make the footer of the page
    @param  string array data : the data of the *lang*.json
*/
function makeFooter(data){ 
    var content=data.footer;
     
    $('#year').html((new Date()).getFullYear());
    $('#footerContent').html(content);
    makeRelease();
}