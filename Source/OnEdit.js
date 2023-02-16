/**
 * The event handler triggered when editing the spreadsheet.
 * @param {Event} e The onEdit event.
 * @see https://developers.google.com/apps-script/guides/triggers#onedite
 */
function onEdit(e) {
  // auto update if using Raid Role Id to change members,
  // minor changes to Assignments does not require a full "Magic" run.
  var sheetName = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getName();
  
  if("Assignments" === sheetName) { assignRaiderToRole_(e) }
}

/**
 * Sets the color of a drop-down list cell to the color
 * of the cell where the value was picked from.
 *
 * @param {Object} e The onEdit() event object.
 * @param {String} rolesRangeName which range to use for class/roleTypes.
 */
function assignRaiderToRole_(e) {
  var rule = e.range.getDataValidation();
  var helpText = rule.getHelpText()    
  var roles = [[]];
  var roleTypeOffset = 0;
  var sApp = SpreadsheetApp.getActiveSpreadsheet();
  
  if(helpText != ""){
    switch(helpText){
      case "roleId":
        roles = sApp.getRangeByName(_G.sheetName.raiders + "!" + _G.namedRange.raidRoles).getValues();
        roleTypeOffset = 10;
        break;
      case "classRoleId":
        roles = sApp.getRangeByName(_G.sheetName.raiders + "!" + _G.namedRange.raidRoleClass).getValues();
        roleTypeOffset = 9;
        break;
    }
  }
  var rolesFlat = roles.map(function(row) {return row[0];});
  var colorStyle = sApp.getRangeByName(_G.sheetName.raiders + "!" + _G.namedRange.classColoringStyle).getValue();

  if(rolesFlat.indexOf(e.value) != -1){
    var raidMembers = sApp.getRangeByName(_G.sheetName.raiders + "!" + _G.namedRange.composition);
    var raidMembersList = raidMembers.getValues();
        
    for(var rPos = 0; rPos < raidMembersList.length; rPos++){
      if(raidMembersList[rPos][roleTypeOffset] === e.value){
        var memberCell = e.range.offset(0,-4);
        if(e.value === 'None'){
          var classColor = '#2f3136';
        } else {
          var classColor = raidMembersList[rPos][6];
        }
        
        if("Background" == colorStyle){
          memberCell.setBackground(classColor).setFontColor("black").setValue(raidMembersList[rPos][2]);
        } else {
          memberCell.setBackground('#2f3136').setFontColor(classColor).setValue(raidMembersList[rPos][2]);
        }
      }
    }
  }
}