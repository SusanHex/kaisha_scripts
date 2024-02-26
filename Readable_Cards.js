// ==UserScript==
// @name         Readable Cards
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Susan H
// @match        https://www.mreports.com/ac/authInquiry.do
// @icon         https://www.google.com/s2/favicons?sz=64&domain=mreports.com
// @grant        GM_setClipboard
// @grant        GM_notification
// ==/UserScript==

(function() {
    'use strict';

    document.querySelectorAll('td[width=\"10%\"] > span').forEach(elm => {
        if (elm.parentElement.parentElement.childElementCount === 17) {
            elm.innerText = elm.innerText.replace(/.{4}(?=.+)/g, '$&\-');
            elm.parentElement.nextElementSibling.addEventListener('click', function(e) {
                let el = e.target;
                let auth_date = el.parentElement.children[12].innerText;
                let auth_amount = el.parentElement.children[7].innerText;
                let auth_num = el.parentElement.children[5].innerText;
                auth_num = auth_num.replaceAll('-', '');
                let last_four = auth_num.slice(-4);
                let cc_brand = '';
                if (auth_num[0] === '6') {
                    cc_brand = 'DS';
                }
                else if (auth_num[0] === '5') {
                    cc_brand = 'MC';
                }
                else if (auth_num[0] === '4') {
                    cc_brand = 'VS';
                }
                else if (auth_num[0] === '3') {
                    cc_brand = 'AM';
                };
                GM_setClipboard(`${auth_date} \$${auth_amount} ${cc_brand}#${last_four}`, 'text', () => console.log('Coppied to clipboard'));
                GM_notification({
                    text: `${auth_date} \$${auth_amount} ${cc_brand}#${last_four}`,
                    title: 'Copied',
                    },
                );
            });
        };
    });
})();