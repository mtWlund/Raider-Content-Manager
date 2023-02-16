function doGet(e) {
    let page = 'index';

    if('page' in e.parameters){
        page = e.parameters['page'][0];
    }
    
    console.log(page)
    try{
        const htmlService = HtmlService.createTemplateFromFile(page + ".html");
        const html = htmlService.evaluate().addMetaTag("viewport","width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no");
        return html;
    }
    catch(err){
        return ContentService.createTextOutput(JSON.stringify(err))
    }
    
}