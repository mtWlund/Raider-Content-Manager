/**
 * Creates a object class existing for the entire backend project.
 * These objects are used for making spreadsheet data available and from a programaticly point of view 
 * render content using mustache based on object data.
 */
let _M = {
    mustache: {
        views:  [],
        menu:   {
            title: "Raid CM",
            items: [
                {
                    url:    "https://script.google.com/macros/s/AKfycbybjQBs3UNkmakRl1ubNhTVLJjfKGdJY8OG0pnHva-1/dev?page=index",
                    name:   "Home",
                },
                {
                    url:    "#",
                    name:   "Guild",
                    subitems: [
                        {
                            name:   "Register",
                            url:    "https://script.google.com/macros/s/AKfycbybjQBs3UNkmakRl1ubNhTVLJjfKGdJY8OG0pnHva-1/dev?page=registerGuild",
                        },
                        {
                            name:   "Register Raids",
                            url:    "https://script.google.com/macros/s/AKfycbybjQBs3UNkmakRl1ubNhTVLJjfKGdJY8OG0pnHva-1/dev?page=registerRaid",
                        },
                        {
                            name:   "Manage Raids",
                            url:    "https://script.google.com/macros/s/AKfycbybjQBs3UNkmakRl1ubNhTVLJjfKGdJY8OG0pnHva-1/dev?page=manageRaid",
                        },
                    ],
                },
                {
                    url:    "#",
                    name:   "View Raids",
                    id:     "guildInformation",
                    subitems: [
                        {
                            name:   "...",
                            url:    "#",
                        },
                    ],
                },
            ],
        }
    },
    config: {
        isAuthed:     false,
    }
}

function loadMustaches(){
    let folder      = DriveApp.getFolderById("1gHR4uyj1QcYa7Qu2_z6R6uEJfkAEf4ea")
    
    if(folder !== null){
        let files = folder.getFiles();
        
        while(files.hasNext()){
            let file = files.next();
            
            _M.mustache.views.push({
                name:       file.getName(),
                mustache:   file.getBlob().getDataAsString(),
            });
        }
    }
}

function setupConfig(){
    
}

loadMustaches();