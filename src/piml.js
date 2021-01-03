function escapeHTMLEntities(str) {
    return str.replace(/&/g, "&amp;")
              .replace(/>/g, "&gt;")
              .replace(/</g, "&lt;");
}

function escapePIMLEntities(str) {
    return str.replace(/\\\*/g, "&ast;")
              .replace(/\\_/g, "&lowbar;")
              .replace(/\\\//g, "&sol;")
              .replace(/\\`/g, "&grave;")
              .replace(/\\\[/g, "&lsqb;")
              .replace(/\\\]/g, "&rsqb;")
              .replace(/\\\|/g, "&verbar;");
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


/**
 * @function parseColor
 *
 * @description Parse and replace color markup sequences.
 *
 * A correctly formatted color markup looks like "[Lorem Ipsum...|color=red]".
 * The color parameter accepts CSS-like values (e.g. 'red' or 'blue') or HTML
 * style color names (e.g. #000080).
 *
 * @param {string} str
 *
 * @returns {string} a string which has all color markup sequences replaced with
 * a <span style="color"=...> element.
 */
function parseColor(str) {
    let validColors = "aqua|black|blue|fuchsia|gray|green|lime|maroon|navy" +
                      "|olive|purple|red|silver|teal|white|yellow";

    let regex = new RegExp(`\\[(.*?)\\|color=(${validColors}|#[A-Fa-f0-9]{6})\\]`, "g");

    for (let match of str.matchAll(regex)) {
        let wholeMatch = match[0],
            capture = match[1],
            color = match[2];

        str = str.replace(wholeMatch, `<span style="color: ${color};">${capture}</span>`);
    }

    return str;
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
        let regex = new RegExp(`\\${markupChar}(.*?)\\${markupChar}`, "gs");

        for (let match of res.matchAll(regex)) {
            let wholeMatch = match[0],
                capture = match[1];

            res = res.replace(
                `${wholeMatch}`,
                `<${markupCharsMap[markupChar]}>${capture}</${markupCharsMap[markupChar]}>`
            );
        }
    }

    res = parseColor(res);
    res = replaceNewlines(res);

    return res;
}

export default {
    parse: parse
};
