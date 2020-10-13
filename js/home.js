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
    let data=await this.language.getData(`.core`);
    let data_lang=await this.language.getData();
    
    makeHeader(data_lang[`header`]);
    makePreview(data_lang[`preview`],true);
    makeBio(data_lang[`header`],data_lang[`bio`]);
    makePortfolio(data_lang[`header`],data_lang[`portfolio`],data[`portfolio`]);
    makeContact(data_lang[`header`],data_lang[`contact`],data[`contact`],data_lang[`social`],data[`social`]);
    makeFooter(data_lang[`footer`]);
}

/*
    ******************************************************************************************* 
                                        3.Make section 
    ******************************************************************************************* 
*/
/**
*    Build the preview text of the header section
*    @param {string array} content_preview The content of the JSON [en,fr] used
*    @param {boolean} seekingjob Set to true to display additionnal line
*/  
function makePreview(content_preview,seekingjob=false){
    let d=content_preview.text;
    if(seekingjob && content_preview.job) d+=content_preview.job;
    $(`#preview_text_content`).html(d);
    
    this.typed.strings=content_preview.typed;
    this.typed.reset();
}

/**
*    Build the Bio section
*    @param {string array} content_header The content of the JSON [en,fr] used
*    @param {string array} content_bio The content of the JSON [en,fr] used
*/
function makeBio(content_header,content_bio){
    $(`#bio_right`).html(`<h2>`+content_header.bio.sectionTitle+`</h2>`+content_bio.right.text);
    $(`#bio_age`).html(getAge(`20/02/1996`,`year`));
    $(`#bio_duration`).html(getAge(`20/02/1996`,`year`)-14);
}

/**
*    Build the Portfolio section
*    @param {string array} content_header The content of the JSON [en,fr] used
*    @param {string array} content_portfolio The content of the JSON [en,fr] used
*    @param {string array} content_c_portfolio The content of the JSON [core] used
*/
async function makePortfolio(content_header,content_portfolio,content_c_portfolio){
    let html=``;
    const page=`request.html`;
    const make=document.getElementById(`portfolio_content`) && document.getElementById(`portfolio_content`).innerHTML.length==0;
    
    if(make){
        //**MAKE CONTENT
        for(let key in content_c_portfolio){
                //core content
                const c=content_c_portfolio[key];
                const filter=c.filter != undefined ? c.filter : ``;
                const ico=c.ico != undefined ? c.ico : `img/ico_project/ico_wip.png`;
                const skills=c.skills;
                let href=c.href;
                
                if(content_c_portfolio[key].request){
                    //Is a call to request.html
                    href=`${page}?id=${key}`;
                }else if(href){
                    //create url
                    if(c.githubPage){
                        //isGithubPage
                        href=await this.language.getGithubPageURL()+href;
                    }else if(c.github){
                        //link to github
                        href=await this.language.getGithubURL()+href;
                    } 
                }else{
                    href+=`/${page}?id=404`;
                }
            
                if(c.hide== undefined || c.hide==false){
                    html +=
                        (`
                            <div id='${key}-project' class='col-md-4 col-sm-6 col-xs-12 mix ${filter}'>
                                <div class=''>
                                    <figure class='effect-project'>
                                        <img src='${ico}'>
                                        <figcaption>
                                        <div>
                                            <div class='icon-links'>
                                                <a href='${href}' target='_blank'><i class='fas fa-external-link-alt'></i></a>
                                            </div>
                                            <h2 id='${key}-title'>WIP</h2>
                                            <span>
                                                ${skills ? `<p>${skills}</p>` : ``}
                                                <p id='${key}-abstract'>WIP</p>
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

    $(`#portfolio_title_content`).html(`<h2>${content_header.portfolio.sectionTitle}</h2>`);
    if(make) $(`#portfolio_content`).html(html);
    $(`#portfolio_content`).mixItUp();

    //**UPDATE CONTENT of figure
    for(let key1 in content_portfolio){
        for(let key2 in content_c_portfolio){
            const githubIco= content_c_portfolio[key2].github ==true ? `<i class='fab fa-github'></i>` :``;
            if(key1==key2){   
                $(`#${key1}-title`).html(`${githubIco} ${content_portfolio[key1].title}`);
                $(`#${key1}-abstract`).html(`${content_portfolio[key1].abstract}`);
            }else{
                //check if only present in core.json
                let found=false;
                for(let k in content_portfolio){
                    if(k==key2) found=true;
                }

                if(!found){
                    $(`#${key2}-title`).html(`${githubIco} ${content_c_portfolio[key2].title}`);
                    $(`#${key2}-abstract`).html(`${content_c_portfolio[key2].abstract}`);
                }
            }
        }        
    }
}

/**
*    Build the contact section
*    @param {string array} content_header The content of the JSON [en,fr] used 
*    @param {string array} content_contact The content of the JSON [en,fr] used
*    @param {string array} content_c_contact The content of the JSON [core] used
*    @param {string array} content_social The content of the JSON [en,fr] used
*    @param {string array} content_c_social The content of the JSON [core] used
*/
function makeContact(content_header,content_contact,content_c_contact,content_social,content_c_social){
    //*******contact info
    let html=``;
    for(let key in content_c_contact){
        let c=content_c_contact[key];
        const class_css=c.class;
        let href=c.href;
        let title=c.title;
        let text=c.text;
        
        let lang=content_contact[key];
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
            href='request.html?id=CV';
        }

        html += (`
            <div class='col-md-4 col-sm-4'>
                <div class='contact-detail flag'>  
                    <a href='${href}' target='_blank' title='${title}'>
                    <i ${style} class='${class_css}'></i><p>${text}</p>
                    </a>
                </div>
            </div> 
        `);       
    }
    
    $(`#contact_title_content`).html(`<h2>${content_header.contact.sectionTitle}</h2>`);
    $(`#contact_info_content`).html(html);

    //*******social info
    html=``;
    for(let key in content_c_social){ 
        const c=content_c_social[key];
        const social_title=content_social[key].title ? content_social[key].title : c.title;

        html += (`
            <li>
                <a href='${c.href}${c.username}' target='_blank' class='${c.class}' title='${social_title}'><i class='${c.class_ico}'></i></a>
            </li>
        `);
    }

    $(`#contact_social_content`).html(html);
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