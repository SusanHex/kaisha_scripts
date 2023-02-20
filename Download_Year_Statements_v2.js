// ==UserScript==
// @name        Download Year Statements v2
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Adds a button to download all the years statements from translink
// @author       Susan
// @match        https://translink.transfirst.com/content/MerchantReports/MerchantStatement.aspx*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=transfirst.com
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';
    // Your code here...
    window.downloadStatementsFromYear = () => {
        console.log("Download statements button presses");
        month_select.selectedIndex = 0;
        localStorage.setItem(LAST_STATEMENT, 0);
        document.getElementById("ccMerchantSearchControl_btnCreateReport").click();
    }
    window.downloadStatement= () => {
        month_select.selectedIndex = stored_statement_index;
        localStorage.setItem(LAST_STATEMENT, stored_statement_index+1);
        document.getElementById("linkbtnOpenPdf").click();
        document.getElementById("ccMerchantSearchControl_btnCreateReport").click();

    }
    var month_select = document.getElementById("ccMerchantSearchControl_ddlMonth_MonthYearDate");
    const LAST_STATEMENT = "LAST_STATEMENT";
    let stored_statement_index = localStorage.getItem(LAST_STATEMENT);
    console.log(stored_statement_index);

    if (stored_statement_index != null && stored_statement_index != undefined && Number(stored_statement_index) < month_select.length) {
        stored_statement_index = Number(stored_statement_index);
        downloadStatement();
    }
    else {
        localStorage.removeItem(LAST_STATEMENT)
        console.log("redrawing button", localStorage.getItem(LAST_STATEMENT))
        let tabledata_element = document.getElementById("linkbtnOpenPdf").parentElement;
        let year_download_anchor = document.createElement("a");
        year_download_anchor.innerText = "Download All Statements From Year";
        year_download_anchor.onclick = window.downloadStatementsFromYear;
        tabledata_element.appendChild(year_download_anchor);
    }

})();