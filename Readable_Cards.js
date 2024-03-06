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
            let expire_date_td = elm.parentElement.nextElementSibling;
            expire_date_td.innerText = `${expire_date_td.innerText.slice(-2)}/${expire_date_td.innerText.slice(0,2)}`;
            expire_date_td.addEventListener('click', function(e) {
                let el = e.target;
                let auth_date = el.parentElement.children[12].innerText;
                let auth_amount = el.parentElement.children[7].innerText;
                let auth_num = el.parentElement.children[5].innerText;
                auth_num = auth_num.replaceAll('-', '');
                let last_four = auth_num.slice(-4);
                let cc_brand = '';
                switch (auth_num[0]) {
                    case '6': 
                        cc_brand = 'DS';
                        break;
                    case '5':
                        cc_brand = 'MC';
                        break;
                    case '4':
                        cc_brand = 'VS';
                        break;
                    case '3':
                        cc_brand = 'AM';
                        break;
                    default:
                        break;
                }
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