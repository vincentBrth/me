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
var onWeb="";     
/*
    Create a Language object and redefine the update and make method of this object
*/
function init(){
    var available_lang = new Map();
    available_lang.set('en',onWeb+'json/en.json');
    available_lang.set('fr',onWeb+'json/fr.json');
    available_lang.set('.common',onWeb+'json/common.json');
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
    var common = $.getJSON(this.language.getJsonPath('.common'));
    var lang_selected = $.getJSON(this.language.getJsonPath());

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
    var content=data.portfolio;
    var c_content=data_c.portfolio;
    var portfolio_html="";
    for(var i in c_content){ 
       if(typeof c_content[i].hide == 'undefined' || c_content[i].hide==false){
            var request=c_content[i].href;
            if(typeof content[i].href != 'undefined') request=content[i].href;

           if(typeof c_content[i].mobile != 'undefined' && c_content[i].mobile==true){
               if(typeof c_content[i].wip != 'undefined' && c_content[i].wip==true){
                   //WIP+mobile project case
                   request="request.php?type=Redirect&alert=WIP_Mobile&to="+request;
               }else{
                   //Mobile project case 
                   request="request.php?type=Redirect&alert=Mobile&to="+request;
               }     
           }else if(typeof c_content[i].player != 'undefined' && c_content[i].player==true){
                    //Player case 
                    request="request.php?type=Player&alert="+request;
           }else if(typeof c_content[i].webgl != 'undefined' && c_content[i].webgl==true){
                    //WebGL case 
                    request="request.php?type=WebGL&alert="+request;
           }else if(typeof c_content[i].wip != 'undefined' && c_content[i].wip==true){
                    //WIP project case
                    request="request.php?type=Redirect&alert=WIP&to="+request;
            } 
           
            var filter=c_content[i].filter;
            var ico=c_content[i].ico;
            var title=c_content[i].title;
            var description=c_content[i].description;
            var skills=c_content[i].skills;
            if(typeof content[i].ico != 'undefined') ico=content[i].ico;
            if(typeof content[i].title != 'undefined') title=content[i].title;
            if(typeof content[i].description != 'undefined') description=content[i].description;

            portfolio_html += [
                                "<div class='col-md-4 col-sm-6 col-xs-12 mix "+filter+"'>",
                                    "<div class='item'>",
                                        "<figure class='effect-project'>",
                                            "<img src='"+ico+"' alt='"+title+"'>",
                                            "<figcaption>",
                                            "<div>", 
                                                "<div class='icon-links'>",
                                                    "<a href='"+request+"'  target='_blank'><i class='fas fa-external-link-alt'></i></a>",
                                                "</div>",
                                                "<h2>"+title+"</h2>",
                                                "<p>"+filter+" - "+skills+"</p>",
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
    var content=data.skills;
    var c_content=data_c.skills;
    var skills_html="";                
     
    for(var i in c_content){ 
        var ico = c_content[i].ico;
        var title=c_content[i].title;
        var list=c_content[i].list;

        if(typeof content[i].title != 'undefined') title=content[i].title;
        if(typeof content[i].list != 'undefined') list=content[i].list;

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
    var social_content=data.contact.social;
    var c_social_content=data_c.contact.social;
    var info_content=data.contact.info;
    var c_info_content=data_c.contact.info;

    var contact_social_html="";
    var contact_info_html="";
    //contact info
    for(var i in c_info_content){
        var class_css=c_info_content[i].class;
        var href=c_info_content[i].href;
        var title=c_info_content[i].title;
        var text=c_info_content[i].text;

        if(typeof info_content[i].href != 'undefined') href=info_content[i].href;
        if(typeof info_content[i].title != 'undefined') title=info_content[i].title;
        if(typeof info_content[i].text != 'undefined') text=info_content[i].text;
     
        if(typeof c_info_content[i].country_code != 'undefined' && typeof c_info_content[i].country_flag != 'undefined'){
            //add flag and phone code
           text="<img src='"+c_info_content[i].country_flag+"' title='"+c_info_content[i].country_code+"'>  "+text;
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
     for(var i in c_social_content){ 
        var href =c_social_content[i].href;
        var class_css=c_social_content[i].class;
        var title=c_social_content[i].title;
        var class_ico=c_social_content[i].class_ico;
        if(typeof social_content[i].title != 'undefined') title=social_content[i].title;

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