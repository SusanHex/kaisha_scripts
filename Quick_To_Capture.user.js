// ==UserScript==
// @name         quick_to_capture
// @namespace    http://tampermonkey.net/
// @version      2024-03-19
// @description  Make navigating faster!
// @author       SusanHex
// @match        https://www.mreports.com/cbos/login.do*
// @run-at document-idle
// @grant        none
// ==/UserScript==

(function () {
  'use strict';
  const button_list = document.querySelector("#navMenu > ul:nth-child(2) > li:nth-child(1) > ul > li > ul");
  for (const button of button_list.children) {
    button.setAttribute('onclick', button.onclick.toString().replace('doAppSubmit', 'doAppSubmitNoPopUp'));
  }
})();
