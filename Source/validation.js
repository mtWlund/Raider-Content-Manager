/**
 * Find all guilds user is moderator for using Session from Google.
 * @date 2/18/2023 - 3:22:03 PM
 * 
 * @returns {{}}
 */
function moderatorForGuilds(){
    const ws_mod        = ss.getSheetByName(_G.configSheets.moderators);
    let guilds          = []
    let textFinder      = ws_mod.getRange("A2:A" + ws_mod.getLastRow())
                                .createTextFinder(user.getEmail());

    textFinder.findAll().forEach(r => {
        let row = ws_mod.getRange("A" + r.getRow() + ":D" + r.getRow()).getDisplayValues()
        console.log(row);
        guilds.push({
            email:   row[0][0],
            guild:   row[0][1],
            guildId: row[0][2],
        });
    });

    console.log(guilds);

    return guilds;
}

/**
 * Description placeholder
 * @date 2/18/2023 - 3:23:06 PM
 *
 * @returns {{}}
 */
function getGuildsOwnedByUser(){
    let ws_guild    = ss.getSheetByName("Guilds");
    let guilds = [];
    let textFinder       = ws_guild.getRange("A2:B" + ws_guild.getLastRow())
                        .createTextFinder(user.getEmail());

    textFinder.findAll().forEach(r => {
        guilds.push(
            ws_guild.getRange("A" + r.getRow() + ":D" + r.getRow()).getDisplayValues()
        )
    });
    console.log(guilds)

    return guilds;
}