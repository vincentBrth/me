/**
 * @author Vincent Berthet <vincent.berthet42@gmail.com>
 */
console.info("Hi there ! You are welcome to examine the code");

// Initialization
let availableLang = new Map();
availableLang.set("en", "json/en.json");
availableLang.set("fr", "json/fr.json");
availableLang.set(".core", "json/core.json");
availableLang.set(".notes", "json/notes.json");
this.language = new Language(availableLang);
this.language.update = function () {
    update();
};
this.language.make = function () {
    make();
};
this.nightShift = new NightShift();

/*
    ******************************************************************************************* 
                                        Table 
    ******************************************************************************************* 
    1. Language
    2. Night shift
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
 *    @param {string} current The name of the language [en,fr,..]
 */
function Language(langs) {
    this.langs = langs;
    if (this.langs.has(localStorage.getItem("lang"))) {
        this.current = localStorage.getItem("lang");
        console.info(`localStorage lang (${localStorage.getItem("lang")}) found and loaded as default language`);
    } else {
        //not found use navigator parameters
        if (langs.has(navigator.language)) {
            console.info(`navigator.language (${navigator.language}) found and loaded as default language`);
            this.current = navigator.language;
        } else {
            this.current = langs.keys().next().value;
            console.info(`navigator.language (${navigator.language}) not found in available languages, "${this.current}" set as default language`);
        }
    }
    localStorage.setItem("lang", this.current);

    let promises = [];
    for (let [key, path] of this.langs) {
        promises.push(
            new Promise((resolve) => {
                resolve($.getJSON(path));
            })
        );
    }

    this.data = Promise.all(promises).then((values) => {
        let tmp = new Map();
        let index = 0;
        for (let [key, path] of this.langs) {
            tmp.set(key, values[index]);
            index++;
        }
        return tmp;
    });
}

/**
 *    Check if the language is valid [en,fr,..] and set the right json file
 *    @param {string} current The name of the language
 */
Language.prototype.setLang = function (current) {
    if (typeof this.langs.get(current) != "undefined") {
        this.current = current;
        localStorage.setItem("lang", this.current);
    } else {
        console.error(`${current} is not a valid language of the map used : ${this.langs}`);
    }
};

/**
 *    Get the name of the language used [en,fr,..]
 *    @return {string}
 */
Language.prototype.getLang = function () {
    return this.current;
};

/**
 *    Get the path of the json file associated
 *    @return {string}
 */
Language.prototype.getJsonPath = function (current = this.getLang()) {
    return this.langs.get(current);
};

/**
 *    Get data from json file
 *    @param {string}
 */
Language.prototype.getData = async function (current = this.getLang()) {
    return await Promise.resolve((await this.data).get(current));
};

/**
 *   Get Github name for my account depending on username in core.json
 *   @return {string}
 */
Language.prototype.getGithubName = async function () {
    return (await Promise.resolve((await this.data).get(".core")))["social"]["github"]["username"];
};

/**
 *    Get Github URL for my account depending on username in core.json
 *    @return {string}
 */
Language.prototype.getGithubURL = async function () {
    let url = await this.getGithubName();
    return `https://github.com/${url}/`;
};

/**
 *    Get Github page URL for my account depending on username in core.json
 *    @return {string}
 */
Language.prototype.getGithubPageURL = async function () {
    let url = await this.getGithubName();
    return `https://${url}.github.io/`;
};

/**
 *   Get Github public directory for my account depending on username in core.json
 *   @return {string}
 */
Language.prototype.getGithubPublicURL = async function () {
    return (await this.getGithubURL()) + "Workspace/raw/master/Public/";
};

/**
 *     Declare the make function
 */
Language.prototype.make = function () {
    console.error("make is not implemented");
};

/**
 *    Declare the update function
 */
Language.prototype.update = function () {
    console.error("update is not implemented");
};

/**
 *    Switch to the language and then update the content
 */
Language.prototype.switch = function () {
    let lang = Array.from(this.langs.keys()).filter((e) => e[0] !== ".");

    if (lang.length > 1) {
        let start = lang.indexOf(this.getLang());
        let index;
        while (index == undefined) {
            if (start < lang.length) {
                if (lang[start][0] != ".") {
                    if (lang[start] != this.getLang()) {
                        index = start;
                    }
                }
                start = start + 1;
            } else {
                start = 0;
            }
        }
        this.setLang(lang[index]);
    } else {
        console.error(`Cannot change langue as only one langue is available :${lang}`);
    }

    this.update();
};

/*
    ******************************************************************************************* 
                                        2. NightShift
    ******************************************************************************************* 
*/
/**
 *    NightShift class
 */
function NightShift() {
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme == "dark") {
        document.body.classList.toggle("dark-theme");
    } else {
        document.body.classList.toggle("light-theme");
    }
}

/**
 *    Update NightShift icon
 */
NightShift.prototype.update = function () {
    let theme = localStorage.getItem("theme");
    if (theme == "dark") {
        $("#nightShift").html('<i class="far fa-moon">');
    } else {
        $("#nightShift").html('<i class="fas fa-sun">');
    }
};

/**
 *    Toggle NighShift mode
 */
NightShift.prototype.toggle = function () {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.body.classList.toggle("light-theme");
        var theme = document.body.classList.contains("light-theme") ? "light" : "dark";
    } else {
        document.body.classList.toggle("dark-theme");
        var theme = document.body.classList.contains("dark-theme") ? "dark" : "light";
    }
    localStorage.setItem("theme", theme);

    this.update();
};

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
    let yMin = 1850;
    let yMax = 2500;
    let separator = "/";
    let d = date.substring(0, 2);
    let m = date.substring(3, 5);
    let y = date.substring(6);
    let ok = 1;

    if ((isNaN(d) || d < 1 || d > 31) && ok == 1) {
        console.error("Invalid day");
        ok = 0;
    }
    if ((isNaN(m) || m < 1 || m > 12) && ok == 1) {
        console.error("Invalid month.");
        ok = 0;
    }
    if ((isNaN(y) || y < yMin || y > yMax) && ok == 1) {
        console.error("Invalid year");
        ok = 0;
    }
    if ((date.substring(2, 3) != separator || date.substring(5, 6) != separator) && ok == 1) {
        console.error("Invalid " + separator);
        ok = 0;
    }
    if (ok == 1) {
        let date2 = new Date(y, m - 1, d);
        d2 = date2.getDate();
        m2 = date2.getMonth() + 1;
        y2 = date2.getYear();
        if (y2 <= 100) {
            y2 = 1900 + y2;
        }
        if (d != d2 || m != m2 || y != y2) {
            console.error(`Date ${date} doesn't exist`);
            ok = 0;
        }
        ok = date2;
    }
    return ok;
}

/**
 *	Get an age in function of a date inserted
 *	@param {string} dt The date of birth used
 *	@param {string} format Used to customize the string returned
 *	@return {string}
 */
function getAge(dt, format) {
    let date = checkDate(dt);
    let m = new Date();
    let age = "";
    let ageY = 0;
    let ageM = 0;
    if (date != 0) {
        if (date.getTime() > m.getTime()) {
            age = "NA";
            console.error("Date of birth is in the future");
        }
        ageY = m.getFullYear() - date.getFullYear();
        m.setYear(date.getYear());
        if (date.getTime() > m.getTime() && date.getMonth() - m.getMonth() != 0) {
            ageY--;
        }
        if (date.getMonth() >= m.getMonth()) {
            ageM = 12 - (date.getMonth() - m.getMonth());
        } else {
            ageM = m.getMonth() - date.getMonth();
        }
        if (ageM == 12) {
            ageM = 0;
        }
        if (ageY == 1) {
            age = ageY + " year";
        }
        if (ageY > 1) {
            age = ageY + " years old";
        }
        if (ageY > 0 && ageM > 0) {
            age += " and ";
        }
        if (ageM > 0) {
            age += ageM + " month";
        }
        if (age == "") {
            age = "less than 1 month";
        }
    }
    if (format == "year") {
        return ageY;
    } else {
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
 * @param {string} contentHeader Data from json
 * @param {boolean} isRequest Set to true to use fixed black header
 */
function makeHeader(contentHeader, isRequest = false) {
    let anchorsList = "";
    const previousActive = $(".nav li.active").attr("id");
    for (i in contentHeader) {
        const anchorClass = contentHeader[i].class ? contentHeader[i].class : contentHeader[i].anchor ? "smoth-scroll" : "";
        const onClick = contentHeader[i].onClick ? `onclick="${contentHeader[i].onClick}"'` : "";
        const href = contentHeader[i].anchor ? `href="#${contentHeader[i].anchor}"` : "";
        const id = contentHeader[i].anchor ? `id="${contentHeader[i].anchor}-anchor"` : "";
        const active = previousActive == `${contentHeader[i].anchor}-anchor` ? "active" : "";
        const listItemClass = contentHeader[i].listItemClass ? contentHeader[i].listItemClass : "";
        const anchorText = contentHeader[i].anchorText;

        anchorsList += `<li ${id} class="${listItemClass} ${active}"><a ${onClick} class="${anchorClass}" ${href}>${anchorText}</a></li>`;
    }

    let html = `
                <div class="${isRequest ? `request-header-top-area navigation-background` : `header-top-area`}">
                    <div class="margin-left-20">
                        <div class="row">
                            <div class="logo col-sm-4">
                                <a class="smoth-scroll" href="${
                                    isRequest ? "./" : "#navigation"
                                }"><img src="img/template/vb_black.png">Vincent <b>Berthet</b></a>
                            </div>
                            <div class="col-sm-8">
                                <div class="navigation-menu">
                                    <div class="navbar">
                                        <div class="navbar-header">
                                            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                                                <span class="sr-only">Toggle navigation</span>
                                                <span class="icon-bar"></span>
                                                <span class="icon-bar"></span>
                                                <span class="icon-bar"></span>
                                            </button>
                                        </div>
                                        <div class="navbar-collapse collapse">
                                            <ul id="anchorList" class="nav navbar-nav navbar-right"></ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    `;

    if (document.getElementById("navigation") && document.getElementById("navigation").innerHTML.length == 0) $("#navigation").html(html);
    $("#anchorList").html(anchorsList);
    this.nightShift.update();

    //Refresh effect.js/Smooth Scroll
    jQuery(document).ready(function () {
        $("a.smoth-scroll").on("click", function (e) {
            var anchor = $(this);
            $("html, body")
                .stop()
                .animate(
                    {
                        scrollTop: $(anchor.attr("href")).offset().top - 50,
                    },
                    1000
                );
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
function makeRelease() {
    currentRelease = "X";
    $("#release").html(currentRelease);

    let json = $.getJSON("json/notes.json");
    json.done(function (data) {
        for (let i in data.notes) {
            currentRelease = data.notes[i].version;
            $("#release").html(currentRelease);
            break;
        }
    });
}

/**
 *    Make the footer of the page
 *    @param {string} contentFooter The data of the *current*.json
 */
function makeFooter(contentFooter, isRequest = false) {
    let html = `
        <div class="container text-center">
            &copy; ${new Date().getFullYear()}<a class="smoth-scroll" href="${
        isRequest ? "./" : "#navigation"
    }"> Vincent Berthet Website</a> - <a href="request.html?id=Notes" >V<span id="release"></span></a> | ${
        contentFooter.dev
    }<a class="smoth-scroll" href="${isRequest ? "./" : "#navigation"}"> Vincent Berthet</a>
        </div> 
    `;

    $("#footerContent").html(html);
    makeRelease();

    //Refresh effect.js/Smooth Scroll
    jQuery(document).ready(function () {
        $("a.smoth-scroll").on("click", function (e) {
            var anchor = $(this);
            $("html, body")
                .stop()
                .animate(
                    {
                        scrollTop: $(anchor.attr("href")).offset().top - 50,
                    },
                    1000
                );
            e.preventDefault();
        });
    });
}
