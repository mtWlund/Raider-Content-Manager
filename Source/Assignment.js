/*====================================================================================================================================*
  IVD_wotlk by Robin Westerlund
  ====================================================================================================================================
  Version:      1.2
  Project Page: Find me on Discord
  Copyright:    (c) 2023-01-19
  License:      Free to copy, reuse or modify.
  ------------------------------------------------------------------------------------------------------------------------------------
  A Google Apps Script to parse Spreadsheets 
  ------------------------------------------------------------------------------------------------------------------------------------
  1.0     Initial release
  1.1     Add Class Role Ids
  1.2     Change layout and update assignment to static positions.
  1.3     Revising the scripts and breaking them out in several components (Thank you Trikas!)
 *====================================================================================================================================*/
const config = {
  get ss() {
    delete this.ss;
    return (this.ss = SpreadsheetApp.getActiveSpreadsheet());
  },
};
/**
 * The start of it all - Magic Button to do Magical things!
 * Either fetches entire Spreadsheet (warning this takes a LONG time) or only the 'Assignments' sheet
 * Configure this in the 'Raiders' sheet on row 3. I recommend only auto update on Assignments sheet.
 */
function processParticipantsAssignments() {
  //var sApp = SpreadsheetApp.getActiveSpreadsheet();
  var colorStyle = config.ss.getRangeByName(_G.sheetName.raiders + "!" + _G.namedRange.classColoringStyle).getValue();
  
  // Begin colorizing and updating assignments!
  refreshMembers_(_G.sheetName.assignments,colorStyle);
}

/**
 * 
 */
function refreshRaiderParticipants() {
  //var sApp = SpreadsheetApp.getActiveSpreadsheet();
  var colorStyle = config.ss.getRangeByName(_G.sheetName.raiders + "!" + _G.namedRange.classColoringStyle).getValue();
  
  // Colorize the Raiders sheet! Yeah!
  refreshRaidMembers_(colorStyle);
}

/**
 * Colors the cell Font and Background depending on colorStyle instruction.
 * Updates the range with correct Name, Background or Font color.
 * @param {searchFor} Raid Role Id (Example: MT-1).
 * @param {playerName} String name of Discord UserId (Example: 'Herakh').
 * @param {classColor} Color code value as in hex-value '#ffffff'.
 * @param {colorStyle} String representing 'Background' or 'Font' for Class coloring.
 * @param {sheet} sheet boject.
 */
function colorCells(searchFor,playerName,classColor,colorStyle, sheet) {
  if (!searchFor) return;
  const cellsToColor = [];
  //sheet.getDataRange().getDisplayValues()
  sheet.getRange(1,1,sheet.getLastRow(),10).getDisplayValues()
    .forEach((row, rowIndex) => row
      .forEach((value, columnIndex) => {
        //if(columnIndex >= 2 && columnIndex <= 10 || rowIndex <= 10 && columnIndex >= 34){
          if (value === searchFor) {
            cellsToColor.push(sheet.getRange(rowIndex + 1, columnIndex -3));
          }
        //}
      })
    );
  if(colorStyle == "Background"){
    cellsToColor.forEach(cell => cell.setBackground(classColor).setFontColor('black').setValue(playerName));
  } else {
    cellsToColor.forEach(cell => cell.setBackground('#2f3136').setFontColor(classColor).setValue(playerName));
  }
}

/** 
 * Update Raiders sheet with classColor coded names.
 * @param {colorStyle} String representing 'Background' or 'Font' for Class coloring. 
 */
function refreshRaidMembers_(colorStyle){
  var raidMembers = config.ss.getRangeByName(_G.sheetName.raiders + "!" + _G.namedRange.composition);
  var raidMembersList = raidMembers.getValues();

  for(var rPos = 0; rPos < raidMembersList.length; rPos++)
  {
    if(raidMembersList[rPos][2])
    {
      var member = raidMembers.getCell(rPos+1,3);
      var classColor = raidMembersList[rPos][6];
      if(colorStyle == "Background"){
        member.setBackground(classColor).setFontColor('black');
      } else {
        member.setBackground('#2f3136').setFontColor(classColor);
      }
    }
  }
}

/**
 * Using sheetName to parse document and update any matching Roles with Player and correct ColorCode for Player class
 * @param {sheetName} Name of the sheet to update.
 * @param {colorStyle} String representing 'Background' or 'Font' for Class coloring. 
 */
function refreshMembers_(sheetName,colorStyle){
  var range = config.ss.getRangeByName(_G.sheetName.raiders + "!" + _G.namedRange.composition);
  var vA=range.getValues();
  var targetSheet = config.ss.getSheetByName(sheetName);
  vA.forEach(function(r, i) {
    r.forEach(function(c, j) {
      if (i >= 0 && j == 2 && vA[i][j] != "") {
        colorCells(vA[i][9],vA[i][2],vA[i][6],colorStyle,targetSheet);
        colorCells(vA[i][10],vA[i][2],vA[i][6],colorStyle,targetSheet);
      }
    });
  });
}

/**
 * Iterate all Assignments RoleType Id, validate if they exist.
 * Value not present is changed to 'None'
 */
function resetMemberAssignments(){
  var sheet = config.ss.getSheetByName(_G.sheetName.assignments);
  
  var existingRolePrefix = config
    .ss
    .getRangeByName(_G.sheetName.raiders + "!" + _G.namedRange.raidRoles)
    .getDisplayValues();

  var existingClassRolePrefix = config
    .ss
    .getRangeByName(_G.sheetName.raiders + "!" + _G.namedRange.raidRoleClass)
    .getDisplayValues();
  
  var listCurrentRoles = existingRolePrefix.map(function(row) {return row[0];});
  var listCurrentClassRoles = existingClassRolePrefix.map(function(row) {return row[0];});

  const cellsToColor = [];
  
  // Iterate all roles
  sheet.getRange(1,1,sheet.getLastRow(),10).getDisplayValues()
    .forEach((row, rowIndex) => row
      .forEach((value, columnIndex) => {
        if(columnIndex >= 2 && columnIndex <= 10){
          _G.autoAssign.rolePrefix.forEach(function(searchFor){
            if(value.startsWith(searchFor)){
              if(listCurrentRoles.indexOf(value) == -1 || value === "None" ){
                cellsToColor.push(sheet.getRange(rowIndex + 1, columnIndex + 1));
              }
            }
          });
        }
      })
    );
  // Set RoleId to "None" for assignments not based on ClassRoleId
  cellsToColor.forEach(cell => cell.setValue("None"));
  cellsToColor.forEach(cell => cell.offset(0,-4).setBackground('#2f3136').setValue(""))

  /*
   * Iterate all class roles
   * After further consideration i decided against reseting Class Roles... the purpose of defining a assignment to a specific class, 
   * as long as one Player exists with that class, he/she should be assigned the role. 
   * If its missing, (usually class skill related) it should remain empty.
   */
  sheet.getRange(1,1,sheet.getLastRow(),10).getDisplayValues()
    .forEach((row, rowIndex) => row
      .forEach((value, columnIndex) => {
        if(columnIndex >= 2){
          _G.autoAssign.classRolePrefix.forEach(function(searchFor){
             if(value.startsWith(searchFor)){
              if(listCurrentClassRoles.indexOf(value) == -1 ){
                //cellsToColor.push(sheet.getRange(rowIndex + 1, columnIndex + 1));
                sheet
                  .getRange(rowIndex + 1, columnIndex + 1)
                  .offset(0,-4)
                  .setBackground('#2f3136')
                  .setValue("")
              }
            }
          });
        }
      })
    );
}