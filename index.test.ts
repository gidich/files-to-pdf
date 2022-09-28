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

test('Test3a: should merge buffer input 1 page pdfs from a given definition',async() => {
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
    await filesToPdf.convertFilesBufferInput(files, './test/temp', './test/temp/merged3a.pdf');
    //assert
    assert(true);
})

test.skip('Test3b: should merge buffer input epic 2 page pdfs from a given definition',async() => {
    //arrange
    let filesToPdf = new FilesToPdf();
    let files = [
            './test/sample-files/sample-set-1/408020 \'Carl Gustav Carus\' doc.tif',
            './test/sample-files/sample-set-1/Sample Completed Verification Form.pdf',
            './test/sample-files/sample-set-1/Sample EPIC Report_Final Medical Diploma.pdf',
            './test/sample-files/sample-set-1/Physican Diploma Translation.JPG',
            './test/sample-files/sample-set-1/Verified_Final_Medical_Diploma.pdf',
            './test/sample-files/sample-set-1/sample 1.pdf'
    ];
    //act
    await filesToPdf.convertFilesBufferInput(files, './test/temp', './test/temp/merged3b.pdf');
    //assert
    assert(true);
})

test('Test3b1: should merge buffer input epic 2 page pdfs from a given definition',async() => {
    //arrange
    let filesToPdf = new FilesToPdf();
    let files = [
            './test/sample-files/sample-set-1/408020 \'Carl Gustav Carus\' doc.tif',
            './test/sample-files/sample-set-1/Sample Completed Verification Form.pdf',
            './test/sample-files/sample-set-1/Sample EPIC Report_Final Medical Diploma.pdf',
            './test/sample-files/sample-set-1/Physican Diploma Translation.JPG',
            './test/sample-files/sample-set-1/Verified_Final_Medical_Diploma.pdf',
            './test/sample-files/sample-set-1/sample 1.pdf'
    ];
    //act
    await filesToPdf.convertFilesBufferInputLib(files, './test/temp', './test/temp/merged3b1.pdf');
    //assert
    assert(true);
})

test('Test3c: should merge buffer input internet 2 page pdfs from a given definition',async() => {
    //arrange
    let filesToPdf = new FilesToPdf();
    let files = [
            './test/sample-files/sample-set-1/408020 \'Carl Gustav Carus\' doc.tif',
            './test/sample-files/sample-set-1/Sample Completed Verification Form.pdf',
            './test/sample-files/sample-set-1/Sample EPIC Report_Final Medical Diploma.pdf',
            './test/sample-files/sample-set-1/Physican Diploma Translation.JPG',
            './test/sample-files/sample-set-1/Verified_Final_Medical_Diploma.pdf',
            './test/sample-files/sample-set-1/sample.pdf'
    ];
    //act
    await filesToPdf.convertFilesBufferInput(files, './test/temp', './test/temp/merged3c.pdf');
    //assert
    assert(true);
})

test('Test4: should convert tiffs', async() => {
    //arrange
    let filesToPdf = new FilesToPdf();
    
    await filesToPdf.tiffToJpeg('./test/sample-files/sample-set-1/649325.tif', './test/temp/649325 Monterrey doc4.jpg');
    assert(true);
})

test('Test5a: should merge file buffer input internet 2 page [1] pdfs from a given definition',async() => {
    //arrange
    let filesToPdf = new FilesToPdf();
    let files = [
            './test/sample-files/sample-set-1/408020 \'Carl Gustav Carus\' doc.tif',
            './test/sample-files/sample-set-1/Sample Completed Verification Form.pdf',
            './test/sample-files/sample-set-1/Sample EPIC Report_Final Medical Diploma.pdf',
            './test/sample-files/sample-set-1/Physican Diploma Translation.JPG',
            './test/sample-files/sample-set-1/Verified_Final_Medical_Diploma.pdf',
            './test/sample-files/sample-set-1/sample.pdf'
    ];
    //act
    await filesToPdf.convertFilesBufferInputPages(files, './test/temp', './test/temp/merged5a.pdf');
    //assert
    assert(true);
})

test('Test6a: should merge blob buffer input internet 2 page [1] pdfs from a given definition',async() => {
    //arrange
    let filesToPdf = new FilesToPdf();
    let files = [
        'Sample Completed Verification Form.pdf',
        'sample.pdf'
    ];
    //act
    await filesToPdf.convertFilesBlobInput1Page(files, './test/temp/merged6a.pdf');
    //assert
    assert(true);
})

test('Test7a: List blobs by index tag', async() => {
    //arrange
    let indexTagValue = '105535';
    let filesToPdf = new FilesToPdf();
    //act
    let blobs = await filesToPdf.listBlobsByIndexTag(indexTagValue);
    console.log(blobs.length);
    //assert
    assert(blobs.length == 3);    
})

test('Test7c: List blobs by index tag 106636', async() => {
    //arrange
    let indexTagValue = '106636';
    let filesToPdf = new FilesToPdf();
    //act
    let blobs = await filesToPdf.listBlobsByIndexTag(indexTagValue);
    console.log(blobs.length);
    //assert
    assert(blobs.length == 2);    
})

test('Test7d: List blobs by index tag 107737', async() => {
    //arrange
    let indexTagValue = '107737';
    let filesToPdf = new FilesToPdf();
    //act
    let blobs = await filesToPdf.listBlobsByIndexTag(indexTagValue);
    console.log(blobs.length);
    //assert
    assert(blobs.length == 2);    
})

test('Test7b: List blobs by index tag 108838', async() => {
    //arrange
    let indexTagValue = '108838';
    let filesToPdf = new FilesToPdf();
    //act
    let blobs = await filesToPdf.listBlobsByIndexTag(indexTagValue);
    console.log(blobs.length);
    //assert
    assert(blobs.length == 1);    
})