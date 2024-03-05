function onOpen() {
  var ui = DocumentApp.getUi();
  // Or DocumentApp, SlidesApp or FormApp.
  ui.createMenu("Custom Menu")
    .addItem("First item", "menuItem1")
    .addSeparator()
    .addSubMenu(ui.createMenu("Sub-menu").addItem("Second item", "menuItem2"))
    .addToUi();
}

function menuItem1() {
  DocumentApp.getUi() // Or DocumentApp, SlidesApp or FormApp.
    .alert("You clicked the first menu item!");
}

function menuItem2() {
  DocumentApp.getUi() // Or DocumentApp, SlidesApp or FormApp.
    .alert("You clicked the second menu item!");
}
