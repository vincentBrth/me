/**
 * @author Vincent Berthet <vincent.berthet42@gmail.com>
 */

/**
 * Initialize request.html depending of the request selected
 * @param {string} type Define the kind of the request 
 * @param {string} id Id requested 
 * @param {string} to If there is a redirection
 */
function init(type,id,to){
    if(type==undefined) type=``;
    this.type=type;
    this.id=id;
    this.to=to;
    this.waitTime=10;
    this.x;
    document.title = this.id;
    if(document.title==`null`) document.title=this.type;
    this.language.setLang(`.request`);
    this.language.make();
}

/**
 * Check if a key exist in the JSON
 * @param {string array} data JSON file loaded
 * @param {string} id Key of the element
 * @return {string array}  
 */
function checkRequest(data,id){
    //Check if the data are valid  
    for(let key in data){
        if(key==id) return data[key];
    }
    return undefined;
}

/**
 * Update color of the page according to his type if it is defined in request.css
 * @param {string} type Type of the page 
 */
function checkColor(type){
    var style = getComputedStyle(document.body);
    let color=style.getPropertyValue('--'+type.toLocaleLowerCase()+'-color');

    if(color==``){
        color=style.getPropertyValue('--primary-color');
        console.warn(`Color not found use '--primary-color' (${color}) instead`);
    } 

    return color;
}

/**
 * Call after initalization to make the correct content of the page
 */
async function make(){
    const typeLowerCase=this.type.toLocaleLowerCase();
    let data=await this.language.getData();
    let content=checkRequest(data[typeLowerCase],this.id);

    if(typeLowerCase==`notes`){
        makeNotes(data);
    }else{
        if(!content){
            //Request invalid
            console.error('Request invalid : {type}'+typeLowerCase,' - {id}'+this.id);
            this.type='Unknown'
            makeUnknown(data['unknown']);
            makeCounter(); 
        }

        if(typeLowerCase==`download`){
            makeDownload(content);
        }else if(typeLowerCase==`player`){
            makePlayer(content);  
        }else if(typeLowerCase==`webgl`){
            makeWebGL(content);
        }else if(typeLowerCase==`redirect`){
            makeRedirect(content);
            makeCounter(this.to);      
        }else if(typeLowerCase==`page`){
            makePage(content);
        }else {
            makeUnknown(data['unknown']);
            makeCounter(); 
        }
    }

    let header=(`
                    {
                        "header":{
                            "${this.type}":{
                                "anchor":"home",
                                "anchorText":"${this.type}",
                                "liclass":"margin-right-30 active"
                            },
                            "nightshift":{
                                "onClick":"nightShift.toggle()",
                                "anchorText":"<div id='nightShift' class='navicon'>nightshift</i></div>"
                            }
                        }
                    }
                `);

    makeHeader(JSON.parse(header),true);
    makeFooter(await this.language.getData(`en`),true);
    document.documentElement.style.setProperty('--primary-color', checkColor(type));
}

/**
 * Make Notes page
 * @param {string array} data JSON file loaded
 */
async function makeNotes(data){
    let updates_html=(`
        <div class='col-sm-6'>
            <h1>Updates</h1><br/>
            <ul>  
    `); 
    let todo_html=(`
        <div class='col-sm-6'>
            <h1>To Do</h1><br/>
            <ul>   
    `);               
   
    let url=await this.language.getGithubURL();
    for(let key in data.notes){   
        let id=data.notes[key].id;
        if(data.notes[key].github==true) id=`<a href='${url}vberthet/releases/tag/${id}' target='_blank'>${id}</a>`;  
        updates_html += (`
        <li>
            <p>
            <b><u>Version ${id} :</b></u> ${data.notes[key].released}<br/>
            ${data.notes[key].text}
            </p>
        </li>
        `);    
    }
    updates_html +=`</ul></div>`;
    for(let key in data.todo){

        todo_html += (`
            <li>
                ${data.todo[key]}
            </li>
        `);     
    }
    todo_html+=`</ul></div>`;
    
    $(`#home`).html(`<div class='container'>${updates_html}${todo_html}</div>`);
} 

/**
 * Download page
 * @param {string array} data JSON file loaded 
 */
async function makeDownload(data){
    let main_html=``;
    let public=await this.language.getGithubPublicURL();
       
    if(data.title!=undefined) document.title=data.title;
    main_html += (`
        <div class='container'>
            <div class='request-center' style='margin-top:20%' col-md-12'>
                <div class='request-logo'>
                    Download
                </div>
                <div class='request-title'>
                    <h4>${data.name}</h4>
                </div>
                <p><h5><i>${data.description}</i></h5><p>
                <div>
                    <a class='button button-style button-style-dark' href='${public}${data.href}' onclick=''><i class='far fa-arrow-alt-circle-down'></i> ${data.type}</a>
                </div>
            </div>
        </div>
    `);
    $(`#home`).html(main_html);
}

/**
 * Make an embeded player and description
 * @param {string array} data JSON file loaded 
 */
function makePlayer(data){
    let main_html=``;

    if(data.title!=undefined) document.title=data.title;
    main_html=(`
        <div class='container'>
            <h1>${data.name}</h1>
            <p>${data.description}</p>
            <div class='col-md-12 request-center iframe-container'>
                <iframe width='854' height='480' src='${data.href}' frameborder='0' allow='autoplay; encrypted-media' allowfullscreen></iframe>
            </div>,
        </div>
    `);
    $(`#home`).html(main_html);
}

/**
 * Make an embeded  web gl player with Unity default template
 * @param {string array} data JSON file loaded 
 */
async function makeWebGL(data){
    let main_html=``;
    let width=`960`;
    let height=`643`;
    let page=await this.language.getGithubPageURL();
    let githubURL=await this.language.getGithubURL();

    if(data.title!=undefined) document.title=data.title;
    href=page+data.href;
    width=data.width != undefined ? data.width : width;
    height=data.height != undefined ? data.height : height;

    main_html=(`
        <div class='container'>
            <h1>${data.name}</h1>
            <p>${data.description}</p>
            <p><a href='${githubURL}${data.href.split('/')[0]}' target='_blank'><i class='fab fa-github'></i> Github source</a></p>
        </div>
        <div class='request-center iframe-container'><iframe src='${href}' frameborder='0' allow='autoplay; encrypted-media' allowfullscreen></iframe></div>
    `);
    $(`#home`).html(main_html);
}

/**
 * Make a redirect request
 * @param {string array} data JSON file loaded 
 */
function makeRedirect(data){    
    if(this.id==`WIP_Mobile`){
        this.to=`request.html?type=Redirect&id=Mobile&to=${this.to}`; 
        this.id=`WIP`
    } 
    let main_html=``;
    main_html += (`
        <div class='container'>
            <div class='request-center' style='margin-top:20%' col-md-12'>
                <div class='request-logo'>${this.id}</div>
                <div class='request-title'>
                    <h1>${data.title}</h1>
                </div>
                <p><h4><i>${data.text}</i></h4><p>
                <div class='counter'>
                    <p>You will be automatically redirected in <span id='counter'>x</span> s</p>
                </div>
                    <div>
                        <a class='button button-style button-style-dark' href='${this.to}'>${data.button}</a>
                    </div>
            </div>
        </div>
    `);
    $(`#home`).html(main_html); 
}

/**
 * Make a blank page
 * @param {string array} data JSON file loaded 
 */
async function makePage(data){   
    this.type=data.type;
    document.title=this.type;
   
    let main_html=``;
    main_html +=(`
        <div class='container'>
            <h1>${data.title}</h1>
            <div>${data.text}</div>  
        </div>
        <div id='page'>${data.page ? data.page : ''}</div> 
    `);
       
    $(`#home`).html(main_html); 
    /*
    console.log(data); 
    if(data.github){

        let githubSources=`<p><a href='${githubURL}${data.href.split('/')[0]}' target='_blank'><i class='fab fa-github'></i> Github source</a></p>`;
        $(`#github`).html(main_html); 
    }  
    */
}

/**
 * Make a unknown request
 * @param {string array} data JSON file loaded 
 */
function makeUnknown(data){   
    let main_html=``;
    main_html += (`
        <div class='container'>
            <div class='request-center' style='margin-top:20%' col-md-12'>
                <div class='request-logo'>Unknown</div>
                <div class='request-title'>
                    <h1>${data.title}</h1>
                </div>
                <p><h4><i>${data.text}</i></h4><p>

                <div class='counter'>
                    <p>You will be automatically redirected in <span id='counter'>x</span> s</p>
                </div>
                <div>
                    <a class='button button-style button-style-dark' href='./'>${data.button}</a>
                </div>
            </div>
        </div>
    `);
    $(`#home`).html(main_html);    
}

/**
 *  Replace the hidden label 'counter' by the waiting time remaining before automatic action
 */
function makeCounter(to=`./`) {
    window.document.getElementById(`counter`).innerHTML = this.waitTime;
    this.x = window.setInterval(`count('${to}')`, 1001);
}

/**
 * Count until redirection
 */
function count(to=`./`) {
    ((this.waitTime > 0)) ? (window.document.getElementById('counter').innerHTML = --this.waitTime) : (window.clearInterval(x));
    if (this.waitTime == 0) {
        window.location = to;
    }
}