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

test('Test3b1-prod: should merge buffer input epic 2 page pdfs from a given definition',async() => {
    //arrange
    let filesToPdf = new FilesToPdf();
    let files = [
            './test/sample-files/sample-set-1/e198fa84-525c-4c4c-b6de-1b642c9c9c29.tiff',
            './test/sample-files/sample-set-1/Sample Completed Verification Form.pdf',
            './test/sample-files/sample-set-1/Sample EPIC Report_Final Medical Diploma.pdf',
            './test/sample-files/sample-set-1/Physican Diploma Translation.JPG',
            './test/sample-files/sample-set-1/Verified_Final_Medical_Diploma.pdf',
            './test/sample-files/sample-set-1/sample 1.pdf'
    ];
    //act
    await filesToPdf.convertFilesBufferInputLib(files, './test/temp', './test/temp/merged3b1-prod.pdf');
    //assert
    assert(true);
})

test.skip('Deep TIFF LZW Analysis', async() => {
    const fs = require('fs');
    
    const workingFile = './test/sample-files/sample-set-1/408020 \'Carl Gustav Carus\' doc.tif';
    const problematicFile = './test/sample-files/sample-set-1/e198fa84-525c-4c4c-b6de-1b642c9c9c29.tiff';
    
    function deepAnalyzeTiffFile(filePath: string) {
        const buffer = fs.readFileSync(filePath);
        
        console.log(`\n=== Deep Analysis of ${filePath} ===`);
        
        // Check TIFF header
        const byteOrder = buffer.slice(0, 2).toString('ascii');
        const isLittleEndian = byteOrder === 'II';
        const readUInt16 = isLittleEndian ? buffer.readUInt16LE.bind(buffer) : buffer.readUInt16BE.bind(buffer);
        const readUInt32 = isLittleEndian ? buffer.readUInt32LE.bind(buffer) : buffer.readUInt32BE.bind(buffer);
        
        const firstIFDOffset = readUInt32(4);
        
        // Parse IFD entries
        let offset = firstIFDOffset;
        const numEntries = readUInt16(offset);
        
        let compressionType = null;
        let stripOffsets = [];
        let stripByteCounts = [];
        let rowsPerStrip = null;
        let imageWidth = null;
        let imageHeight = null;
        let bitsPerSample = null;
        let samplesPerPixel = null;
        
        for (let i = 0; i < numEntries; i++) {
            const entryOffset = offset + 2 + (i * 12);
            const tag = readUInt16(entryOffset);
            const dataType = readUInt16(entryOffset + 2);
            const count = readUInt32(entryOffset + 4);
            const valueOffset = readUInt32(entryOffset + 8);
            
            switch (tag) {
                case 256: // ImageWidth
                    imageWidth = count === 1 ? (dataType === 3 ? (valueOffset & 0xFFFF) : valueOffset) : valueOffset;
                    break;
                case 257: // ImageLength
                    imageHeight = count === 1 ? (dataType === 3 ? (valueOffset & 0xFFFF) : valueOffset) : valueOffset;
                    break;
                case 258: // BitsPerSample
                    bitsPerSample = count === 1 ? (dataType === 3 ? (valueOffset & 0xFFFF) : valueOffset) : valueOffset;
                    break;
                case 259: // Compression
                    compressionType = count === 1 ? (dataType === 3 ? (valueOffset & 0xFFFF) : valueOffset) : valueOffset;
                    break;
                case 273: // StripOffsets
                    if (count === 1) {
                        stripOffsets = [valueOffset];
                    } else {
                        // Multiple strips - read from the offset
                        for (let j = 0; j < count; j++) {
                            const stripOffset = readUInt32(valueOffset + (j * 4));
                            stripOffsets.push(stripOffset);
                        }
                    }
                    break;
                case 277: // SamplesPerPixel
                    samplesPerPixel = count === 1 ? (dataType === 3 ? (valueOffset & 0xFFFF) : valueOffset) : valueOffset;
                    break;
                case 278: // RowsPerStrip
                    rowsPerStrip = count === 1 ? (dataType === 3 ? (valueOffset & 0xFFFF) : valueOffset) : valueOffset;
                    break;
                case 279: // StripByteCounts
                    if (count === 1) {
                        stripByteCounts = [valueOffset];
                    } else {
                        // Multiple strips - read from the offset
                        for (let j = 0; j < count; j++) {
                            const byteCount = readUInt32(valueOffset + (j * 4));
                            stripByteCounts.push(byteCount);
                        }
                    }
                    break;
            }
        }
        
        console.log('Image dimensions:', imageWidth, 'x', imageHeight);
        console.log('Bits per sample:', bitsPerSample);
        console.log('Samples per pixel:', samplesPerPixel);
        console.log('Compression type:', compressionType, '(LZW)');
        console.log('Rows per strip:', rowsPerStrip);
        console.log('Number of strips:', stripOffsets.length);
        console.log('Strip offsets:', stripOffsets.slice(0, 5), stripOffsets.length > 5 ? '...' : '');
        console.log('Strip byte counts:', stripByteCounts.slice(0, 5), stripByteCounts.length > 5 ? '...' : '');
        
        // Analyze first few LZW strips
        console.log('\n--- LZW Strip Analysis ---');
        for (let i = 0; i < Math.min(3, stripOffsets.length); i++) {
            const stripOffset = stripOffsets[i];
            const stripByteCount = stripByteCounts[i];
            
            console.log(`Strip ${i}: offset=${stripOffset}, size=${stripByteCount} bytes`);
            
            // Read first 32 bytes of LZW data
            const stripData = buffer.slice(stripOffset, stripOffset + Math.min(32, stripByteCount));
            console.log(`First 32 bytes (hex):`, stripData.toString('hex'));
            
            // Analyze LZW stream structure
            analyzeLZWStream(stripData, stripByteCount, i);
        }
        
        return {
            imageWidth,
            imageHeight,
            bitsPerSample,
            samplesPerPixel,
            rowsPerStrip,
            stripOffsets,
            stripByteCounts,
            buffer
        };
    }
    
    function analyzeLZWStream(data: Buffer, totalSize: number, stripIndex: number) {
        console.log(`  LZW Stream Analysis for Strip ${stripIndex}:`);
        
        // LZW typically starts with clear code (256 for 8-bit data)
        // Read first few codes
        let bitPosition = 0;
        let currentCodeSize = 9; // LZW typically starts with 9-bit codes
        
        function readBits(bits: number): number {
            const byteOffset = Math.floor(bitPosition / 8);
            const bitOffset = bitPosition % 8;
            
            if (byteOffset >= data.length) return -1;
            
            let value = 0;
            let bitsRead = 0;
            
            while (bitsRead < bits && byteOffset + Math.floor((bitOffset + bitsRead) / 8) < data.length) {
                const currentByte = data[byteOffset + Math.floor((bitOffset + bitsRead) / 8)];
                const currentBitInByte = (bitOffset + bitsRead) % 8;
                const bitsFromThisByte = Math.min(8 - currentBitInByte, bits - bitsRead);
                
                const mask = (1 << bitsFromThisByte) - 1;
                const shifted = (currentByte >> currentBitInByte) & mask;
                value |= shifted << bitsRead;
                
                bitsRead += bitsFromThisByte;
            }
            
            bitPosition += bits;
            return value;
        }
        
        // Read first few LZW codes
        const codes = [];
        for (let i = 0; i < 10 && bitPosition < data.length * 8 - currentCodeSize; i++) {
            const code = readBits(currentCodeSize);
            if (code === -1) break;
            codes.push(code);
            
            // LZW code size increases when table gets full
            if (code === 257) { // Typically the "increase code size" signal
                currentCodeSize++;
                console.log(`    Code size increased to ${currentCodeSize} at position ${i}`);
            }
        }
        
        console.log(`    First 10 LZW codes (${currentCodeSize}-bit):`, codes);
        console.log(`    Clear code (256) present:`, codes.includes(256));
        console.log(`    End of info code (257) present:`, codes.includes(257));
        console.log(`    Total strip size: ${totalSize} bytes`);
        
        // Check for potential issues
        if (codes.length === 0) {
            console.log(`    ⚠️  WARNING: Could not read any LZW codes from strip ${stripIndex}`);
        }
        if (!codes.includes(256)) {
            console.log(`    ⚠️  WARNING: No clear code (256) found in first 10 codes`);
        }
    }
    
    console.log('Analyzing working TIFF file...');
    const workingAnalysis = deepAnalyzeTiffFile(workingFile);
    
    console.log('\nAnalyzing problematic TIFF file...');
    const problematicAnalysis = deepAnalyzeTiffFile(problematicFile);
    
    // Compare the two files
    console.log('\n=== COMPARISON ===');
    console.log('Image size comparison:');
    console.log(`  Working: ${workingAnalysis.imageWidth}x${workingAnalysis.imageHeight}`);
    console.log(`  Problematic: ${problematicAnalysis.imageWidth}x${problematicAnalysis.imageHeight}`);
    
    console.log('Strip count comparison:');
    console.log(`  Working: ${workingAnalysis.stripOffsets.length} strips`);
    console.log(`  Problematic: ${problematicAnalysis.stripOffsets.length} strips`);
    
    console.log('Rows per strip comparison:');
    console.log(`  Working: ${workingAnalysis.rowsPerStrip}`);
    console.log(`  Problematic: ${problematicAnalysis.rowsPerStrip}`);
    
    // Calculate expected vs actual strip sizes
    console.log('Strip size analysis:');
    const workingExpectedBytesPerRow = Math.ceil((workingAnalysis.imageWidth * workingAnalysis.bitsPerSample) / 8);
    const problematicExpectedBytesPerRow = Math.ceil((problematicAnalysis.imageWidth * problematicAnalysis.bitsPerSample) / 8);
    
    console.log(`  Working expected bytes per row: ${workingExpectedBytesPerRow}`);
    console.log(`  Problematic expected bytes per row: ${problematicExpectedBytesPerRow}`);
});

test.skip('Debug TIFF compression differences', async() => {
    const fs = require('fs');
    
    const workingFile = './test/sample-files/sample-set-1/408020 \'Carl Gustav Carus\' doc.tif';
    const problematicFile = './test/sample-files/sample-set-1/e198fa84-525c-4c4c-b6de-1b642c9c9c29.tiff';
    
    // Function to read TIFF headers and extract compression info
    function analyzeTiffFile(filePath: string) {
        const buffer = fs.readFileSync(filePath);
        
        console.log(`\n=== Analysis of ${filePath} ===`);
        console.log('File size:', buffer.length, 'bytes');
        console.log('First 16 bytes (hex):', buffer.slice(0, 16).toString('hex'));
        
        // Check TIFF header
        const byteOrder = buffer.slice(0, 2).toString('ascii');
        console.log('Byte order:', byteOrder === 'II' ? 'Little Endian (Intel)' : 'Big Endian (Motorola)');
        
        // Read magic number
        const magicNumber = byteOrder === 'II' ? buffer.readUInt16LE(2) : buffer.readUInt16BE(2);
        console.log('Magic number:', magicNumber, magicNumber === 42 ? '(Valid TIFF)' : '(Invalid)');
        
        // Read first IFD offset
        const firstIFDOffset = byteOrder === 'II' ? buffer.readUInt32LE(4) : buffer.readUInt32BE(4);
        console.log('First IFD offset:', firstIFDOffset);
        
        // Try to find compression tag (tag 259)
        try {
            let offset = firstIFDOffset;
            const numEntries = byteOrder === 'II' ? buffer.readUInt16LE(offset) : buffer.readUInt16BE(offset);
            console.log('Number of directory entries:', numEntries);
            
            for (let i = 0; i < numEntries; i++) {
                const entryOffset = offset + 2 + (i * 12);
                const tag = byteOrder === 'II' ? buffer.readUInt16LE(entryOffset) : buffer.readUInt16BE(entryOffset);
                
                if (tag === 259) { // Compression tag
                    const dataType = byteOrder === 'II' ? buffer.readUInt16LE(entryOffset + 2) : buffer.readUInt16BE(entryOffset + 2);
                    const count = byteOrder === 'II' ? buffer.readUInt32LE(entryOffset + 4) : buffer.readUInt32BE(entryOffset + 4);
                    const value = byteOrder === 'II' ? buffer.readUInt32LE(entryOffset + 8) : buffer.readUInt32BE(entryOffset + 8);
                    
                    const compressionType = count === 1 && dataType === 3 ? (value & 0xFFFF) : value;
                    console.log('Compression type:', compressionType, getCompressionName(compressionType));
                    break;
                }
                
                // Also check for other relevant tags
                if (tag === 256) { // ImageWidth
                    const value = byteOrder === 'II' ? buffer.readUInt32LE(entryOffset + 8) : buffer.readUInt32BE(entryOffset + 8);
                    console.log('Image width:', value);
                }
                if (tag === 257) { // ImageLength
                    const value = byteOrder === 'II' ? buffer.readUInt32LE(entryOffset + 8) : buffer.readUInt32BE(entryOffset + 8);
                    console.log('Image height:', value);
                }
                if (tag === 258) { // BitsPerSample
                    const value = byteOrder === 'II' ? buffer.readUInt32LE(entryOffset + 8) : buffer.readUInt32BE(entryOffset + 8);
                    console.log('Bits per sample:', value);
                }
                if (tag === 262) { // PhotometricInterpretation
                    const value = byteOrder === 'II' ? buffer.readUInt32LE(entryOffset + 8) : buffer.readUInt32BE(entryOffset + 8);
                    console.log('Photometric interpretation:', value);
                }
            }
        } catch (error) {
            console.log('Error reading TIFF structure:');
        }
    }
    
    function getCompressionName(type: number): string {
        const compressionTypes: Record<number, string> = {
            1: 'No compression',
            2: 'CCITT Group 3 1-Dimensional Modified Huffman RLE',
            3: 'CCITT Group 3 fax encoding',
            4: 'CCITT Group 4 fax encoding',
            5: 'LZW',
            6: 'JPEG (old style)',
            7: 'JPEG',
            8: 'Adobe Deflate',
            32773: 'PackBits compression'
        };
        return compressionTypes[type] || `Unknown (${type})`;
    }
    
    analyzeTiffFile(workingFile);
    analyzeTiffFile(problematicFile);
    
    // Try to decode with more detailed error info
    const tiff = require('tiff');
    
    console.log('\n=== Attempting to decode working file ===');
    try {
        const workingBuffer = fs.readFileSync(workingFile);
        const workingResult = tiff.decode(workingBuffer.buffer);
        console.log('Working file decoded successfully. Pages:', workingResult.length);
        if (workingResult.length > 0) {
            console.log('First page dimensions:', workingResult[0].width, 'x', workingResult[0].height);
        }
    } catch (error) {
        console.log('Working file failed:');
    }
    
    console.log('\n=== Attempting to decode problematic file ===');
    try {
        const problematicBuffer = fs.readFileSync(problematicFile);
        const problematicResult = tiff.decode(problematicBuffer.buffer);
        console.log('Problematic file decoded successfully. Pages:', problematicResult.length);
    } catch (error) {
        console.log('Problematic file failed:');
        console.log('Full error:', error);
    }
});

test.skip('Test3b11: should merge buffer input epic 3 page pdfs from a given definition',async() => {
    //arrange
    let filesToPdf = new FilesToPdf();
    let files = [
        './test/sample-files/sample-set-1/0034C00000eRqxlQAC_5004C00000EslOIQAZ_EPIC_Report_Page_2023-2-15_18_40_9.pdf',
        './test/sample-files/sample-set-1/0034C00000eRqxlQAC_Alternate_Graduation_Document_2023-02-08_13_36_00.pdf',
        './test/sample-files/sample-set-1/0034C00000eRqxlQAC_TranslationDocUpload_2023-02-08_13_37_24.pdf'
];
    //act
    await filesToPdf.mergePDFsUsingPdfLib(files, './test/temp', './test/temp/merged3b11.pdf');
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

test('Test4a: should convert tiffs', async() => {
    //arrange
    let filesToPdf = new FilesToPdf();
    
    await filesToPdf.tiffToJpeg('./test/sample-files/sample-set-1/e198fa84-525c-4c4c-b6de-1b642c9c9c29.tiff', './test/temp/649325 Monterrey doc5.jpg');
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