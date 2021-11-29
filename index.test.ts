import { assert } from 'console';
import {hello,FilesToPdf} from './index';
test('should say hello world', async() => {
    expect(hello('world')).toBe('hello world');
});

test('should merge pdfs',async() => {
    //arrange
    let filesToPdf = new FilesToPdf();
    let files = [
            './test/sample-files/sample-set-1/408020 \'Carl Gustav Carus\' doc.tif',
            './test/sample-files/sample-set-1/Sample Completed Verification Form.pdf',
            './test/sample-files/sample-set-1/Sample EPIC Report_Final Medical Diploma.pdf',
            './test/sample-files/sample-set-1/Physican Diploma Translation.JPG',
            './test/sample-files/sample-set-1/Verified_Final_Medical_Diploma.pdf'
    ];
    //act
    await filesToPdf.convertFiles(files, './test/temp', './test/temp/merged.pdf');
    //assert
    assert(true);
})


test('should convert tiffs', async() => {
    //arrange
    let filesToPdf = new FilesToPdf();
    
    await filesToPdf.tiffToJpeg('./test/sample-files/sample-set-1/649325.tif', './test/temp/649325 Monterrey doc.jpg');
    assert(true);
})