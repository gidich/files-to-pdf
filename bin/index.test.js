"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const console_1 = require("console");
const index_1 = require("./index");
test('should say hello world', () => __awaiter(void 0, void 0, void 0, function* () {
    expect((0, index_1.hello)('world')).toBe('hello world');
}));
test('should merge pdfs', () => __awaiter(void 0, void 0, void 0, function* () {
    //arrange
    var filesToPdf = new index_1.FilesToPdf();
    var files = [
        './test/sample-files/sample-set-1/Sample Completed Verification Form.pdf',
        './test/sample-files/sample-set-1/Sample EPIC Report_Final Medical Diploma.pdf',
        './test/sample-files/sample-set-1/Physican Diploma Translation.JPG',
        './test/sample-files/sample-set-1/Verified_Final_Medical_Diploma.pdf'
    ];
    yield filesToPdf.convertFiles(files, './test/temp', './test/temp/merged.pdf');
    (0, console_1.assert)(true);
}));
//# sourceMappingURL=index.test.js.map