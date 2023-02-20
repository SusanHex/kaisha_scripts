// ==UserScript==
// @name        Download Year Statements
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Adds a button to download all the years statements from translink
// @author       Susan 
// @match        https://translink.transfirst.com/content/MerchantReports/MerchantStatement.aspx*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=transfirst.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
window.downloadStatementsFromYear = () => {
    var selected_year = document.getElementById("ccMerchantSearchControl_ddlYear_MonthYearDate").value;
    var merchant_id = document.getElementById("ccMerchantSearchControl_Merchant_ID").value;
    var download_anchor = document.getElementById("linkbtnOpenPdf");
    ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"].forEach((month) => {
        var file_url = `MerchantStatementPdf.aspx?MerchantID=${merchant_id}&amp;YearMonth=${selected_year}${month}&amp;Disposition=attachment`;
        fetch(file_url,{
  credentials: "include"
}).then(function(t) {
            return t.blob().then((b)=>{
                if(b.size > 0) {
                var a = document.createElement("a");
                a.href = URL.createObjectURL(b);
                a.setAttribute("download", `Statement_MID_${merchant_id}_YM_${selected_year}${month}.pdf`);
                a.click();
                }}
            );
        });
    })
}
    var tabledata_element = document.getElementById("linkbtnOpenPdf").parentElement;
    var year_download_anchor = document.createElement("a");
    year_download_anchor.innerText = "Download All Statements From Year";
    year_download_anchor.onclick = window.downloadStatementsFromYear;
    tabledata_element.appendChild(year_download_anchor);
})();