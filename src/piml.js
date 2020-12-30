function parse(str) {
    return str.replace(/&/g, "&amp;")
                 .replace(/>/g, "&gt;")
                 .replace(/</g, "&lt;")
                 .replace(/\\\*/g, "&ast;");
}

export default {
    parse: parse
};
