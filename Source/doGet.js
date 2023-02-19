function doGet(e) {
    let page = 'index';

    if('page' in e.parameters){
        page = e.parameters['page'][0];
    }

    

    if(_M.mustache.views.length == 0){
        console.log("We reload mustaches!");
        loadMustaches();
    } else {
        console.log("We didnt load mustaches because they are already there!");
    }

    console.log(page)
    try{
        const htmlService = HtmlService.createTemplateFromFile(page + ".html");
        const html = htmlService.evaluate().addMetaTag("viewport","width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no");
        return html;
    }
    catch(err){
        console.log(err);
        return ContentService.createTextOutput(JSON.stringify(err))
    }
    
}

function getMenu(){
    var result      = "<h1>HOLA!</h1>"
    var view    = _M.mustache.views.filter(x=> x.name == "appbar.mustache" && x.mustache !== "");
    //console.log(view[0]);
    result = Mustache.render(view[0].mustache, _M.mustache.menu );
    console.log(result);
    return result;
}

function isModerator(){
    user.getEmail();
}