function registerGuild(data){
    var guildInfo = {
        "Name": data.GuildName,
        "Id":   Utilities.getUuid(),
        "RegisterDate": (new Date()).toUTCString(),
        "Owner":    Session.getActiveUser().getEmail(),
    }
    
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const ws = ss.getSheetByName("Guilds");

    ws.appendRow([guildInfo.Owner, guildInfo.Name, guildInfo.Id, guildInfo.RegisterDate]);

    return guildInfo
}

function setGuildRaidId(guildRaidData){
    console.log(guildRaidData)

    const ss = SpreadsheetApp.getActiveSpreadsheet()
    const ws = ss.getSheetByName("Info")
    var date = new Date()
    ws.appendRow([guildRaidData.GuildId, guildRaidData.RaidId, date.toUTCString()])
}

function getGuildRaidIds(GuildId){
    
}