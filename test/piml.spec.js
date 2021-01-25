import PIML from "../src/piml.js";

describe("PIML", () => {
    it("should escape '&'", () => {
        expect(PIML.parse("&")).to.equal("&amp;");
    });

    it("should escape multiple '&'", () => {
        expect(PIML.parse("&&&")).to.equal("&amp;&amp;&amp;");
    });

    it("should escape '<'", () => {
        expect(PIML.parse("<")).to.equal("&lt;");
    });

    it("should escape multiple '<'", () => {
        expect(PIML.parse("<<<")).to.equal("&lt;&lt;&lt;");
    });

    it("should escape '>'", () => {
        expect(PIML.parse(">")).to.equal("&gt;");
    });

    it("should escape multiple '>'", () => {
        expect(PIML.parse(">>>")).to.equal("&gt;&gt;&gt;");
    });

    it("should escape a mix of '<', '>' and '&'", () => {
        expect(PIML.parse("<>&")).to.equal("&lt;&gt;&amp;")
    });

    it("should leave the reminder of the string intact", () => {
        expect(PIML.parse("FOO<BAR>BAZ&QRR")).to.equal("FOO&lt;BAR&gt;BAZ&amp;QRR");
    });

    it("should escape '\\*'", () => {
        expect(PIML.parse("\\*")).to.equal("&ast;");
    });

    it("should escape multiple '\\*'", () => {
        expect(PIML.parse("\\*\\*")).to.equal("&ast;&ast;");
    });

    it("should escape '\\_'", () => {
        expect(PIML.parse("\\_")).to.equal("&lowbar;");
    });

    it("should escape multiple '\\_'", () => {
        expect(PIML.parse("\\_\\_")).to.equal("&lowbar;&lowbar;");
    });

    it("should escape '\\/'", () => {
        expect(PIML.parse("\\/")).to.equal("&sol;");
    });

    it("should escape multiple '\\/'", () => {
        expect(PIML.parse("\\/\\/")).to.equal("&sol;&sol;");
    });

    it("should escape '\\`'", () => {
        expect(PIML.parse("\\`")).to.equal("&grave;");
    });

    it("should escape multiple '\\`'", () => {
        expect(PIML.parse("\\`\\`")).to.equal("&grave;&grave;");
    });

    it("should escape '\\['", () => {
        expect(PIML.parse("\\[")).to.equal("&lsqb;");
    });

    it("should escape multiple '\\['", () => {
        expect(PIML.parse("\\[\\[")).to.equal("&lsqb;&lsqb;");
    });

    it("should escape '\\]'", () => {
        expect(PIML.parse("\\]")).to.equal("&rsqb;");
    });

    it("should escape multiple '\\]'", () => {
        expect(PIML.parse("\\]\\]")).to.equal("&rsqb;&rsqb;");
    });

    it("should escape '\\|'", () => {
        expect(PIML.parse("\\|")).to.equal("&verbar;");
    });

    it("should escape multiple '\\|'", () => {
        expect(PIML.parse("\\|\\|")).to.equal("&verbar;&verbar;");
    });

    it("should apply boldface at start of string", () => {
        expect(PIML.parse("*FOO*")).to.equal("<b>FOO</b>");
    });

    it("should apply boldface within a string", () => {
        expect(PIML.parse("FOO*BAR*BAZ")).to.equal("FOO<b>BAR</b>BAZ");
    });

    it("should apply boldface at end of string", () => {
        expect(PIML.parse("FOO*BAR*")).to.equal("FOO<b>BAR</b>");
    });

    it("should apply boldface multiple times", () => {
        expect(PIML.parse("*FOO*BAR*BAZ*")).to.equal("<b>FOO</b>BAR<b>BAZ</b>");
    });

    it("should ignore additional '*'s", () => {
        expect(PIML.parse("*FOO*BAR*")).to.equal("<b>FOO</b>BAR*");
    });

    it("should ignore escaped '*'s", () => {
        expect(PIML.parse("\\*FOO*BAR*")).to.equal("&ast;FOO<b>BAR</b>");
    });

    it("should underline at start of string", () => {
        expect(PIML.parse("_FOO_")).to.equal("<u>FOO</u>");
    });

    it("should underline within a string", () => {
        expect(PIML.parse("FOO_BAR_BAZ")).to.equal("FOO<u>BAR</u>BAZ");
    });

    it("should underline at end of string", () => {
        expect(PIML.parse("FOO_BAR_")).to.equal("FOO<u>BAR</u>");
    });

    it("should underline multiple times", () => {
        expect(PIML.parse("_FOO_BAR_BAZ_")).to.equal("<u>FOO</u>BAR<u>BAZ</u>");
    });

    it("should ignore additional '_'s", () => {
        expect(PIML.parse("_FOO_BAR_")).to.equal("<u>FOO</u>BAR_");
    });

    it("should ignore escaped '_'s", () => {
        expect(PIML.parse("\\_FOO_BAR_")).to.equal("&lowbar;FOO<u>BAR</u>");
    });

    it("should emphasize at start of string", () => {
        expect(PIML.parse("/FOO/")).to.equal("<i>FOO</i>");
    });

    it("should emphasize within a string", () => {
        expect(PIML.parse("FOO/BAR/BAZ")).to.equal("FOO<i>BAR</i>BAZ");
    });

    it("should emphasize at end of string", () => {
        expect(PIML.parse("FOO/BAR/")).to.equal("FOO<i>BAR</i>");
    });

    it("should emphasize multiple times", () => {
        expect(PIML.parse("/FOO/BAR/BAZ/")).to.equal("<i>FOO</i>BAR<i>BAZ</i>");
    });

    it("should ignore additional '/'s", () => {
        expect(PIML.parse("/FOO/BAR/")).to.equal("<i>FOO</i>BAR/");
    });

    it("should ignore escaped '/'s", () => {
        expect(PIML.parse("\\/FOO/BAR/")).to.equal("&sol;FOO<i>BAR</i>");
    });

    it("should do monospace at start of string", () => {
        expect(PIML.parse("`FOO`")).to.equal("<tt>FOO</tt>");
    });

    it("should do monospace within a string", () => {
        expect(PIML.parse("FOO`BAR`BAZ")).to.equal("FOO<tt>BAR</tt>BAZ");
    });

    it("should do monospace at end of string", () => {
        expect(PIML.parse("FOO`BAR`")).to.equal("FOO<tt>BAR</tt>");
    });

    it("should do monospace multiple times", () => {
        expect(PIML.parse("`FOO`BAR`BAZ`")).to.equal("<tt>FOO</tt>BAR<tt>BAZ</tt>");
    });

    it("should ignore additional '`'s", () => {
        expect(PIML.parse("`FOO`BAR`")).to.equal("<tt>FOO</tt>BAR`");
    });

    it("should ignore escaped '`'s", () => {
        expect(PIML.parse("\\`FOO`BAR`")).to.equal("&grave;FOO<tt>BAR</tt>");
    });

    it("should insert pre at start of string", () => {
        expect(PIML.parse("```FOO```")).to.equal("<pre>FOO</pre>");
    });

    it("should insert pre within a string", () => {
        expect(PIML.parse("FOO```BAR```BAZ")).to.equal("FOO<pre>BAR</pre>BAZ");
    });

    it("should insert pre at end of string", () => {
        expect(PIML.parse("FOO```BAR```")).to.equal("FOO<pre>BAR</pre>");
    });

    it("should insert pre multiple times", () => {
        expect(PIML.parse("```FOO```BAR```BAZ```")).to.equal("<pre>FOO</pre>BAR<pre>BAZ</pre>");
    });

    it("should replace a additional '```' with <tt></tt>`", () => {
        expect(PIML.parse("```FOO```BAR```")).to.equal("<pre>FOO</pre>BAR<tt></tt>`");
    });

    it("should correctly parse multiple markup sequences", () => {
        expect(PIML.parse("FOO_BAR_*BAZ*QRR")).to.equal("FOO<u>BAR</u><b>BAZ</b>QRR");
    });

    it("should correctly parse multiple markup sequences while ignoring escaped markups", () => {
        expect(PIML.parse("FOO_\\_BAR_*B\\*AZ*QR_R_")).to.equal("FOO<u>&lowbar;BAR</u><b>B&ast;AZ</b>QR<u>R</u>");
    });

    it("should correctly handle intersected markup sequences", () => {
        expect(PIML.parse("*FOO_BAR*BAZ_QRR")).to.equal("<b>FOO<u>BAR</b>BAZ</u>QRR");
    });

    it("should apply markup across multiple lines", () => {
        expect(PIML.parse("*FOO\nBAR\nBAZ*")).to.equal("<b>FOO\nBAR\nBAZ</b>")
    });

    describe("color markup", () => {
        let validColors = ["aqua", "black", "blue", "fuchsia", "gray", "green",
                           "lime", "maroon", "navy", "olive", "purple", "red",
                           "silver", "teal", "white", "yellow"],
            invalidColors = ["not-a-color", "orange", "brown", "lightcoral",
                             "###", "#1236", "#ab2323ff"];

        it("should correctly apply a single color markup sequence", () => {
            expect(PIML.parse("[FOOBAR|color=red]")).to.equal("<span style=\"color: red;\">FOOBAR</span>");
        });

        it("should correctly apply multiple color markup sequences", () => {
            expect(PIML.parse("[FOOBAR|color=red] XXX [BAZQRR|color=blue]")).to.equal(
                "<span style=\"color: red;\">FOOBAR</span> XXX " +
                "<span style=\"color: blue;\">BAZQRR</span>");
        });

        it("should ignore empty color", () => {
            expect(PIML.parse("[FOOBAR|color=]")).to.equal("[FOOBAR|color=]");
        });

        it("should ignore malformed html color (too short)", () => {
            expect(PIML.parse("[FOOBAR|color=#12]")).to.equal("[FOOBAR|color=#12]");
        });

        it("should ignore malformed html color (too long)", () => {
            expect(PIML.parse("[FOOBAR|color=#1234567]")).to.equal("[FOOBAR|color=#1234567]");
        });

        it("should ignore malformed html color (invalid hex)", () => {
            expect(PIML.parse("[FOOBAR|color=#12GG12]")).to.equal("[FOOBAR|color=#12GG12]");
        });

        it("should accept valid html colors", () => {
            expect(PIML.parse("[FOOBAR|color=#123456]")).to.equal("<span style=\"color: #123456;\">FOOBAR</span>");
        });

        validColors.forEach(color => {
            it(`should accept ${color}`, () => {
                expect(PIML.parse(`[FOO|color=${color}]`))
                .to.equal(`<span style="color: ${color};">FOO</span>`);
            });
        });

        invalidColors.forEach(color => {
            it(`should not accept ${color}`, () => {
                expect(PIML.parse(`[FOO|color=${color}]`)).to.equal(`[FOO|color=${color}]`);
            });
        });
    });
});
