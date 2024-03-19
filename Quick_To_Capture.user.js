// ==UserScript==
// @name         quick_to_capture
// @namespace    http://tampermonkey.net/
// @version      2024-03-19
// @description  Make navigating faster!
// @author       SusanHex
// @match        https://www.mreports.com/cbos/login.do*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';
  appSubmitForm.target = '';
  appSubmitForm.submit();
})();
