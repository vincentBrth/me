console.info("Hi there ! You are welcome to examine the code");

let available_lang = new Map();
available_lang.set('en','json/en.json');
available_lang.set('fr','json/fr.json');
available_lang.set('.common','json/common.json');
available_lang.set('.request','json/request.json');
this.language = new Language(available_lang,'en');
this.language.update = function(){update();}
this.language.make = function(){make();}

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
    @param string current : the name of the language [en,fr,..]
*/
function Language(langs,current='en'){
    this.current=current;
    this.langs = langs;
        
    let promises=[];
    for(let [key, path] of this.langs){
        promises.push(new Promise((resolve) => {
            resolve($.getJSON(path));
        }))
    }


    this.data=Promise.all(promises).then((values) => {
        let tmp= new Map();
        let index=0;
        for(let [key, path] of this.langs){
            tmp.set(key,values[index]);
            index++;
        }    
        return tmp;    
    });

}

/*
    Check if the language is valid [en,fr,..] and set the right json file
    @param string current : the name of the language
*/
Language.prototype.setLang = function(current){
    if(typeof this.langs.get(current) != 'undefined'){
        this.current=current;
    }else{
        console.error('"'+current+'"'+' is not a valid language of the map used : ');
        console.error(this.langs);
    }
}

/*
    Get the name of the language used [en,fr,..]
    @return the current
*/
Language.prototype.getLang = function(){
    return this.current;
}


/*
    Get the path of the json file associated 
    @return the path of the json
*/
Language.prototype.getJsonPath = function(current=this.getLang()){
    return this.langs.get(current);
}

Language.prototype.getData= async function(current=this.getLang()){
    return await Promise.resolve((await this.data).get(current))
}

/*
    Get Github name for my account depending on username in common.json
*/
Language.prototype.getGithubName=async function(){
    return (await Promise.resolve((await this.data).get('.common')))['contact']['social']['Github']['username'];
}

/*
    Get Github URL for my account depending on username in common.json
    @return https://github.com/RealVincentBerthet/
*/
Language.prototype.getGithubURL=async function(){
    let url=await this.getGithubName();
    return 'https://github.com/'+url+'/';
}

/*
    Get Github page URL for my account depending on username in common.json
    @return https://realvincentberthet.github.io/
*/
Language.prototype.getGithubPageURL=async function(){
    let url=await this.getGithubName();
    return 'https://'+url+'.github.io/';
}

/*
    Get Github public directory for my account depending on username in common.json
    @return https://github.com/RealVincentBerthet/Vincent/tree/master/Public
*/
Language.prototype.getGithubPublicURL=async function(){
    return  await this.getGithubURL()+'Workspace/raw/master/Public/';
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
        this.setLang('fr');
    }else{
        this.setLang('en');
    }
    this.update();
}

/*
    Initialize night shift mode
*/
Language.prototype.initNightShift=function(){
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme == "dark") {
        document.body.classList.toggle("dark-theme");
    } else {
        document.body.classList.toggle("light-theme");
    } 

    this.updateNightShift();
}

/*
    Update navigation icon
*/
Language.prototype.updateNightShift=function(){
    let theme=localStorage.getItem("theme");
    if(theme=='dark'){
        $('#nightShift').html("<i class='far fa-moon'>");
    }else {
        $('#nightShift').html("<i class='fas fa-sun'>");
    }
}

/*
    Toggle night shift
*/
Language.prototype.nightShift=function(){
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.body.classList.toggle("light-theme");
    var theme = document.body.classList.contains("light-theme")
        ? "light"
        : "dark";
    } else {
    document.body.classList.toggle("dark-theme");
    var theme = document.body.classList.contains("dark-theme")
        ? "dark"
        : "light";
    }
    localStorage.setItem("theme", theme);

    this.updateNightShift();
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
  let yMin=1850; 
  let yMax=2500; 
  let separator="/";
  let d=(date.substring(0,2));
  let m=(date.substring(3,5));
  let y=(date.substring(6));
  let ok=1;

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
    let date2=new Date(y,m-1,d);
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
  let date=checkDate(dt)
  let m=new Date()
  let age="";
  let age_y=0;
  let age_m=0;
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
    $('#release').html(current_release);

    let json=$.getJSON('json/request.json');
    json.done(function(data) {
        for(let i in data.notes){
            current_release=data.notes[i].id;
            $('#release').html(current_release);
            break;
        } 
    });
}

/*
    Make the footer of the page
    @param  string array data : the data of the *current*.json
*/
function makeFooter(data){ 
    let content=data.footer;
     
    $('#year').html((new Date()).getFullYear());
    $('#footerContent').html(content);
    makeRelease();
}

