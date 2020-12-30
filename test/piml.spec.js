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

    it("should escape '\\#'", () => {
        expect(PIML.parse("\\#")).to.equal("&num;");
    });

    it("should escape multiple '\\#'", () => {
        expect(PIML.parse("\\#\\#")).to.equal("&num;&num;");
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
        expect(PIML.parse("#FOO#")).to.equal("<i>FOO</i>");
    });

    it("should emphasize within a string", () => {
        expect(PIML.parse("FOO#BAR#BAZ")).to.equal("FOO<i>BAR</i>BAZ");
    });

    it("should emphasize at end of string", () => {
        expect(PIML.parse("FOO#BAR#")).to.equal("FOO<i>BAR</i>");
    });

    it("should emphasize multiple times", () => {
        expect(PIML.parse("#FOO#BAR#BAZ#")).to.equal("<i>FOO</i>BAR<i>BAZ</i>");
    });

    it("should ignore additional '#'s", () => {
        expect(PIML.parse("#FOO#BAR#")).to.equal("<i>FOO</i>BAR#");
    });

    it("should ignore escaped '#'s", () => {
        expect(PIML.parse("\\#FOO#BAR#")).to.equal("&num;FOO<i>BAR</i>");
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
});
