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
async function init() {
    this.typed = new Typed(".typing", {
        typeSpeed: 70,
        backSpeed: 50,
        startDelay: 1500,
        loop: true,
        backDelay: 1000,
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
function update() {
    $("#portfolioContent").mixItUp("destroy");
    this.language.make();
}

/**
 *	Make the different section of the page with the current language
 */
async function make() {
    let data = await this.language.getData(".core");
    let dataLang = await this.language.getData();
    makeHeader(dataLang["header"]);
    makePreview(dataLang["preview"], (hireMe = data.job));
    makeBio(dataLang["header"], dataLang["bio"]);
    makePortfolio(dataLang["header"], dataLang["portfolio"], data["portfolio"]);
    makeContact(dataLang["header"], dataLang["contact"], data["contact"], dataLang["social"], data["social"]);
    makeFooter(dataLang["footer"]);
}

/*
    ******************************************************************************************* 
                                        3.Make section 
    ******************************************************************************************* 
*/
/**
 *    Build the preview text of the header section
 *    @param {string array} contentPreview The content of the JSON [en,fr] used
 *    @param {boolean} hireMe Set to true to display additional line
 */
function makePreview(contentPreview, hireMe = false) {
    let d = contentPreview.text;
    if (hireMe && contentPreview.job) d += contentPreview.job;
    $("#previewTextContent").html(d);

    this.typed.strings = contentPreview.typed;
    this.typed.reset();
}

/**
 *    Build the Bio section
 *    @param {string array} contentHeader The content of the JSON [en,fr] used
 *    @param {string array} contentBio The content of the JSON [en,fr] used
 */
function makeBio(contentHeader, contentBio) {
    $("#bioTitleContent").html(`<h2>${contentHeader.bio.sectionTitle}</h2>`);
    $("#bioRight").html(contentBio.text.text);
    $("#bioAge").html(getAge("20/02/1996", "year"));
    $("#bioDuration").html(getAge("20/02/1996", "year") - 14);
}

/**
 *    Build the Portfolio section
 *    @param {string array} contentHeader The content of the JSON [en,fr] used
 *    @param {string array} contentPortfolio The content of the JSON [en,fr] used
 *    @param {string array} contentCommonPortfolio The content of the JSON [core] used
 */
async function makePortfolio(contentHeader, contentPortfolio, contentCommonPortfolio) {
    let html = "";
    const page = "request.html";
    const make = document.getElementById("portfolioContent") && document.getElementById("portfolioContent").innerHTML.length == 0;

    if (make) {
        //**MAKE CONTENT
        for (let key in contentCommonPortfolio) {
            //core content
            const c = contentCommonPortfolio[key];
            const filter = c.filter != undefined ? c.filter : "";
            const ico = c.ico != undefined ? c.ico : "img/ico_project/ico_wip.png";
            const skills = c.skills;
            let href = c.href;

            if (contentCommonPortfolio[key].request) {
                //Is a call to request.html
                href = `${page}?id=${key}`;
            } else if (href) {
                //create url
                if (c.githubPage) {
                    //isGithubPage
                    href = (await this.language.getGithubPageURL()) + href;
                } else if (c.github) {
                    //link to github
                    href = (await this.language.getGithubURL()) + href;
                }
            } else {
                href += `/${page}?id=404`;
            }

            if (c.hide == undefined || c.hide == false) {
                html += `
                            <div id="${key}-project" class="col-md-4 col-sm-6 col-xs-12 mix ${filter}">
                                <div class="row grid">
                                    <figure class="effect-project">
                                        <img src="${ico}">
                                        <figcaption>
                                        <div>
                                            <div class="icon-links">
                                                <a href="${href}" target="_blank"><i class="fas fa-external-link-alt"></i></a>
                                            </div>
                                            <h3 id="${key}-title">WIP</h3>
                                            <span>
                                                ${skills ? "<p>${skills}</p>" : ""}
                                                <p id="${key}-abstract">WIP</p>
                                            </span>
                                        </div>
                                        </figcaption>		
                                    </figure>
                                </div>
                            </div>
                        `;
            }
        }
    }

    $("#portfolioTitleContent").html(`<h2>${contentHeader.portfolio.sectionTitle}</h2>`);
    if (make) $("#portfolioContent").html(html);
    $("#portfolioContent").mixItUp();

    //**UPDATE CONTENT of figure
    for (let key1 in contentPortfolio) {
        for (let key2 in contentCommonPortfolio) {
            const githubIco = contentCommonPortfolio[key2].github == true ? '<i class="fab fa-github"></i>' : "";
            if (key1 == key2) {
                $(`#${key1}-title`).html(`${githubIco} ${contentPortfolio[key1].title}`);
                $(`#${key1}-abstract`).html(`${contentPortfolio[key1].abstract}`);
            } else {
                //check if only present in core.json
                let found = false;
                for (let k in contentPortfolio) {
                    if (k == key2) found = true;
                }

                if (!found) {
                    $(`#${key2}-title`).html(`${githubIco} ${contentCommonPortfolio[key2].title}`);
                    $(`#${key2}-abstract`).html(`${contentCommonPortfolio[key2].abstract}`);
                }
            }
        }
    }
}

/**
 *    Build the contact section
 *    @param {string array} contentHeader The content of the JSON [en,fr] used
 *    @param {string array} contentContact The content of the JSON [en,fr] used
 *    @param {string array} contentCommonContact The content of the JSON [core] used
 *    @param {string array} contentSocial The content of the JSON [en,fr] used
 *    @param {string array} contentCommonSocial The content of the JSON [core] used
 */
function makeContact(contentHeader, contentContact, contentCommonContact, contentSocial, contentCommonSocial) {
    // contact info
    let html = "";
    for (let key in contentCommonContact) {
        let c = contentCommonContact[key];
        const classCss = c.class;
        let href = c.href;
        let title = c.title;
        let text = c.text;

        let lang = contentContact[key];
        if (lang != undefined) {
            href = lang.href != undefined ? lang.href : href;
            title = lang.title != undefined ? lang.title : title;
            text = lang.text != undefined ? lang.text : text;
        }

        let style = "";
        if (key == "resume") {
            style = 'style="color: var(--primary-color);"';
            href = "request.html?id=CV";
        }

        html += `
            <div class="col-md-4 col-sm-4">
                <div class="contact-detail flag">  
                    <a href="${href}" target="_blank" title="${title}">
                    <i ${style} class="${classCss}"></i><p>${text}</p>
                    </a>
                </div>
            </div> 
        `;
    }

    $("#contactTitleContent").html(`<h2>${contentHeader.contact.sectionTitle}</h2>`);
    $("#contactInfoContent").html(html);

    // social networks
    html = "";
    for (let key in contentCommonSocial) {
        const c = contentCommonSocial[key];
        const socialTitle = contentSocial[key].title ? contentSocial[key].title : c.title;

        html += `
            <li>
                <a href="${c.href}${c.username}" target="_blank" class="${c.class}" title="${socialTitle}"><i class="${c.classIco}"></i></a>
            </li>
        `;
    }

    $("#contactSocialContent").html(html);
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
