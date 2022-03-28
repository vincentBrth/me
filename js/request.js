/**
 * @author Vincent Berthet <vincent.berthet42@gmail.com>
 */

/**
 * Initialize request.html depending of the request selected
 * @param {string} id Id requested
 */
function init(id) {
    this.id = id;
    this.waitTime = 15;
    this.x;
    document.title = this.id;
    if (document.title == "null") document.title = this.id;
    this.language.make();
}

/**
 * Update color of the page according to his type if it is defined in request.css
 * @param {string} type Type of the page
 */
function checkColor(type) {
    const style = getComputedStyle(document.body);
    let color = style.getPropertyValue(`--${type.toLocaleLowerCase()}-color`);

    if (color == "") {
        color = style.getPropertyValue("--primary-color");
        console.warn(`Color not found use "--primary-color" (${color}) instead`);
    }

    return color;
}

/**
 *   Update the content with the current language
 *   @Warning the page must has been make at least once
 */
function update() {
    this.language.make();
}

/**
 * Call after initialization to make the correct content of the page
 */
async function make() {
    const data = await this.language.getData(".core");
    const dataLang = await this.language.getData();
    const content = data.portfolio[this.id];
    const contentLang = dataLang.portfolio[this.id];
    let lang = `,"lang":${JSON.stringify(dataLang.header.lang)}`;
    if (content) {
        this.type = content["request"]["id"];
        if (content["request"]["french"] == false) {
            lang = "";
        }

        if (!this.type) {
            //Request invalid
            console.error(`Request invalid : {type}${this.type.toLocaleLowerCase()}, - {id}${this.id}`);
            makeUnknown(dataLang);
        } else if (this.type.toLocaleLowerCase() == "download") {
            makeDownload(content, contentLang);
        } else if (this.type.toLocaleLowerCase() == "player") {
            makePlayer(content, contentLang);
        } else if (this.type.toLocaleLowerCase() == "webgl") {
            makeWebGL(content, contentLang);
        } else if (this.type.toLocaleLowerCase() == "redirection") {
            makeRedirection(content, dataLang);
        } else if (this.type.toLocaleLowerCase() == "page") {
            makePage(content);
        }
    } else {
        //Special case
        if (this.id.toLocaleLowerCase() == "notes") {
            this.type = "notes";
            lang = "";
            makeNotes(await this.language.getData(".notes"));
        } else if (this.id.toLocaleLowerCase() == "cv") {
            this.type = data.contact.resume.request.id;
            makeDownload(data.contact.resume, dataLang.contact.resume);
        } else {
            makeUnknown(dataLang);
        }
    }
    title = this.id.split(/(?=[A-Z])/).join(" ");
    document.title = title.toUpperCase();
    let header = JSON.parse(`
                {
                    "${this.id}":{
                        "anchor":"home",
                        "anchorText":"${title}",
                        "listItemClass":"margin-right-30 active"
                    },
                    "nightShift":${JSON.stringify(dataLang.header.nightShift)}
                    ${lang}
                }
                `);

    makeHeader(header, true);
    makeFooter((await this.language.getData())["footer"], true);
    document.documentElement.style.setProperty("--primary-color", checkColor(this.type));
}

/**
 * Make Notes page
 * @param {string array} data JSON file loaded
 */
async function makeNotes(data) {
    let updatesHtml = `
        <div class="col-sm-6">
            <h1>Updates</h1><br/>
            <ul>  
    `;
    let todoHtml = `
        <div class="col-sm-6">
            <h1>To Do</h1><br/>
            <ul>   
    `;

    const url = await this.language.getGithubURL();
    for (let key in data.notes) {
        let version = data.notes[key].version;
        if (data.notes[key].github == true) version = `<a href="${url}me/releases/tag/${version}" target="_blank">${version}</a>`;
        updatesHtml += `
        <li>
            <p>
            <b><u>Version ${version} :</b></u> ${data.notes[key].released}<br/>
            ${data.notes[key].text}
            </p>
        </li>
        `;
    }
    updatesHtml += "</ul></div>";
    for (let key in data.todo) {
        todoHtml += `
            <li>
                ${data.todo[key]}
            </li>
        `;
    }
    todoHtml += "</ul></div>";

    $("#home").html(`<div class="container">${updatesHtml}${todoHtml}</div>`);
}

/**
 * Download page
 * @param {string array} content The content of the JSON [core] used
 * @param {string array} contentLang The content of the JSON [en,fr] used
 */
async function makeDownload(content, contentLang) {
    if (contentLang == undefined) {
        contentLang = content;
    }
    const contentLangRequest = contentLang.request ? contentLang.request : content;
    const title = contentLang.title ? contentLang.title : content.title;
    const name = contentLangRequest.name ? contentLangRequest.name : content.request.name;
    const description = contentLangRequest.description ? contentLangRequest.description : content.request.description;
    const justify = description.length > 100 ? 'style="text-align:justify;"' : "";
    const href = contentLangRequest.href ? contentLangRequest.href : content.request.href;
    const extension = href.split(".").pop();
    const public = await this.language.getGithubPublicURL();
    document.title = title;
    requestType = this.language.getLang() == "fr" ? "Téléchargement" : this.type;
    const html = `
        <div class="container">
            <div class="request-center" style="margin-top:20%">
                <div class="request-logo">
                    ${requestType}
                </div>
                <div class="request-title">
                    <h4>${name}</h4>
                </div>
                <div ${justify}>
                    <p><h5><i>${description}</i></h5><p>
                </div>
                <div>
                    <a class="button button-style button-style-dark" href="${public}${href}" title="${name}" onclick=""><i class="far fa-arrow-alt-circle-down"></i> ${extension}</a>
                </div>
            </div>
        </div>
    `;
    $("#home").html(html);
}

/**
 * Make an embedded player and description
 * @param {string array} content The content of the JSON [core used
 * @param {string array} contentLang The content of the JSON [en,fr] used
 */
async function makePlayer(content, contentLang) {
    const contentLangRequest = contentLang.request ? contentLang.request : content;
    const title = contentLang.title ? contentLang.title : content.title;
    const description = contentLangRequest.description ? contentLangRequest.description : content.request.description;
    const href = contentLangRequest.href ? contentLangRequest.href : content.request.href;
    const githubURL = await this.language.getGithubURL();
    const source = content.github
        ? `<p><a href="${githubURL}${href.split("/")[0]}" target="_blank"><i class="fab fa-github"></i> Github source</a></p>`
        : "";

    document.title = title;
    const html = `
        <div class="container">
            <h1>${title}</h1>
            <p>${description}</p>
            ${source}
            <div class="col-md-12 request-center iframe-container">
                <iframe width="854" height="480" src="${href}" frameborder="0" allow="autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        </div>
    `;
    $("#home").html(html);
}

/**
 * Make an embedded  web gl player with Unity default template
 * @param {string array} content The content of the JSON [core] used
 * @param {string array} contentLang The content of the JSON [en,fr] used
 */
async function makeWebGL(content, contentLang) {
    const contentLangRequest = contentLang.request ? contentLang.request : content;
    const title = contentLang.title ? contentLang.title : content.title;
    const description = contentLangRequest.description ? contentLangRequest.description : content.request.description;
    const href = contentLangRequest.href ? contentLangRequest.href : content.request.href;
    const page = await this.language.getGithubPageURL();
    const githubURL = await this.language.getGithubURL();

    document.title = title;
    const html = `
        <div class="container">
            <h1>${title}</h1>
            <p>${description}</p>
            <p><a href="${githubURL}${href.split("/")[0]}" target="_blank"><i class="fab fa-github"></i> Github source</a></p>
        </div>
        <div class="request-center iframe-container"><iframe src="${
            page + href
        }" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>
    `;
    $("#home").html(html);
}

/**
 * Make a redirection request
 * @param {string array} content The content of the JSON [en,fr] used
 * @param {string array} data The content of the JSON [en,fr]
 */
async function makeRedirection(content, data) {
    const templates = data.templates;
    const wip = content.request.wip ? content.request.wip : false;
    const mobile = content.request.mobile ? content.request.mobile : false;
    const counter = templates.counter.text;

    let title;
    let text;
    let button;
    let href = content.href;

    //create url
    if (content.githubPage) {
        //isGithubPage
        href = (await this.language.getGithubPageURL()) + content.href;
    } else if (content.github) {
        //link to github
        href = (await this.language.getGithubURL()) + href;
    }

    if (wip) {
        title = templates.redirection.wip.title;
        text = templates.redirection.wip.text;
        button = templates.redirection.wip.button;
    } else if (mobile) {
        title = templates.redirection.mobile.title;
        text = templates.redirection.mobile.text;
        button = templates.redirection.mobile.button;
    }

    let html = `
        <div class="container">
            <div class="request-center" style="margin-top:20%">
                <div class="request-logo">${this.type}</div>
                <div class="request-title">
                    <h1>${title}</h1>
                </div>
                <p><h4><i>${text}</i></h4><p>
                <div class="counter">
                    <p>${counter} <span id="counter">x</span> s</p>
                </div>
                    <div>
                        <a class="button button-style button-style-dark" href="${href}">${button}</a>
                    </div>
            </div>
        </div>
    `;
    $("#home").html(html);
    makeCounter(href);
}

/**
 * Make a blank page
 * @param {string array} data The content of the JSON [en,fr]
 */
async function makePage(data) {
    this.type = data.type;
    document.title = this.type;

    let mainHtml = "";
    mainHtml += `
        <div class="container">
            <h1>${data.title}</h1>
            <div>${data.text}</div>  
        </div>
        <div id="page">${data.page ? data.page : ""}</div> 
    `;

    $("#home").html(mainHtml);
}

/**
 * Make a unknown request
 * @param {string array} data The content of the JSON [en,fr]
 */
function makeUnknown(data) {
    const templates = data.templates.unknown;
    const title = templates.title;
    const text = templates.text;
    const button = templates.button;
    requestType = this.language.getLang() == "fr" ? "Inconnu" : "Unknown";
    const html = `
        <div class="container">
            <div class="request-center" style="margin-top:20%">
                <div class="request-logo">${requestType}</div>
                <div class="request-title">
                    <h1>${title}</h1>
                </div>
                <p><h4><i>${text}</i></h4></p>

                <div class="counter">
                    <p>You will be automatically redirected in <span id="counter">x</span> s</p>
                </div>
                <div>
                    <a class="button button-style button-style-dark" href="./">${button}</a>
                </div>
            </div>
        </div>
    `;
    $("#home").html(html);
    this.type = "Unknown";
    makeCounter();
}

/**
 *  Replace the hidden label 'counter' by the waiting time remaining before automatic action
 *  @param {string} to Url to redirect
 */
function makeCounter(to = "./") {
    window.document.getElementById("counter").innerHTML = this.waitTime;
    this.x = window.setInterval(`count('${to}')`, 1001);
}

/**
 *  Count until redirection
 *  @param {string} to Url to redirect
 */
function count(to = "./") {
    this.waitTime > 0 ? (window.document.getElementById("counter").innerHTML = --this.waitTime) : window.clearInterval(x);
    if (this.waitTime == 0) {
        window.location = to;
    }
}
