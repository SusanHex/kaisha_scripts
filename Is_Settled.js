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
    window.checkDocumentForAuth = (doc, auth_code) => {
        const transaction_table = doc.getElementById("dgTransDetail");
        if (transaction_table.children[0].children[0].class) {
            for (const tr of Array.from(transaction_table.children[0].children)) {
                if (auth_code === tr.children[5].innerText) {
                    return true;
                }
            }
        }
        else {
            return false;
        }
    }

    window.fetchHtmlDocument = async (URL) => { 
        return await fetch(URL).then(function (response) {
            return response.text();
        }).then(function (HTML) {
        
            var parser = new DOMParser();
            return parser.parseFromString(HTML, 'text/html');
        }).catch(function (err) {
            console.warn('Something went wrong.', err);
        });
    };
    window.checkIsSettled = async () => {
    let authTable = document.getElementById("dgAuthorization");
    for (const tr of Array.from(authTable.children[0].children).slice(1)) {
        let auth_code_td = tr.children[12]
        const auth_code = auth_code_td.innerText;
        if (auth_code) {
            const merchant_id = document.getElementById("ccMerchantSearchControl_Merchant_ID").value;
            const token_card = tr.children[7].innerText;
            const detail_url = `https://translink.transfirst.com/Content/MerchantReports/MerchantCardActivity.aspx?sendingPage=MerchantAuthorization&detailMerchantID=${merchant_id}&detailSelectedCard=${token_card}`;
            console.log(merchant_id, auth_code, token_card, detail_url);
            let detail_document = await fetchHtmlDocument(detail_url);
            let result = checkDocumentForAuth(detail_document);
            console.log(result);
        };
    }
    };

    window.checkIsSettled();
    // Your code here...
})();