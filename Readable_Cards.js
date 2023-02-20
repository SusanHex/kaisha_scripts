// ==UserScript==
// @name         Readable Cards
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.mreports.com/ac/authInquiry.do
// @icon         https://www.google.com/s2/favicons?sz=64&domain=mreports.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
//document.querySelector("img[src=\"/ac/images/refresh.gif\"]").onclick = () => {
//    console.log("Hello world");
//}
    // Your code here...
    document.querySelectorAll("td[width=\"10%\"] > span").forEach(elm => {
//console.log(elm.innerText);
      elm.innerText = elm.innerText.replace(/.{4}(?=.+)/g, '$&\-');
    });
})();