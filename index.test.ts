import { assert } from 'console';
import {hello,FilesToPdf} from './index';
test('should say hello world', async() => {
    expect(hello('world')).toBe('hello world');
});

test('should merge pdfs',async() => {
    //arrange
    var filesToPdf = new FilesToPdf();
    var files = [
            './test/sample-files/sample-set-1/Sample Completed Verification Form.pdf',
            './test/sample-files/sample-set-1/Sample EPIC Report_Final Medical Diploma.pdf',
            './test/sample-files/sample-set-1/Physican Diploma Translation.JPG',
            './test/sample-files/sample-set-1/Verified_Final_Medical_Diploma.pdf'
    ];
    await filesToPdf.convertFiles(files, './test/temp', './test/temp/merged.pdf');
    assert(true);
})