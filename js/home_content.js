/*
    ******************************************************************************************* 
                                        Table 
    ******************************************************************************************* 
    1.Init
    2.Build content
    3.Make section
    4.Effects
*/

/*
    ******************************************************************************************* 
                                        1.Init 
    ******************************************************************************************* 
*/
window.onload = init;    
/*
    Create a Language object and redefine the update and make method of this object
*/
function init(){
    let available_lang = new Map();
    available_lang.set('en','json/en.json');
    available_lang.set('fr','json/fr.json');
    available_lang.set('.common','json/common.json');
    this.language = new Language(available_lang,'en');
    this.language.update = function(){update();}
    this.language.make = function(){make();}
    this.typed = new Typed('.typing', {   
        typeSpeed: 70,
        backSpeed: 50,
        startDelay: 1500,
        loop: true,
        backDelay:1000,
    });
    this.language.make();
}

/*
    ******************************************************************************************* 
                                        2.Build content 
    ******************************************************************************************* 
*/

/*
    Update the content with the current language
	@Warning the page must has been make at least once
*/
function update(){
    $('#portfolio_content').mixItUp('destroy');
    this.language.make();
}

/*
	Make the different section of the page with the current language
*/
function make(){
    let common = $.getJSON(this.language.getJsonPath('.common'));
    let lang_selected = $.getJSON(this.language.getJsonPath());

    common.done(function(data_c){
        lang_selected.done(function(data){
            makeNavigation(data);
            makePreview(data);
            makeBio(data);
            makePortfolio(data,data_c);
            makeSkills(data,data_c);
            makeContact(data,data_c);
            makeFooter(data);
       });
    }); 
}

/*
    ******************************************************************************************* 
                                        3.Make section 
    ******************************************************************************************* 
*/

/*
    Build the navigation menu items
    @param string array data : the content of the *lang*.json used 
*/
function makeNavigation(data){
    $('#nav_bio_content').html(data.navigation.bio.menu);
    $('#nav_portfolio_content').html(data.navigation.portfolio.menu);
    $('#nav_skills_content').html(data.navigation.skills.menu);
    $('#nav_contact_content').html(data.navigation.contact.menu);
    $('#nav_flag_ico_content').html(data.lang);
}

/*
    Build the preview text of the header section
    @param string array data : the content of the *lang*.json used 
*/
function makePreview(data){
    $('#preview_text_content').html(data.preview.text);
    
    this.typed.strings=data.preview.typed;
    this.typed.reset();
}

/*
    Build the Bio section
    @param string array data : the content of the *lang*.json used 
*/
function makeBio(data){
    $('#bio_content').html("<h2>"+data.navigation.bio.title+"</h2>"+data.navigation.bio.content);
    $('#bio_age').html(getAge("20/02/1996","year"));
    $('#bio_duration').html(getAge("20/02/1996","year")-14);
}

/*
    Build the Portfolio section
    @param string array data : the content of the *lang*.json used 
    @param string array data_c : the content of common.json
*/
function makePortfolio(data,data_c){
    let portfolio_html="";

    for(let key in data_c.portfolio){
        let c=data_c.portfolio[key];

        if(c.hide == undefined || c.hide==false){
            //common    
            let filter=c.filter != undefined ? c.filter : "";
            let ico=c.ico != undefined ? c.ico : "";
            let skills=c.skills != undefined ? c.skills : "";
            let title=c.title != undefined ? c.title : "";
            let description=c.description != undefined ? c.description : "";
            let href=c.href != undefined ? c.href : "";
            //lang
            let lang=data.portfolio[key];
            if(lang !=undefined){
                title=lang.title != undefined ? lang.title : title;
                description=lang.description != undefined ? lang.description : description;
            }
            //request
            let page="request.html"
            let url="";

            if(c.wip != undefined && c.wip==true) url+=page+"?type=Redirect&alert=WIP&to=";
            if(c.mobile != undefined && c.mobile==true) url= url.length >0 ? page+"?type=Redirect&alert=WIP_Mobile&to=" : page+"?type=Redirect&alert=Mobile&to=";
            if(c.player != undefined && c.player==true) url+=page+"?type=Player&alert=";
            if(c.webgl != undefined && c.webgl==true) url+=page+"?type=WebGL&alert=";
            url+=href;

            portfolio_html += [
                "<div class='col-md-4 col-sm-6 col-xs-12 mix "+filter+"'>",
                    "<div class=''>",
                        "<figure class='effect-project'>",
                            "<img src='"+ico+"' alt='"+title+"'>",
                            "<figcaption>",
                            "<div>", 
                                "<div class='icon-links'>",
                                    "<a href='"+url+"' target='_blank'><i class='fas fa-external-link-alt'></i></a>",
                                "</div>",
                                "<h2>"+title+"</h2>",
                                "<p>"+skills+"</p>",
                                "<p>"+description+"</p>",
                            "</div>",
                            "</figcaption>",		
                        "</figure>",
                    "</div>",
                "</div>"
            ].join('');  
        }
    }
    $('#portfolio_title_content').html("<h2>"+data.navigation.portfolio.title+"</h2>");
    $('#portfolio_content').html(portfolio_html);
    $('#portfolio_content').mixItUp();
}

/*
    Build the skills sections
    @param string array data : the content of the *lang*.json used 
*/
function makeSkills(data,data_c){
    let skills_html="";                
     
    for(let key in data_c.skills){ 
        let c=data_c.skills[key];
        let ico = c.ico;
        let title=c.title;
        let list=c.list;

        let lang=data.skills[key];
        if(lang!=undefined){
            title=lang.title != undefined ? lang.title : title;
            list=lang.list != undefined ? lang.list : list;
        }

        skills_html += [
                    "<div class='col-md-4 col-sm-6'>",
                        "<div class='skills-detail'>",
                            "<i class='"+ico+"'></i>",
                            "<h3>"+title+"</h3>",
                            "<hr>",
                            "<p>"+list+"</p>",
                        "</div>",
                    "</div>"
             ].join(''); 
    }
    skills_html +="</div>";
    $('#skills_title_content').html("<h2>"+data.navigation.skills.title+"</h2>");
    $('#skills_list_content').html(skills_html);
}

/*
    Build the contact section
    @param string array data : the content of the *lang*.json used 
    @pram string array data common : the content of the common.json
*/
function makeContact(data,data_c){
    let contact_social_html="";
    let contact_info_html="";
    //contact info
    for(let key in data_c.contact.info){
        let c=data_c.contact.info[key];
        let class_css=c.class;
        let href=c.href;
        let title=c.title;
        let text=c.text;

        let lang=data.contact.info[key];
        if(lang!=undefined){
            href=lang.href != undefined ? lang.href : href;
            title=lang.title != undefined ? lang.title : title;
            text=lang.text != undefined ? lang.text : text;
        }

        if(c.country_code != undefined && c.country_flag != undefined){
            //add flag and phone code
           text="<img src='"+c.country_flag+"' title='"+c.country_code+"'>  "+text;
        }

        contact_info_html += [
            "<div class='col-md-4 col-sm-4'>",
                "<div class='contact-detail flag'>",  
                    "<a href='"+href+"' title='"+title+"'>",
                      "<i class='"+class_css+"'></i><p>"+text+"</p>",
                    "</a>",
                "</div>",
            "</div>"    
        ].join('');        
    }
    
    //social icons
     for(let key in data_c.contact.social){ 
        let c=data_c.contact.social[key];
        let href =c.href;
        let class_css=c.class;
        let title=c.title;
        let class_ico=c.class_ico;
        
        let lang=data.contact.social[key];
        if(lang != undefined){
            title=lang.title != undefined ? lang.title : title;
        }
        
        contact_social_html += [
            "<li>",
                "<a href='"+href+"' target='_socblank' class='"+class_css+"' title='"+title+"'><i class='"+class_ico+"'></i>",
            "</li>"
        ].join('');
    }
    
    $('#contact_title_content').html("<h2>"+data.navigation.contact.title+"</h2>");
    $('#contact_info_content').html(contact_info_html);
    $('#contact_social_content').html(contact_social_html);
}

/*
    ******************************************************************************************* 
                                        4.Effects
    ******************************************************************************************* 
*/

    /* Parallax Background - stellar.js
    *  provides parallax scrolling effects to any scrolling element.
    */

    $(window).stellar({
        responsive: true,
        horizontalScrolling: false,
        hideDistantElements: false,
        horizontalOffset: 0,
        verticalOffset: 0,
    });