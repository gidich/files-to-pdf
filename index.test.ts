import { assert } from 'console';
import {FilesToPdf} from './index';


test('Test1: should merge pdfs from a given definition',async() => {
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
    await filesToPdf.convertFiles(files, './test/temp', './test/temp/merged1.pdf');
    //assert
    assert(true);
})

test('Test2: should merge buffer pdfs from a given definition',async() => {
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
    await filesToPdf.convertFilesBuffer(files, './test/temp', './test/temp/merged2.pdf');
    //assert
    assert(true);
})

test('Test3: should merge buffer input pdfs from a given definition',async() => {
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
    await filesToPdf.convertFilesBufferInput(files, './test/temp', './test/temp/merged3.pdf');
    //assert
    assert(true);
})

test('Test4: should convert tiffs', async() => {
    //arrange
    let filesToPdf = new FilesToPdf();
    
    await filesToPdf.tiffToJpeg('./test/sample-files/sample-set-1/649325.tif', './test/temp/649325 Monterrey doc4.jpg');
    assert(true);
})