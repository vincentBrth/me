/**
 * @author Vincent Berthet <vincent.berthet42@gmail.com>
 */
console.info(`Hi there ! You are welcome to examine the code`);

// Initialization
let available_lang = new Map();
available_lang.set(`en`,`json/en.json`);
available_lang.set(`fr`,`json/fr.json`);
available_lang.set(`.common`,`json/common.json`);
available_lang.set(`.request`,`json/request.json`);
this.language = new Language(available_lang,`en`);
this.language.update = function(){update();}
this.language.make = function(){make();}
this.nightShift=new NightShift();

/*
    ******************************************************************************************* 
                                        Table 
    ******************************************************************************************* 
    1. Language
    2. Nightshift
    3. Date/Age
    4. Header
    5. Footer
*/
/*
    ******************************************************************************************* 
                                        1. Language 
    ******************************************************************************************* 
*/
/**
*    Language object
*    @param {map} langs Mapping of language and his json
*    @param {string} current The name of the language [en,fr,..]
*/
function Language(langs,current=`en`){
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

/**
*    Check if the language is valid [en,fr,..] and set the right json file
*    @param {string} current The name of the language
*/
Language.prototype.setLang = function(current){
    if(typeof this.langs.get(current) != `undefined`){
        this.current=current;
    }else{
        console.error(`${current} is not a valid language of the map used : ${this.langs}`);
    }
}

/**
*    Get the name of the language used [en,fr,..]
*    @return {string}
*/
Language.prototype.getLang = function(){
    return this.current;
}

/**
*    Get the path of the json file associated 
*    @return {string}
*/
Language.prototype.getJsonPath = function(current=this.getLang()){
    return this.langs.get(current);
}

/**
*    Get data from json file
*    @param {string}
*/
Language.prototype.getData = async function(current=this.getLang()){
    return await Promise.resolve((await this.data).get(current))
}

/**
*   Get Github name for my account depending on username in common.json
*   @return {string}
*/
Language.prototype.getGithubName=async function(){
    return (await Promise.resolve((await this.data).get(`.common`)))[`contact`][`social`][`Github`][`username`];
}

/**
*    Get Github URL for my account depending on username in common.json
*    @return {string}
*/
Language.prototype.getGithubURL=async function(){
    let url=await this.getGithubName();
    return `https://github.com/${url}/`;
}

/**
*    Get Github page URL for my account depending on username in common.json
*    @return {string}
*/
Language.prototype.getGithubPageURL=async function(){
    let url=await this.getGithubName();
    return `https://${url}.github.io/`;
}

/**
*   Get Github public directory for my account depending on username in common.json
*   @return {string}
*/
Language.prototype.getGithubPublicURL=async function(){
    return  await this.getGithubURL()+`Workspace/raw/master/Public/`;
}

/**
*     Declare the make function
*/
Language.prototype.make = function(){
    console.error(`make is not implemented`);
}

/**
*    Declare the update function
*/
Language.prototype.update = function(){
    console.error(`update is not implemented`);
}

/**
*    Switch to the language and then update the content
*/
Language.prototype.switch = function(){

    let lang=Array.from(this.langs.keys()).filter(e => e[0] !== `.`);

    if(lang.length>1){
        let start=lang.indexOf(this.getLang());
        let index;
        while(index==undefined){
            if(start<lang.length){
                if(lang[start][0]!=`.`){
                    if(lang[start]!=this.getLang()){
                        index=start; 
                    }
                }
                start=start+1;
            }else{
                start=0;
            }
        }
        this.setLang(lang[index]);
    }else{
        console.error(`Cannot change langue as only one langue is avalaible :${lang}`);
    }

    this.update();
}

/*
    ******************************************************************************************* 
                                        2. NightShift
    ******************************************************************************************* 
*/
/**
*    NightShift class
*/
function NightShift(){
    const currentTheme = localStorage.getItem(`theme`);
    if (currentTheme == `dark`) {
        document.body.classList.toggle(`dark-theme`);
    } else {
        document.body.classList.toggle(`light-theme`);
    } 
}

/**
*    Update NightShift icon
*/
NightShift.prototype.update = function(){
    let theme=localStorage.getItem(`theme`);
    if(theme==`dark`){
        $(`#nightShift`).html(`<i class='far fa-moon'>`);
    }else {
        $(`#nightShift`).html(`<i class='fas fa-sun'>`);
    }
}

/**
*    Toggle NighShift mode
*/
NightShift.prototype.toggle = function(){
    if (window.matchMedia(`(prefers-color-scheme: dark)`).matches) {
    document.body.classList.toggle(`light-theme`);
    var theme = document.body.classList.contains(`light-theme`)
        ? `light`
        : `dark`;
    } else {
    document.body.classList.toggle(`dark-theme`);
    var theme = document.body.classList.contains(`dark-theme`)
        ? `dark`
        : `light`;
    }
    localStorage.setItem(`theme`, theme);

    this.update();
}

/*
    ******************************************************************************************* 
                                        3. Date/Age 
    ******************************************************************************************* 
*/
/**
*	Check if a date exist and put it in a standard format
*	@param {string} date The date checked
*	@return {string} 
*/
function checkDate(date) {
  let yMin=1850; 
  let yMax=2500; 
  let separator=`/`;
  let d=(date.substring(0,2));
  let m=(date.substring(3,5));
  let y=(date.substring(6));
  let ok=1;

  if ( ((isNaN(d))||(d<1)||(d>31)) && (ok==1) ) {
     console.error(`Invalid day`); ok=0;
  }
  if ( ((isNaN(m))||(m<1)||(m>12)) && (ok==1) ) {
      console.error(`Invalid month.`); ok=0;
  }
  if ( ((isNaN(y))||(y<yMin)||(y>yMax)) && (ok==1) ) {
       console.error(`Invalid year`); ok=0;
  }
  if ( ((date.substring(2,3)!=separator)||(date.substring(5,6)!=separator)) && (ok==1) ) {
      console.error(`Invalid `+separator); ok=0;
  }
  if (ok==1) {
    let date2=new Date(y,m-1,d);
    d2=date2.getDate();
    m2=date2.getMonth()+1;
    y2=date2.getYear();
    if (y2<=100) {y2=1900+y2}
    if ( (d!=d2)||(m!=m2)||(y!=y2) ) {
      console.error(`Date ${date} doesn't exist`);
      ok=0;
    }
    ok=date2;
  }
 return ok;
}

/**
*	Get an age in function of a date inserted
*	@param {string} dt The date of birth used
*	@param {string} format Used to customize the string returned
*	@return {string}
*/
function getAge(dt,format) {
  let date=checkDate(dt)
  let m=new Date()
  let age=``;
  let age_y=0;
  let age_m=0;
  if (date!=0) {
    if (date.getTime()>m.getTime()) {
      age=`NA`;
      console.error(`Date of birth is in the future`);
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
    if (age_y==1) { age=age_y+` year`}
    if (age_y>1) { age=age_y+` years old`}
    if ((age_y>0)&&(age_m>0)) {age+=` and `}
    if (age_m>0) {age+=age_m+` month`}
    if (age==``) { age=`less than 1 month`}
  } else {
    document.formage.dt_naissance.focus();
  }
  if(format==`year`){
    return age_y;
  }else{
   return age;
  }
}

/*
    ******************************************************************************************* 
                                        4. Header
    ******************************************************************************************* 
*/
/**
 * Make header of the page according to the type of the content to display
 * @param {string} data Data from json
 * @param {boolean} isRequest Set to true to use fixed black header
 */
function makeHeader(data,isRequest=false){
    let anchorsList=``;
    const previousActive=$(`.nav li.active`).attr(`id`);

    for(i in data.header)
    {
        const aclass=data.header[i].class ? data.header[i].class : data.header[i].anchor ? `smoth-scroll` : ``;
        const onClick=data.header[i].onClick ? `onclick='${data.header[i].onClick}'` : ``;
        const href= data.header[i].anchor ? `href='#${data.header[i].anchor}'` : ``;
        const id= data.header[i].anchor ? `id='${data.header[i].anchor}-anchor'` : ``;
        const active=previousActive==`${data.header[i].anchor}-anchor` ? `active` : ``;
        const liclass=data.header[i].liclass ? `${data.header[i].liclass}` : ``;

        anchorsList+=`<li ${id} class='${liclass} ${active}'><a ${onClick} class='${aclass}' ${href}>${data.header[i].anchorText}</a></li>`;
    }
    
    let html=(`
                <div class='${isRequest ? `request-header-top-area navigation-background` : `header-top-area`}'>
                    <div class='margin-left-20'>
                        <div class='row'>
                            <div class='logo col-sm-4'>
                                <a class='smoth-scroll' href='${isRequest ? './' : '#navigation'}'><img src='img/vberthet/vb_black.png'>Vincent <b>Berthet</b></a>
                            </div>
                            <div class='col-sm-8'>
                                <div class='navigation-menu'>
                                    <div class='navbar'>
                                        <div class='navbar-header'>
                                            <button type='button' class='navbar-toggle' data-toggle='collapse' data-target='.navbar-collapse'>
                                                <span class='sr-only'>Toggle navigation</span>
                                                <span class='icon-bar'></span>
                                                <span class='icon-bar'></span>
                                                <span class='icon-bar'></span>
                                            </button>
                                        </div>
                                        <div class='navbar-collapse collapse'>
                                            <ul id='anchorList' class='nav navbar-nav navbar-right'></ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    `);

    if(document.getElementById(`navigation`) && document.getElementById(`navigation`).innerHTML.length==0) $(`#navigation`).html(html);
    $(`#anchorList`).html(anchorsList);
    this.nightShift.update();

    //Refresh effect.js/Smooth Scroll
    jQuery(document).ready(function () {
        $(`a.smoth-scroll`).on(`click`, function (e) {
            var anchor = $(this);
            $(`html, body`).stop().animate({
                scrollTop: $(anchor.attr(`href`)).offset().top - 50
            }, 1000);
            e.preventDefault();
        });
    });
}

/*
    ******************************************************************************************* 
                                        5. Footer
    ******************************************************************************************* 
*/
/**
*    Build the release with the latest update wrote in the request.json
*/
function makeRelease(){
    current_release=`X`;
    $(`#release`).html(current_release);

    let json=$.getJSON(`json/request.json`);
    json.done(function(data) {
        for(let i in data.notes){
            current_release=data.notes[i].id;
            $(`#release`).html(current_release);
            break;
        } 
    });
}

/**
*    Make the footer of the page
*    @param {string} data The data of the *current*.json
*/
function makeFooter(data,isRequest=false){ 
    let html=(`
        <div class='container text-center'>
            &copy; ${new Date().getFullYear()}<a class='smoth-scroll' href='${isRequest ? './' : '#navigation'}'> Vincent Berthet Website</a> - <a href='request.html?type=Notes' >V<span id='release'></span></a> | ${data.footer}<a class='smoth-scroll' href='${isRequest ? './' : '#navigation'}'> Vincent Berthet</a>
        </div> 
    `);

    $(`#footerContent`).html(html);
    makeRelease();
    
    //Refresh effect.js/Smooth Scroll
    jQuery(document).ready(function () {
        $(`a.smoth-scroll`).on(`click`, function (e) {
            var anchor = $(this);
            $(`html, body`).stop().animate({
                scrollTop: $(anchor.attr(`href`)).offset().top - 50
            }, 1000);
            e.preventDefault();
        });
    });
}