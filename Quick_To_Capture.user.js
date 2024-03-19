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
  appSubmitForm.appid.value = '4';
  appSubmitForm.targetPage.value = '';
  appSubmitForm.url.value = '/ac/login.do';
  appSubmitForm.target = '';
  appSubmitForm.submit();
})();
