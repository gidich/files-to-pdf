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
    let filesToPdf = new index_1.FilesToPdf();
    let files = [
        './test/sample-files/sample-set-1/408020 \'Carl Gustav Carus\' doc.tif',
        './test/sample-files/sample-set-1/Sample Completed Verification Form.pdf',
        './test/sample-files/sample-set-1/Sample EPIC Report_Final Medical Diploma.pdf',
        './test/sample-files/sample-set-1/Physican Diploma Translation.JPG',
        './test/sample-files/sample-set-1/Verified_Final_Medical_Diploma.pdf'
    ];
    //act
    yield filesToPdf.convertFiles(files, './test/temp', './test/temp/merged.pdf');
    //assert
    (0, console_1.assert)(true);
}));
test('should convert tiffs', () => __awaiter(void 0, void 0, void 0, function* () {
    //arrange
    let filesToPdf = new index_1.FilesToPdf();
    yield filesToPdf.tiffToJpeg('./test/sample-files/sample-set-1/649325.tif', './test/temp/649325 Monterrey doc.jpg');
    (0, console_1.assert)(true);
}));
//# sourceMappingURL=index.test.js.map