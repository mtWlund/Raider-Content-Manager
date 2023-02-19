/**
 * Collection of functions to perform backend tasks.
 * @date 2/18/2023 - 3:23:32 PM
 *
 * @type {*}
 */
const ss = SpreadsheetApp.getActiveSpreadsheet()
const user = Session.getActiveUser()

/**
 * Description placeholder
 * @date 2/18/2023 - 3:23:24 PM
 *
 * @param {*} data
 * @returns {{ Name: any; Id: any; RegisterDate: any; Owner: any; }}
 */
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

/**
 * Description placeholder
 * @date 2/18/2023 - 3:23:18 PM
 *
 * @param {*} guildRaidData
 */
function setGuildRaidId(guildRaidData){
    console.log(guildRaidData)

    var ws = ss.getSheetByName("Info")
    var date = new Date()
    ws.appendRow([guildRaidData.GuildId, guildRaidData.RaidId, date.toUTCString()])
}

/**
 * Description placeholder
 * @date 2/18/2023 - 3:24:12 PM
 *
 * @param {*} data
 * @returns {*}
 */
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