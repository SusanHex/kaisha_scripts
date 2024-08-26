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
  const nav_menu = document.getElementById('navMenu')
  const express_element = document.createElement('button');
  const capture_element = document.createElement('button');
  
  express_element.innerText = 'Express';
  express_element.setAttribute('onclick', "doAppSubmitNoPopUp('1','/spmod/login.do');");

  capture_element.innerText = 'Capture';
  capture_element.setAttribute('onclick', "doAppSubmitNoPopUp('4','/ac/login.do');");

  nav_menu.append(express_element);
  nav_menu.append(capture_element);
})();