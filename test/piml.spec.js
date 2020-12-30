import PIML from "../src/piml.js";

describe("PIML", () => {
    it("should do nothing", () => {
        expect(PIML.parse("foo")).to.equal("foo");
    });
});
