// ==UserScript==
// @name         Auth Desc
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Script to replace the auth code with a more human friendly description
// @author       Susan H
// @match        https://www.mreports.com/ac/authDetail.do
// @icon         https://www.google.com/s2/favicons?sz=64&domain=mreports.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    let codeTable = {
        "00": "Approval",
        "85": "Approval",
        "01": "Declined - Call Issuer",
        "04": "Declined - Pick Up Card",
        "05": "Declined - Do Not Honor",
        "10": "Declined - Partial Approval",
        "12": "Declined - Invalid Transaction",
        "13": "Declined - Card Amount Invalid",
        "14": "Declined - Card Number Invalid",
        "15": "Declined - No Such Issuer",
        "19": "Declined - Re-Enter",
        "51": "Declined - Insufficient Funds",
        "54": "Declined - Card Expired",
        "55": "Declined - Wrong PIN Entered by Card Holder",
        "57": "Declined - Service Not Allowed",
        "61": "Declined - Customer Exceeds Withdrawal Limit",
        "62": "Declined - Restricted SIC Code",
        "63": "Declined - Restricted",
        "65": "Declined - Customer Exceeds Activity Limit",
        "78": "Declined - No Account",
        "97": "Declined - CVV MisMatch",
    }
    let tableRows = document.getElementsByTagName("tr");
    for (let tr of tableRows) {
        if (tr.textContent.includes("Auth Response Code:") && tr.children.length > 2) {
            let code = tr.children[1].innerText;
            console.log(code);
            tr.children[1].innerText = code + " " + codeTable[code];
            }
    }
    // Your code here...
})();