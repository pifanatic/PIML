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
              .replace(/\\\|/g, "&verbar;")
              .replace(/\\\-/g, "&hyphen;");
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

/**
 * @function parseUnorderedLists
 *
 * @description Replace lines starting with a dash ("-") with the HTML for an
 * unordered list (<ol><li>...</li></ol>)
 *
 * @param {string} str The string in which to replace the markdown
 *
 * @returns {string} A string that contains the HTML for unordered lists
 */
function parseUnorderedLists(str) {
    let regex = new RegExp(`^\- (.*)$`),
        hasListContext = false,
        lines = str.split("\n");

    lines = lines.map((line, index, array) => {
        let parsedLine = "",
            match = line.match(regex);

        if (match) {
            // start new list
            if (!hasListContext) {
                hasListContext = true;
                parsedLine += "<ul>\n";
            }

            parsedLine += `<li>${match[1]}</li>`;

            // add closing ul tag at end of input string
            if (index === array.length - 1) {
                parsedLine += "\n</ul>";
            }
        } else {
            // end of an list
            if (hasListContext) {
                hasListContext = false;
                parsedLine += "</ul>\n";
            }
            parsedLine += line;
        }

        return parsedLine;
    });

    return lines.join("\n");
}

function parse(str) {
    let res;

    res = escapeHTMLEntities(str);
    res = escapePIMLEntities(res);

    res = replacePairOfStringWithHTML(res, "/", "i");
    res = replacePairOfStringWithHTML(res, "_", "u");
    res = replacePairOfStringWithHTML(res, "*", "b");
    res = replacePairOfStringWithHTML(res, "```", "pre");
    res = replacePairOfStringWithHTML(res, "`", "tt");

    res = parseColor(res);

    res = parseUnorderedLists(res);

    return res;
}

export default {
    parse: parse
};
