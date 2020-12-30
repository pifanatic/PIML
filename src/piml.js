function parse(str) {
    let res = str.replace(/&/g, "&amp;")
                 .replace(/>/g, "&gt;")
                 .replace(/</g, "&lt;")
                 .replace(/\\\*/g, "&ast;");

    for (let match of res.matchAll(/\*(.*?)\*/g)) {
        let wholeMatch = match[0],
            capture = match[1];

        res = res.replace(`*${capture}*`, `<b>${capture}</b>`);
    }

    return res;
}

export default {
    parse: parse
};
