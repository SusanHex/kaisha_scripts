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
            console.log(auth_code);
        };
    })
    }

    window.checkIsSettled();
    // Your code here...
})();