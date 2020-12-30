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
});
