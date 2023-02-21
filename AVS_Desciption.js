// ==UserScript==
// @name         AVS_Desciption
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  A script to add title text over the AVS values with what they mean.
// @author       Susan H
// @match        https://translink.transfirst.com/content/MerchantReports/MerchantAuthorization.aspx*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=transfirst.com
// @grant        none
// @run-at document-end
// ==/UserScript==

(function () {
    'use strict';
    const avs_codes = {
        "3": {
            "Y": "Address & ZIP match",
            "A": "Address only matches",
            "S": "AVS not supported",
            "R": "System unavailable, retry",
            "U": "Information not available",
            "Z": "ZIP code only matches",
            "N": "Neither ZIP nor address match"
        },
        "4": {
            "Y": "Address & 5-digit or 9-digit ZIP match",
            "A": "Address matches, ZIP does not",
            "S": "AVS not supported",
            "R": "System unavailable, retry",
            "U": "Information not available",
            "Z": "Either 5-digit or 9-digit ZIP match, address does not",
            "N": "Neither ZIP nor address match",
            "B": "Address matches, ZIP not verified",
            "P": "ZIP matches, address not verified",
            "C": "Address and ZIP not verified"
        },
        "5": {
            "Y": "Address & 5-digit ZIP match",
            "A": "Address matches, ZIP does not",
            "S": "AVS not supported",
            "R": "System unavailable, retry",
            "U": "Information not available",
            "Z": "5-digit ZIP matches, address does not",
            "N": "Neither ZIP nor address match",
            "W": "For U.S., 9-digit ZIP matches, address does not. For non-U.S., ZIP matches, address does not",
            "X": "For U.S., all digits match. For non-U.S., ZIP and address match."
        },
        "6": {
            "Y": "Address only matches",
            "A": "Address & 5-digit ZIP match",
            "S": "AVS not supported",
            "U": "System unavailable, retry",
            "Z": "5-digit ZIP matches, address does not",
            "N": "Neither ZIP nor address match",
            "W": "Information not available",
            "X": "Address & 9-digit ZIP match",
            "T": "9-digit ZIP matches, address does not"
        }
    };

    // Your code here...

    for (const tr of Array.from(document.getElementById("dgAuthorization").children[0].children).slice(1, -1)) {
        // base variables that will be used
        let card_first_digit = tr.children[7].children[0].innerText[0];
        let avs_td = tr.children[15];
        let avs_code = avs_td.innerText;
        let brand_avs_codes = avs_codes[card_first_digit];
        // go through all auth entries and see if any have avs. If they do, add title attribute with meaning
        if (brand_avs_codes) {
            let avs_code_description = brand_avs_codes[avs_code];
            if (avs_code_description) {
                avs_td.title = avs_code_description;
            } 
        }
    }
})();