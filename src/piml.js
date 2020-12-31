function escapeHTMLEntities(str) {
    return str.replace(/&/g, "&amp;")
              .replace(/>/g, "&gt;")
              .replace(/</g, "&lt;");
}

function parse(str) {
    let res;

    res = escapeHTMLEntities(str);

    res = res.replace(/\\\*/g, "&ast;")
             .replace(/\\_/g, "&lowbar;")
             .replace(/\\\//g, "&sol;");

    let markupCharsMap = {
        "/": "i",
        "_": "u",
        "*": "b"
    };

    for (let markupChar in markupCharsMap) {
        let regex = new RegExp(`\\${markupChar}(.*?)\\${markupChar}`, "g");

        for (let match of res.matchAll(regex)) {
            let wholeMatch = match[0],
                capture = match[1];

            res = res.replace(
                `${markupChar}${capture}${markupChar}`,
                `<${markupCharsMap[markupChar]}>${capture}</${markupCharsMap[markupChar]}>`
            );
        }
    }

    return res;
}

export default {
    parse: parse
};
