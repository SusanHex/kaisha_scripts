// Helper functions
function getScriptProperty(
  key,
  log_message = null,
  error_message = null,
  init_value = ''
) {
  let value = PropertiesService.getScriptProperties().getProperty(key);
  if (value === null || value.length === 0) {
    PropertiesService.getScriptProperties().setProperty(key, init_value);
    if (log_message === null) {
      Logger.log(`Please provide a value for '${key}'`);
    } else if (log_message.length > 0) {
      Logger.log(log_message);
    }
    if (error_message === null) {
      throw `Script property '${key}' is null or empty`;
    } else if (error_message.length > 0) {
      throw error_message;
    }
    if (init_value !== null && init_value.length > 0) {
      return init_value;
    } else {
      return null;
    }
  }
  return value;
}

function getSheet() {
  const SPREADSHEET_URL_KEY = 'Spreadsheet_URL';
  const SHEET_NAME_KEY = 'Sheet_Name';
  const SPREADSHEET_URL = getScriptProperty(SPREADSHEET_URL_KEY);
  const SHEET_NAME = getScriptProperty(SHEET_NAME_KEY);
  let spreadsheet = null;

  try {
    spreadsheet = SpreadsheetApp.openByUrl(SPREADSHEET_URL);
    return spreadsheet.getSheetByName(SHEET_NAME);
  } 
  catch(e) {
    console.error(`Failed to get sheet '${SHEET_NAME}' from spreadsheet at '${SPREADSHEET_URL}'`);
    throw e;
  }
}

function getNote(row=-1) {
  let sheet = getSheet();
  if (row===-1) {
    return sheet.getRange(sheet.getLastRow(), 2).getValue();
  } else if (row > 1 && row <= sheet.getLastRow()) {
    return sheet.getRange(row, 2).getValue();
  } else {
    return null;
  }
}

function getDocument() {
  try {
    return DocumentApp.getActiveDocument();
  }
  catch (e) {
    console.error('Failed to get document');
    throw e;
  }
}
// UI functions
function onOpen() {
  let ui = DocumentApp.getUi();
  ui.createMenu('Note Options')
    .addItem('Save Note', 'saveNote')
    .addItem('Load Last Note', 'loadLastNote')
    .addItem('Save As Last Note', 'saveAsLastNote')
    .addItem('Load Note', 'loadNthNote')
    .addToUi();
}

function saveNote() {
  let document = getDocument().getBody();
  const document_content = document.getText();
  if (!document_content) {
    DocumentApp.getUi() // Or DocumentApp, SlidesApp or FormApp.
      .alert('failed to get document contents');
    console.error(
      `Failed to get contents of '${getDocument().getName()}'`
    );
    return null;
  }
  let sheet = getSheet();
  const now = Utilities.formatDate(
    new Date(),
    'GMT-7',
    "yyyy-MM-dd' 'HH:mm:ss"
  );
  sheet.appendRow([now, document_content]);
  sheet.autoResizeColumns(1, 2);
  DocumentApp.getUi().alert(`Saved note to '${sheet.getName()}'`);
  document.setText('');

}

function loadLastNote() {
  let document = getDocument();
  let new_content = getNote();
  document.getBody().setText(new_content);
}

function saveAsLastNote() {
  let sheet = getSheet()
  sheet.deleteRow(sheet.getLastRow());
  saveNote();
}

function loadNthNote() {
  let document = getDocument();
  let sheet = getSheet();
  const row_choice = Number(DocumentApp.getUi().prompt(`Please enter the row of the note from 2 to ${sheet.getLastRow()}`).getResponseText());
  const new_content = getNote(row_choice);
  if (new_content) {
    document.getBody().setText(new_content);
    DocumentApp.getUi().alert(`Retrieved note ${row_choice} from ${sheet.getRange(row_choice, 1).getValue()}`);
  }
}

// Tool UI functions

function generateClosurePreamble() {
  const closure_preamble_pattern = /(\w+)\s(\w+)\s\/\/\s(\w+)/g;
  let document = getDocument();
  const document_content = document.getText();
  // const first_name, last_name, positon = document_content.match(closure_preamble_pattern)
  
}