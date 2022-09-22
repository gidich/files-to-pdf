import FileType from 'file-type';
import { generatePdfFromImages, ImageDetails } from './code/images-to-pdf';
import { Image, ImageConstructorOptions } from 'image-js';
import PDFMerger from 'pdf-merger-js';
import sizeOf from 'image-size';
import fs from 'fs';
import * as tiff from 'tiff';
import { BlobServiceClient } from '@azure/storage-blob';
import { PDFDocument } from 'pdf-lib'
export class FilesToPdf {
    private readonly pdfMimeType = 'application/pdf';
    private readonly tiffMimeType = 'image/tiff';
    private readonly validMimeTypes = [
        this.pdfMimeType,
        this.tiffMimeType,
        'image/png',
        'image/jpeg',
        'image/gif'];
    
    public async tiffToJpeg(tiffFile: string, jpegFile: string) : Promise<string[]> {
        let fileBuffer = fs.readFileSync(tiffFile);
        
        let imageList:string[] = [];
        let tiffArray = tiff.decode(fileBuffer.buffer);
        for(let page = 0; page < tiffArray.length; page++) {
            let ifd = tiffArray[page];
            let image = new Image( tiffArray[page].width, tiffArray[page].height, tiffArray[page].data,{
                depth: ifd.bitsPerSample,
                colorModel: 'RGB',
                kind: 'RGB'
            } as ImageConstructorOptions);
            let fileName = jpegFile + '_' + page + '.jpg';
            imageList.push(fileName);
            await image.save(fileName);
        }
        return imageList;
    }


    public async convertFiles(files: string[], workDir: string, outFile: string): Promise<void> {
        let mimeTypeMap = new Map<string, string>();
        for (const file of files) {
            let fileType = await FileType.fromFile(file);
            mimeTypeMap.set(file, fileType?.mime ?? 'unknown');
        }
        for (const [file, mimeType] of mimeTypeMap) {
            if (!this.validMimeTypes.includes(mimeType)) {
                throw new Error(`${file} is not a valid file type`);
            }
        }
        //convert each file to PDF, it multiple images in a row, put them together in a single PDF
        let imageMergeList:Map<string,string> = new Map<string,string>();
        let pdfMergeList:string[] = [];
        let pdfCount = 0;
        for(let file of files) {
            
            if(mimeTypeMap.get(file) === this.pdfMimeType) { //once we encounter a PDF, we merge all prior Images into a single PDF
                await this.converImagesToTempPDF(imageMergeList, workDir, pdfCount, pdfMergeList);
                pdfCount++;
                pdfMergeList.push(file);
            }
            else if(mimeTypeMap.get(file) === this.tiffMimeType) {
                let imageList = await this.tiffToJpeg(file, workDir + '/converted_tiff_' + pdfCount);
                for(let image of imageList) {
                    imageMergeList.set(image, 'image/jpeg');
                } 
            }   
            else if (mimeTypeMap.get(file)){
                imageMergeList.set(file, mimeTypeMap.get(file) as string);
            }
        }

        await this.converImagesToTempPDF(imageMergeList, workDir, pdfCount, pdfMergeList);

        //merge all PDFs into one
        let merger = new PDFMerger();
        for(let pdf of pdfMergeList) {
            merger.add(pdf);
        }
        await merger.save(outFile);
    }

    public async convertFilesBuffer(files: string[], workDir: string, outFile: string): Promise<void> {
        let mimeTypeMap = new Map<string, string>();
        for (const file of files) {
            let fileType = await FileType.fromFile(file);
            mimeTypeMap.set(file, fileType?.mime ?? 'unknown');
        }
        for (const [file, mimeType] of mimeTypeMap) {
            if (!this.validMimeTypes.includes(mimeType)) {
                throw new Error(`${file} is not a valid file type`);
            }
        }
        //convert each file to PDF, it multiple images in a row, put them together in a single PDF
        let imageMergeList:Map<string,string> = new Map<string,string>();
        let pdfMergeList:string[] = [];
        let pdfCount = 0;
        for(let file of files) {
            
            if(mimeTypeMap.get(file) === this.pdfMimeType) { //once we encounter a PDF, we merge all prior Images into a single PDF
                await this.converImagesToTempPDF(imageMergeList, workDir, pdfCount, pdfMergeList);
                pdfCount++;
                pdfMergeList.push(file);
            }
            else if(mimeTypeMap.get(file) === this.tiffMimeType) {
                let imageList = await this.tiffToJpeg(file, workDir + '/converted_tiff_' + pdfCount);
                for(let image of imageList) {
                    imageMergeList.set(image, 'image/jpeg');
                } 
            }   
            else if (mimeTypeMap.get(file)){
                imageMergeList.set(file, mimeTypeMap.get(file) as string);
            }
        }

        await this.converImagesToTempPDF(imageMergeList, workDir, pdfCount, pdfMergeList);

        //merge all PDFs into one
        let merger = new PDFMerger();
        for(let pdf of pdfMergeList) {
            merger.add(pdf);
        }
        var bufferedFile = await merger.saveAsBuffer();
    }

    public async convertFilesBufferInput(files: string[], workDir: string, outFile: string): Promise<void> {
        let mimeTypeMap = new Map<string, string>();
        for (const file of files) {
            let fileType = await FileType.fromFile(file);
            mimeTypeMap.set(file, fileType?.mime ?? 'unknown');
        }
        for (const [file, mimeType] of mimeTypeMap) {
            if (!this.validMimeTypes.includes(mimeType)) {
                throw new Error(`${file} is not a valid file type`);
            }
        }
        //convert each file to PDF, it multiple images in a row, put them together in a single PDF
        let imageMergeList:Map<string,string> = new Map<string,string>();
        let pdfMergeList:string[] = [];
        let pdfCount = 0;
        for(let file of files) {
            
            if(mimeTypeMap.get(file) === this.pdfMimeType) { //once we encounter a PDF, we merge all prior Images into a single PDF
                await this.converImagesToTempPDF(imageMergeList, workDir, pdfCount, pdfMergeList);
                pdfCount++;
                pdfMergeList.push(file);
            }
            else if(mimeTypeMap.get(file) === this.tiffMimeType) {
                let imageList = await this.tiffToJpeg(file, workDir + '/converted_tiff_' + pdfCount);
                for(let image of imageList) {
                    imageMergeList.set(image, 'image/jpeg');
                } 
            }   
            else if (mimeTypeMap.get(file)){
                imageMergeList.set(file, mimeTypeMap.get(file) as string);
            }
        }

        await this.converImagesToTempPDF(imageMergeList, workDir, pdfCount, pdfMergeList);

        //for each PDF, convert it to a buffer and add it to the list of buffers to be merged
        let merger = new PDFMerger();
        for(let pdf of pdfMergeList) {
            var fileContent = fs.readFileSync(pdf);
            merger.add(fileContent);
        }
        var bufferedFile = await merger.saveAsBuffer();
        fs.writeFileSync(outFile, bufferedFile);
    }

    public async convertFilesBufferInputPages(files: string[], workDir: string, outFile: string): Promise<void> {
        let mimeTypeMap = new Map<string, string>();
        for (const file of files) {
            let fileType = await FileType.fromFile(file);
            mimeTypeMap.set(file, fileType?.mime ?? 'unknown');
        }
        for (const [file, mimeType] of mimeTypeMap) {
            if (!this.validMimeTypes.includes(mimeType)) {
                throw new Error(`${file} is not a valid file type`);
            }
        }
        //convert each file to PDF, it multiple images in a row, put them together in a single PDF
        let imageMergeList:Map<string,string> = new Map<string,string>();
        let pdfMergeList:string[] = [];
        let pdfCount = 0;
        for(let file of files) {
            
            if(mimeTypeMap.get(file) === this.pdfMimeType) { //once we encounter a PDF, we merge all prior Images into a single PDF
                await this.converImagesToTempPDF(imageMergeList, workDir, pdfCount, pdfMergeList);
                pdfCount++;
                pdfMergeList.push(file);
            }
            else if(mimeTypeMap.get(file) === this.tiffMimeType) {
                let imageList = await this.tiffToJpeg(file, workDir + '/converted_tiff_' + pdfCount);
                for(let image of imageList) {
                    imageMergeList.set(image, 'image/jpeg');
                } 
            }   
            else if (mimeTypeMap.get(file)){
                imageMergeList.set(file, mimeTypeMap.get(file) as string);
            }
        }

        await this.converImagesToTempPDF(imageMergeList, workDir, pdfCount, pdfMergeList);

        //for each PDF, convert it to a buffer and add it to the list of buffers to be merged
        let merger = new PDFMerger();
        for(let pdf of pdfMergeList) {
            var fileContent = fs.readFileSync(pdf);
            merger.add(fileContent, ['1']);
        }
        var bufferedFile = await merger.saveAsBuffer();
        fs.writeFileSync(outFile, bufferedFile);
    }    

    private getImageDetails(file: string): { width: number, height: number } {
        let dimensions = sizeOf(file);
        if (!dimensions) {
            throw new Error(`${file} is not a valid image`);
        }
        return {
            width: dimensions.width ?? 0,
            height: dimensions.height ?? 0,
        };
    }

    private async convertToImageDetails(file:string, mimeType:string) : Promise<ImageDetails> {
        let imageDetails = this.getImageDetails(file);
        return {
            src: fs.readFileSync(file,{encoding: 'base64'}),
            width: imageDetails.width,
            height: imageDetails.height,
            imageType: this.convertMimeTypeToImageType(mimeType)
        }
    }
 
    private convertMimeTypeToImageType(mimeType: string): string {
        switch (mimeType) {
            case 'image/png':
                return 'png';
            case 'image/jpeg':
                return 'jpeg';
            case 'image/gif':
                return 'gif';
            default:
                throw new Error(`${mimeType} is not a valid image type`);
        }
    }

    private async converImagesToTempPDF(imageMergeList:Map<string,string>, workDir: string, pdfCount: number, pdfMergeList: any[]) {
        if (imageMergeList.size > 0) {
            pdfCount++;
            let pdfName = `${workDir}/pdf${pdfCount}.pdf`;
            let images: ImageDetails[] = [];
            for (let [file, mimeType] of imageMergeList) {
                images.push(await this.convertToImageDetails(file, mimeType));
            }
            await generatePdfFromImages(images, pdfName);
            pdfMergeList.push(pdfName);
            imageMergeList.clear();
        }
    }

    async convertFilesBlobInput1Page(files: string[], arg1: string) {
        // download the files
        let downloadedFiles: any[] = [];
        await this.downloadBlobs(files, downloadedFiles);

         // merge the files
         const merger = new PDFMerger();
         for (let file of downloadedFiles) {
             merger.add(file.content, ['1']);
         }
         const mergedFile = await merger.saveAsBuffer();

         // save the file to local storage
        fs.writeFileSync(arg1, mergedFile);
    }

    // download the files in fileList array from blob storage and save them to the downloadedFiles array
    async downloadBlobs(fileList: string[], downloadedFiles: any[]) {
        for (let blobName of fileList) {
            const containerName = "input-files";
            // download the file from azure blob storage
            const blobServiceClient = BlobServiceClient.fromConnectionString("DefaultEndpointsProtocol=https;AccountName=salesforcestorageact;AccountKey=2der/NyZo9xKCwJAhDdwsAZ7mrUVUnp+qR/qkOgpfRhRxEe5GqTYyoq2o0T209wRLvvawa+lcGe6+AStqlQuoQ==;EndpointSuffix=core.windows.net");
            const containerClient = blobServiceClient.getContainerClient(containerName);
            const blobClient = containerClient.getBlobClient(blobName);

        // Get blob content from position 0 to the end
        // In Node.js, get downloaded data by accessing downloadBlockBlobResponse.readableStreamBody
        const downloadBlockBlobResponse = await blobClient.download();
        const downloaded = (
            await streamToBuffer(downloadBlockBlobResponse.readableStreamBody)
        );
        downloadedFiles.push({ name: blobName, content: downloaded });
        }
    }

    public async convertFilesBufferInputLib(files: string[], workDir: string, outFile: string): Promise<void> {
        let mimeTypeMap = new Map<string, string>();
        for (const file of files) {
            let fileType = await FileType.fromFile(file);
            mimeTypeMap.set(file, fileType?.mime ?? 'unknown');
        }
        for (const [file, mimeType] of mimeTypeMap) {
            if (!this.validMimeTypes.includes(mimeType)) {
                throw new Error(`${file} is not a valid file type`);
            }
        }
        //convert each file to PDF, it multiple images in a row, put them together in a single PDF
        let imageMergeList:Map<string,string> = new Map<string,string>();
        let pdfMergeList:string[] = [];
        let pdfCount = 0;
        for(let file of files) {
            
            if(mimeTypeMap.get(file) === this.pdfMimeType) { //once we encounter a PDF, we merge all prior Images into a single PDF
                await this.converImagesToTempPDF(imageMergeList, workDir, pdfCount, pdfMergeList);
                pdfCount++;
                pdfMergeList.push(file);
            }
            else if(mimeTypeMap.get(file) === this.tiffMimeType) {
                let imageList = await this.tiffToJpeg(file, workDir + '/converted_tiff_' + pdfCount);
                for(let image of imageList) {
                    imageMergeList.set(image, 'image/jpeg');
                } 
            }   
            else if (mimeTypeMap.get(file)){
                imageMergeList.set(file, mimeTypeMap.get(file) as string);
            }
        }

        await this.converImagesToTempPDF(imageMergeList, workDir, pdfCount, pdfMergeList);

        // Create a new PDFDocument
        const pdfDoc = await PDFDocument.create()

        //for each PDF, convert it to a buffer and add it to the list of buffers to be merged
        let merger = new PDFMerger();
        for(let pdf of pdfMergeList) {
            var fileContent = fs.readFileSync(pdf);
            const PdfDoc = await PDFDocument.load(fileContent)
            //const [firstDonorPage] = await pdfDoc.copyPages(PdfDoc, [0])
            const pages = PdfDoc.getPageIndices();
            console.log('pages: ' + pages);
            const copiedPages = await pdfDoc.copyPages(PdfDoc, pages)
            copiedPages.forEach((page) => {
                pdfDoc.addPage(page)
            });            
        }
        //var bufferedFile = await merger.saveAsBuffer();
        // Serialize the PDFDocument to bytes (a Uint8Array)
        const pdfBytes = await pdfDoc.save()
        fs.writeFileSync(outFile, pdfBytes);
    }

}

function streamToBuffer(readableStream: any) {
    return new Promise((resolve, reject) => {
        const chunks: any = [];
        readableStream.on("data", (data: WithImplicitCoercion<ArrayBuffer | SharedArrayBuffer>) => {
            chunks.push(data instanceof Buffer ? data : Buffer.from(data));
        });
        readableStream.on("end", () => {
            resolve(Buffer.concat(chunks));
        });
        readableStream.on("error", reject);
    });
}
