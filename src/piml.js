function escapeHTMLEntities(str) {
    return str.replace(/&/g, "&amp;")
              .replace(/>/g, "&gt;")
              .replace(/</g, "&lt;");
}

function escapePIMLEntities(str) {
    return str.replace(/\\\*/g, "&ast;")
              .replace(/\\_/g, "&lowbar;")
              .replace(/\\\//g, "&sol;")
              .replace(/\\`/g, "&grave;");
}

/**
 * @function replaceNewlines
 *
 * @description Replace all newlines in a string with a <br/> element. This
 * ensures that multiline strings (e.g. from a textarea) all displayed correctly
 * in HTML
 *
 * @param {string} str
 *
 * @returns {string} a string with <br/> instead of newlines
 */
function replaceNewlines(str) {
    return str.replace(/\n/g, "<br/>");
}

function parse(str) {
    let res;

    res = escapeHTMLEntities(str);
    res = escapePIMLEntities(res);

    let markupCharsMap = {
        "/": "i",
        "_": "u",
        "*": "b",
        "`": "tt"
    };

    for (let markupChar in markupCharsMap) {
        let regex = new RegExp(`\\${markupChar}(.*?)\\${markupChar}`, "g");

        for (let match of res.matchAll(regex)) {
            let wholeMatch = match[0],
                capture = match[1];

            res = res.replace(
                `${wholeMatch}`,
                `<${markupCharsMap[markupChar]}>${capture}</${markupCharsMap[markupChar]}>`
            );
        }
    }

    res = replaceNewlines(res);

    return res;
}

export default {
    parse: parse
};
