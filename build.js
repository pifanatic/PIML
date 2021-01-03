#!/usr/bin/env node
import Uglify from "uglify-es";
import fs     from "fs";

let pkg = JSON.parse(fs.readFileSync("./package.json"));

let code = fs.readFileSync("src/piml.js", "utf8");

let minifiedCode = Uglify.minify(code, {
    output: {
        preamble: `/* The PI Markup Language v${pkg.version} by ${pkg.author} */`
    }
});

if (!fs.existsSync("dist")) {
    fs.mkdirSync("dist")
}

fs.writeFileSync("dist/piml.min.js", minifiedCode.code);
