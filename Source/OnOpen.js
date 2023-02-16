/**
 * The event handler triggered when opening the spreadsheet.
 * @param {Event} e The onOpen event.
 * @see https://developers.google.com/apps-script/guides/triggers#onopene
 */
function onOpen(e) {
    SpreadsheetApp.getUi()
      .createMenu('IVD Raid Sheets')
      .addItem('Import from RaidHelper','RaidHelperImport')
      .addSeparator()
      .addItem('Refresh Raiders Sheet', 'refreshRaiderParticipants')
      .addItem('Clear missing roles',   'resetMemberAssignments')
      .addItem('Automatic assign',      'processParticipantsAssignments')
      .addToUi();
  }
  
  function onOpenWithTriggerCheck() {
    onOpen(undefined)
  }