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
async function init(){
    this.typed = new Typed('.typing', {   
        typeSpeed: 70,
        backSpeed: 50,
        startDelay: 1500,
        loop: true,
        backDelay:1000,
    });
    this.language.initNightShift();
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
async function make(){
    console.info('Language currently used : '+this.language.getLang());
    let data_lang=await this.language.getData();
    let data_common=await this.language.getData('.common');
    
    makeNavigation(data_lang);
    makePreview(data_lang);
    makeBio(data_lang);
    makePortfolio(data_lang,data_common);
    makeContact(data_lang,data_common);
    makeFooter(data_lang);
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
async function makePortfolio(data,data_c){
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
            let githubPage=c.githubPage != undefined ? c.githubPage : false;
            let github=c.github != undefined ? c.github : false;
            let webgl=c.webgl != undefined ? c.webgl : false;
            let githubIco= github ==true ? "<i class='fab fa-github'></i>" :"";
            if(githubPage) href=await this.language.getGithubPageURL()+href;
            else if(github && !webgl) href=await this.language.getGithubURL()+href;
            
            //lang
            let lang=data.portfolio[key];
            if(lang !=undefined){
                title=lang.title != undefined ? lang.title : title;
                description=lang.description != undefined ? lang.description : description;
            }
            //request
            let page="request.html"
            let url="";

            if(c.wip != undefined && c.wip==true) url+=page+"?type=Redirect&id=WIP&to=";
            if(c.mobile != undefined && c.mobile==true) url= url.length >0 ? page+"?type=Redirect&id=WIP_Mobile&to=" : page+"?type=Redirect&id=Mobile&to=";
            if(c.player != undefined && c.player==true) url+=page+"?type=Player&id=";
            if(webgl) url+=page+"?type=WebGL&id=";
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
                                "<h2>"+githubIco+" "+title+"</h2>",
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
                    "<a href='"+href+"' target='_blank' title='"+title+"'>",
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
        if(c.username != undefined) href+=c.username;
        let class_css=c.class;
        let title=c.title;
        let class_ico=c.class_ico;
        
        let lang=data.contact.social[key];
        if(lang != undefined){
            title=lang.title != undefined ? lang.title : title;
        }
        
        contact_social_html += [
            "<li>",
                "<a href='"+href+"' target='_blank' class='"+class_css+"' title='"+title+"'><i class='"+class_ico+"'></i>",
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