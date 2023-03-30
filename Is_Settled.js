// ==UserScript==
// @name         Is_Settled
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Finds what Authorizations have a corresponding batch
// @author       Susan H
// @match        https://translink.transfirst.com/content/MerchantReports/MerchantAuthorization.aspx*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=transfirst.com
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';
    window.GM_xmlhttpRequest = GM_xmlhttpRequest
    window.checkIsSettled = () => {
    let authTable = document.getElementById("dgAuthorization");
    }
    // Your code here...
})();