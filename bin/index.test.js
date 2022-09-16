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
test('Test1: should merge pdfs from a given definition', () => __awaiter(void 0, void 0, void 0, function* () {
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
    yield filesToPdf.convertFiles(files, './test/temp', './test/temp/merged1.pdf');
    //assert
    (0, console_1.assert)(true);
}));
test('Test2: should merge buffer pdfs from a given definition', () => __awaiter(void 0, void 0, void 0, function* () {
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
    yield filesToPdf.convertFilesBuffer(files, './test/temp', './test/temp/merged2.pdf');
    //assert
    (0, console_1.assert)(true);
}));
test('Test3a: should merge buffer input 1 page pdfs from a given definition', () => __awaiter(void 0, void 0, void 0, function* () {
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
    yield filesToPdf.convertFilesBufferInput(files, './test/temp', './test/temp/merged3a.pdf');
    //assert
    (0, console_1.assert)(true);
}));
test('Test3b: should merge buffer input epic 2 page pdfs from a given definition', () => __awaiter(void 0, void 0, void 0, function* () {
    //arrange
    let filesToPdf = new index_1.FilesToPdf();
    let files = [
        './test/sample-files/sample-set-1/408020 \'Carl Gustav Carus\' doc.tif',
        './test/sample-files/sample-set-1/Sample Completed Verification Form.pdf',
        './test/sample-files/sample-set-1/Sample EPIC Report_Final Medical Diploma.pdf',
        './test/sample-files/sample-set-1/Physican Diploma Translation.JPG',
        './test/sample-files/sample-set-1/Verified_Final_Medical_Diploma.pdf',
        './test/sample-files/sample-set-1/sample 1.pdf'
    ];
    //act
    yield filesToPdf.convertFilesBufferInput(files, './test/temp', './test/temp/merged3b.pdf');
    //assert
    (0, console_1.assert)(true);
}));
test('Test3c: should merge buffer input internet 2 page pdfs from a given definition', () => __awaiter(void 0, void 0, void 0, function* () {
    //arrange
    let filesToPdf = new index_1.FilesToPdf();
    let files = [
        './test/sample-files/sample-set-1/408020 \'Carl Gustav Carus\' doc.tif',
        './test/sample-files/sample-set-1/Sample Completed Verification Form.pdf',
        './test/sample-files/sample-set-1/Sample EPIC Report_Final Medical Diploma.pdf',
        './test/sample-files/sample-set-1/Physican Diploma Translation.JPG',
        './test/sample-files/sample-set-1/Verified_Final_Medical_Diploma.pdf',
        './test/sample-files/sample-set-1/sample.pdf'
    ];
    //act
    yield filesToPdf.convertFilesBufferInput(files, './test/temp', './test/temp/merged3c.pdf');
    //assert
    (0, console_1.assert)(true);
}));
test('Test4: should convert tiffs', () => __awaiter(void 0, void 0, void 0, function* () {
    //arrange
    let filesToPdf = new index_1.FilesToPdf();
    yield filesToPdf.tiffToJpeg('./test/sample-files/sample-set-1/649325.tif', './test/temp/649325 Monterrey doc4.jpg');
    (0, console_1.assert)(true);
}));
test('Test5a: should merge file buffer input internet 2 page [1] pdfs from a given definition', () => __awaiter(void 0, void 0, void 0, function* () {
    //arrange
    let filesToPdf = new index_1.FilesToPdf();
    let files = [
        './test/sample-files/sample-set-1/408020 \'Carl Gustav Carus\' doc.tif',
        './test/sample-files/sample-set-1/Sample Completed Verification Form.pdf',
        './test/sample-files/sample-set-1/Sample EPIC Report_Final Medical Diploma.pdf',
        './test/sample-files/sample-set-1/Physican Diploma Translation.JPG',
        './test/sample-files/sample-set-1/Verified_Final_Medical_Diploma.pdf',
        './test/sample-files/sample-set-1/sample.pdf'
    ];
    //act
    yield filesToPdf.convertFilesBufferInputPages(files, './test/temp', './test/temp/merged5a.pdf');
    //assert
    (0, console_1.assert)(true);
}));
test('Test6a: should merge blob buffer input internet 2 page [1] pdfs from a given definition', () => __awaiter(void 0, void 0, void 0, function* () {
    //arrange
    let filesToPdf = new index_1.FilesToPdf();
    let files = [
        'Sample Completed Verification Form.pdf',
        'sample.pdf'
    ];
    //act
    yield filesToPdf.convertFilesBlobInput1Page(files, './test/temp/merged6a.pdf');
    //assert
    (0, console_1.assert)(true);
}));
//# sourceMappingURL=index.test.js.map