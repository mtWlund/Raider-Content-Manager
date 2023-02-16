/**
 * All credits to Trikas.
 * Go here and thank the man!
 * Discord: https://discord.gg/4625d8ccgz
 * Donate beer money:
 * PayPal:  https://www.paypal.com/donate/?hosted_button_id=AR22CNHWXLQ4L 
 * Patreon: https://www.patreon.com/trikas
 * 
 * Import RaidHelper data
 */
function RaidHelperImport() {
  const ActiveSpreadSheet   = SpreadsheetApp.getActiveSpreadsheet();
  const raidId              = ActiveSpreadSheet.getRangeByName(_G.sheetName.raiders + "!" + _G.namedRange.raidId).getDisplayValue();
  
  if (!raidId) {
    Logger.log(`No Raid ID for RaidDay ${raidDay}`);
    return
  };

  var raidHelperRequestOptions = {
    'headers': { 'Content-Type': 'application/json' },
    'method': 'POST',
  };

  let raidHelperEventsRequest;

  try {
    raidHelperEventsRequest = JSON.parse(UrlFetchApp.fetch(`https://raid-helper.dev/api/raidplan/${raidId}`, raidHelperRequestOptions));
  } catch (e) {
    Logger.log(e);
  }

  if (!raidHelperEventsRequest) {
    Logger.log('No Raid Helper Events Request Response')
    return
  }
  
  const participants        = ActiveSpreadSheet.getRangeByName(_G.sheetName.raidData + "!" + _G.namedRange.raidParticipants);
  
  participants.clear().setBackground('#2f3136').setFontColor('#cccccc');
  const importCharData        = raidHelperEventsRequest.raidDrop.filter(x=> x.class !== "Late" && x.class !== null && x.class !== "").map((p, i) => [p.partyId, p.slotId, p.name, convertRaidHClassToWoWClass(p), convertRaidHSpecToWoWSpec(p), p.signuptime])
  const lateSignUps = raidHelperEventsRequest.raidDrop.filter(x=> x.class === "Late").map((p, i) => [p.partyId, p.slotId, p.name, convertRaidHClassToWoWClass(p), convertRaidHSpecToWoWSpec(p), p.signuptime])

  if        ( participants.getNumRows() == importCharData.length ){
    participants.setValues();
  } 
  else if   ( participants.getNumRows() < importCharData.length ){
    participants.setValues(importCharData.slice(0,participants.getNumRows()));
  }
  else if   (  participants.getNumRows() > importCharData.length ){
    var rangeSpan = _G.sheetName.raidData + "!" + "H2:M" + (importCharData.length + 1)
    var rangeParticipants = ActiveSpreadSheet.getRange(rangeSpan);
    rangeParticipants.setValues(importCharData);
  }

  if (lateSignUps.length > 0) {
    var lateSpan = _G.sheetName.raidData + "!" + "H" + (importCharData.length + 2) + ":M" + (importCharData.length + lateSignUps.length + 1)
    var lateParticipants = ActiveSpreadSheet.getRange(lateSpan);
    lateParticipants.setValues(lateSignUps);
  }

  const overlayOptions        = ActiveSpreadSheet.getRangeByName(_G.sheetName.raidData + "!" + _G.namedRange.rhOverlayOptions);
  const importOverlayOptions  = raidHelperEventsRequest.overlayDropColorObject.filter(x=> x.class !== "Tank" && x.class !== x.spec).map((dco, i) => [convertRaidHClassToWoWClass(dco), convertRaidHSpecToWoWSpec(dco), dco.class_emote, dco.spec_emote, dco.role_emote, dco.color])
  overlayOptions.setValues(importOverlayOptions);

}