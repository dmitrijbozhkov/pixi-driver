import * as assert from "assert";
import { LoaderHandler } from "../../lib/LoaderHandler";

describe("Loader tests", () => {
    let file: Blob;
    let url: string;
    let loader: LoaderHandler;
    beforeEach(() => {
        file = new Blob();
        url = URL.createObjectURL(file);
        loader = new LoaderHandler();
    });
    it("should pass", () => {
        assert.deepEqual(5 + 5, 10);
    });
});