// ==UserScript==
// @name         MID_Former
// @namespace    http://tampermonkey.net/
// @version      2025-02-25
// @description  Helps form mids
// @author       You
// @match        https://www.mreports.com/ac/authInquiry.do
// @icon         https://www.google.com/s2/favicons?sz=64&domain=mreports.com
// @grant        none
// ==/UserScript==
(function() {
    'use strict';
    window.former = () => {
        const replacement_token = "$$"
        let patterns = [
            {
                "pattern": /543684(?<subsection>\d{10})/g,
                "insert_string": `000${replacement_token}00`,
                "index": 19
            },
            {
                "pattern": /39(?<subsection>\d{12})/g,
                "insert_string": `000${replacement_token}`,
                "index": 18
            },
            {
                "pattern": /(?<subsection>323\d{7})/g,
                "insert_string": `000${replacement_token}00`,
                "index": 18
            },
            {
                "pattern": /41(?<subsection>\d{12})/g,
                "insert_string": `000${replacement_token}`,
                "index": 36
            }
        ]; 
        let input_value = document.getElementById("mid").value;
        for (let pattern of patterns) {
            let result = pattern.pattern.exec(input_value);
            if (result) {
                console.log("pattern matched");
                document.querySelector("body > content > table:nth-child(5) > tbody > tr > td > table:nth-child(2) > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(4) > td > table > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(2) > td:nth-child(2) > input[type=text]").value = pattern.insert_string.replace(replacement_token, result[1]);
                document.querySelector("body > content > table:nth-child(5) > tbody > tr > td > table:nth-child(2) > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(4) > td > table > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(2) > td:nth-child(1) > select").selectedIndex = pattern.index;
                document.querySelector("body > content > table:nth-child(5) > tbody > tr > td > table:nth-child(2) > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(4) > td > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(2) > td:nth-child(6) > span > img").click();
                return;
            }
        }
        document.getElementById("mid").classList.add("redbox");
    };
    let input_element = document.createElement("input");
    input_element.type = "number";
    input_element.id = "mid";
    input_element.addEventListener("change", former);
    document.querySelector("body > content > table:nth-child(5) > tbody > tr > td > table:nth-child(2) > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr > td.bluebanner").appendChild(input_element)
})();