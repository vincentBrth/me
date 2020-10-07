/**
 * @author Vincent Berthet <vincent.berthet42@gmail.com>
 */
/*
    ******************************************************************************************* 
                                        Table 
    ******************************************************************************************* 
    1. Init
    2. Build content
    3. Make section
    4. Effects
*/

/*
    ******************************************************************************************* 
                                        1.Init 
    ******************************************************************************************* 
*/
window.onload = init;  

/**
*    Create a Language object and redefine the update and make method of this object
*/
async function init(){
    this.typed = new Typed(`.typing`, {   
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
/**
*   Update the content with the current language
*   @Warning the page must has been make at least once
*/
function update(){
    $(`#portfolio_content`).mixItUp(`destroy`);
    this.language.make();
}

/**
*	Make the different section of the page with the current language
*/
async function make(){
    let data_lang=await this.language.getData();
    let data_common=await this.language.getData(`.common`);
    
    makeHeader(data_lang);
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
/**
*    Build the preview text of the header section
*    @param {string array} data The content of the *lang*.json used 
*/
function makePreview(data){
    $(`#preview_text_content`).html(data.preview.text);
    
    this.typed.strings=data.preview.typed;
    this.typed.reset();
}

/**
*    Build the Bio section
*    @param {string array} data The content of the *lang*.json used 
*/
function makeBio(data){
    $(`#bio_right`).html(`<h2>`+data.header.bio.sectionTitle+`</h2>`+data.bio.right.text);
    $(`#bio_age`).html(getAge(`20/02/1996`,`year`));
    $(`#bio_duration`).html(getAge(`20/02/1996`,`year`)-14);
}

/**
*    Build the Portfolio section
*    @param {string array} data The content of the *lang*.json used 
*    @param {string array} data_c The content of common.json
*/
async function makePortfolio(data,data_c){
    let portfolio_html=``;
    const page=`request.html`;
    const make=document.getElementById(`portfolio_content`) && document.getElementById(`portfolio_content`).innerHTML.length==0;
    
    if(make){
        //**MAKE CONTENT
        for(let key in data_c.portfolio){
                //common content
                const c=data_c.portfolio[key];
                const filter=c.filter != undefined ? c.filter : ``;
                const ico=c.ico != undefined ? c.ico : `/img/ico_project/ico_wip.png`;
                const skills=c.skills;
                let href=c.href;

                //create url
                if(href){
                    if(c.githubPage){
                        //isGithubPage
                        href=await this.language.getGithubPageURL()+href;
                    }else if(c.github && !c.webgl){
                        //isWeblgl hosted on githubpage
                        href=await this.language.getGithubURL()+href;
                    } 
                }else{
                    href+=`/${page}?type=error&id=404`;
                }

                let url=``;  
                if(c.wip) url+=page+"?type=Redirect&id=WIP&to=";
                if(c.mobile) url= url.length >0 ? page+"?type=Redirect&id=WIP_Mobile&to=" : page+"?type=Redirect&id=Mobile&to=";
                if(c.player) url+=page+"?type=Player&id=";
                if(c.webgl) url+=page+"?type=WebGL&id=";
                url+=href;
              
                if(c.hide== undefined || c.hide==false){
                    portfolio_html +=
                        (`
                            <div id='${key}-project' class='col-md-4 col-sm-6 col-xs-12 mix ${filter}'>
                                <div class=''>
                                    <figure class='effect-project'>
                                        <img src='${ico}'>
                                        <figcaption>
                                        <div>
                                            <div class='icon-links'>
                                                <a href='${url}' target='_blank'><i class='fas fa-external-link-alt'></i></a>
                                            </div>
                                            <h2 id='${key}-title'>WIP</h2>
                                            <span>
                                                ${skills ? `<p>${skills}</p>` : ``}
                                                <p id='${key}-description'>WIP</p>
                                            </span>
                                        </div>
                                        </figcaption>		
                                    </figure>
                                </div>
                            </div>
                        `);
                }
        }
    }

    $(`#portfolio_title_content`).html(`<h2>${data.header.portfolio.sectionTitle}</h2>`);
    if(make) $(`#portfolio_content`).html(portfolio_html);
    $(`#portfolio_content`).mixItUp();

    //**UPDATE CONTENT of figure
    for(let key1 in data.portfolio){
        for(let key2 in data_c.portfolio){
            const githubIco= data_c.portfolio[key2].github ==true ? `<i class='fab fa-github'></i>` :``;
            if(key1==key2){   
                $(`#${key1}-title`).html(`${githubIco} ${data.portfolio[key1].title}`);
                $(`#${key1}-description`).html(`${data.portfolio[key1].description}`);
            }else{
                //check if only present in common.json
                let found=false;
                for(let k in data.portfolio){
                    if(k==key2) found=true;
                }

                if(!found){
                    $(`#${key2}-title`).html(`${githubIco} ${data_c.portfolio[key2].title}`);
                    $(`#${key2}-description`).html(`${data_c.portfolio[key2].description}`);
                }
            }
        }        
    }
}

/**
*    Build the contact section
*    @param {string array} data The content of the *lang*.json used 
*    @param {string array} data The content of the common.json
*/
function makeContact(data,data_c){
    let contact_social_html=``;
    let contact_info_html=``;
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
           text=`<img src='${c.country_flag}' title='${c.country_code}'>  ${text}`;
        }

        let style=``;
        if(key==`resume`){
            style=`style='color: var(--primary-color);'`;
        }

        contact_info_html += (`
            <div class='col-md-4 col-sm-4'>
                <div class='contact-detail flag'>  
                    <a href='${href}' target='_blank' title='${title}'>
                    <i ${style} class='${class_css}'></i><p>${text}</p>
                    </a>
                </div>
            </div> 
        `);       
    }
    
    //social icons
    contact_social_html='';
     for(let key in data_c.contact.social){ 
        const c=data_c.contact.social[key];
        const social_title=data.contact.social[key].title ? data.contact.social[key].title : c.title;

        contact_social_html += (`
            <li>
                <a href='${c.href}${c.username}' target='_blank' class='${c.class}' title='${social_title}'><i class='${c.class_ico}'></i></a>
            </li>
        `);
    }
    $(`#contact_title_content`).html(`<h2>`+data.header.contact.sectionTitle+`</h2>`);
    $(`#contact_info_content`).html(contact_info_html);
    $(`#contact_social_content`).html(contact_social_html);
}

/*
    ******************************************************************************************* 
                                        4.Effects
    ******************************************************************************************* 
*/
/**
*   Parallax Background - stellar.js
*   provides parallax scrolling effects to any scrolling element.
*/
$(window).stellar({
    responsive: true,
    horizontalScrolling: false,
    hideDistantElements: false,
    horizontalOffset: 0,
    verticalOffset: 0,
});