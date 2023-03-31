// ==UserScript==
// @name         Is_Settled
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Finds what Authorizations have a corresponding batch
// @author       Susan H
// @match        https://translink.transfirst.com/content/MerchantReports/MerchantAuthorization.aspx*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=transfirst.com
// @grant        GM_xmlhttpRequest
// @downloadURL  https://github.com/SusanHex/kaisha_scripts/raw/production/Is_Settled.js
// ==/UserScript==

(function() {
    'use strict';

    window.fetchHtmlDocument = (URL) => {
        let return_dom; 
        fetch(URL).then(function (response) {
            return response.text();
        }).then(function (HTML) {
        
            var parser = new DOMParser();
            return_dom = parser.parseFromString(HTML, 'text/html');
        }).catch(function (err) {
            console.warn('Something went wrong.', err);
        });
        return return_dom;
    }
    window.GM_xmlhttpRequest = GM_xmlhttpRequest
    window.checkIsSettled = () => {
    let authTable = document.getElementById("dgAuthorization");
    Array.from(authTable.children[0].children).slice(1).forEach((tr) => {
        const auth_code = tr.children[12].innerText;
        if (auth_code) {
            const merchant_id = document.getElementById("ccMerchantSearchControl_Merchant_ID").value;
            const token_card = tr.children[7].innerText;
            const detail_url = `https://translink.transfirst.com/Content/MerchantReports/MerchantCardActivity.aspx?sendingPage=MerchantAuthorization&detailMerchantID=${merchant_id}&detailSelectedCard=${token_card}`;
            console.log(merchant_id, auth_code, token_card, detail_url);
            detail_document = fetchHtmlDocument(detail_url);
            console.log(detail_document);
        };
    })
    }

    window.checkIsSettled();
    // Your code here...
})();