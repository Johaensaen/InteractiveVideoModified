function doGet(e) {
  var htmlOutput =  HtmlService.createTemplateFromFile('UploadFile');
  htmlOutput.message = '';
  return htmlOutput.evaluate();
}


function doPost(e) {
  
  Logger.log(JSON.stringify(e));
  
  var destination_id = '17nxn6WP5kegcJaoIMS6daLRqT8Mj8HNE';  // ID OF GOOGLE DRIVE DIRECTORY;
  var destination = DriveApp.getFolderById(destination_id);
  
  var data = Utilities.base64Decode(e.parameter.fileData);
  var blob = Utilities.newBlob(data, e.parameter.mimeType, e.parameter.fileName);
  destination.createFile(blob);
  
  listRecord(e.parameter.username, e.parameter.fileName); 
  
  var htmlOutput =  HtmlService.createTemplateFromFile('UploadFile');
  htmlOutput.message = 'File Uploaded';
  return htmlOutput.evaluate();
  
}

function listRecord(username, filename)
{
  var url = 'https://docs.google.com/spreadsheets/d/1Z4EeTCJqZbQiFJOQOV7_VKwuBlB1mb5y4wUgH3J_-Qg/edit?usp=sharing';  //URL OF GOOGLE SHEET;
  var ss= SpreadsheetApp.openByUrl(url);
  var recordsSheet = ss.getSheetByName("Records");
  recordsSheet.appendRow([username, filename, new Date()]);
}

function getUrl() {
 var url = ScriptApp.getService().getUrl();
 return url;
}