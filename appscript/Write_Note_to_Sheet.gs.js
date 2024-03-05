function getScriptProperty(
    key,
    log_message = null,
    error_message = null,
    init_value = ""
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
  
  function onOpen() {
    var ui = DocumentApp.getUi();
    ui.createMenu("Custom Menu").addItem("Save Note", "saveNote").addToUi();
  }
  
  function saveNote() {
    const SPREADSHEET_URL = getScriptProperty("Spreadsheet_URL");
    const SHEET_NAME = getScriptProperty("Sheet_Name");
  
    let document = DocumentApp.getActiveDocument().getBody();
    const document_content = document.getText();
    if (!document_content) {
      DocumentApp.getUi() // Or DocumentApp, SlidesApp or FormApp.
        .alert("failed to get document contents");
      console.error(
        `Failed to get contents of "${DocumentApp.getActiveDocument().getName()}"`
      );
      return null;
    }
    let spreadsheet = SpreadsheetApp.openByUrl(SPREADSHEET_URL);
    const now = Utilities.formatDate(new Date, 'GMT-7', "yyyy-MM-dd' 'HH:mm:ss");
    spreadsheet.getSheetByName(SHEET_NAME).appendRow([now, document_content]);
    spreadsheet.getSheetByName(SHEET_NAME).autoResizeColumns(1,2);
    DocumentApp.getUi().alert(`Saved note to "${spreadsheet.getName()}"`);
  }
  