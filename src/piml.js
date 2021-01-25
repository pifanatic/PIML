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

/**
 * @function replacePairOfStringWithHTML
 *
 * @description Replace each pair of a given string with a given HTML tag while
 * maintaining the enclosed text sequence.
 *
 * E.g. "*foobar*" => "<b>foobar</b>"
 *
 * Will leave the last occurrence of the given string untouched if the total
 * number of occurrences of this string is a odd number.
 *
 * @param {string} str The string in which to replace the markdown
 * @param {string} replacedString A single part of the pair of strings that will
 * be replaced
 * @param {string} tagName The name of the HTML tag that replaces the markdown
 *
 * @returns {string} A string where each pair of a given string is replaced by
 * the given HTML tag
 */
function replacePairOfStringWithHTML(str, replacedString, tagName) {
    let regex = new RegExp(`\\${replacedString}(.*?)\\${replacedString}`, "gs");

    for (let match of str.matchAll(regex)) {
        let wholeMatch = match[0],
            capture = match[1];

        str = str.replace(
            `${wholeMatch}`,
            `<${tagName}>${capture}</${tagName}>`
        );
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
        res = replacePairOfStringWithHTML(res, markupChar, markupCharsMap[markupChar]);
    }

    res = parseColor(res);
    res = replaceNewlines(res);

    return res;
}

export default {
    parse: parse
};
