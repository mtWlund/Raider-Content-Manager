const ss = SpreadsheetApp.getActiveSpreadsheet()
const user = Session.getActiveUser()

function registerGuild(data){
    var guildInfo = {
        "Name": data.GuildName,
        "Id":   Utilities.getUuid(),
        "RegisterDate": (new Date()).toUTCString(),
        "Owner":    Session.getActiveUser().getEmail(),
    }
    
    var ws = ss.getSheetByName("Guilds");

    ws.appendRow([guildInfo.Owner, guildInfo.Name, guildInfo.Id, guildInfo.RegisterDate]);

    return guildInfo
}

function setGuildRaidId(guildRaidData){
    console.log(guildRaidData)

    var ws = ss.getSheetByName("Info")
    var date = new Date()
    ws.appendRow([guildRaidData.GuildId, guildRaidData.RaidId, date.toUTCString()])
}

function getUserGuilds(){
    var ws_guild    = ss.getSheetByName("Guilds");
    var guild = [];
    let textFinder       = ws_guild.getRange("A2:B" + ws_guild.getLastRow())
                        .createTextFinder(user.getEmail());

    textFinder.findAll().forEach(r => {
        guild.push(
            ws_guild.getRange("A" + r.getRow() + ":D" + r.getRow()).getDisplayValues()
        )
    });
    console.log(guild)

    return guild;
}

function getGuildRaidIds(data){
    var ws_guild    = ss.getSheetByName("Guilds");
    var guild       = ws_guild.getRange("A2:D" + ws_guild.getLastRow())
                        .createTextFinder(data.guildName)
                        .findAll();
    
    var ws_info     = ss.getSheetByName("Info");
    var guildRaids  = ws_info.getRange("A2:C" + ws_info.getLastRow())
                        .createTextFinder(guild[0][2])
                        .findAll();
    
    console.log(data);
    console.log(guildRaids);
    
    return guildRaids;
}