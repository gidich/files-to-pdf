import FileType from 'file-type';
import { generatePdfFromImages, ImageDetails } from './code/images-to-pdf';
import PDFMerger from 'pdf-merger-js';
import sizeOf from 'image-size';
import fs from 'fs';
const world ='world';



export function hello(name: string) {
    return `hello ${name}`;
}   

export class FilesToPdf {
    


    private readonly pdfMimeType = 'application/pdf';
    //private readonly tiffMimeType = 'image/tiff';
    private readonly validMimeTypes = [
        this.pdfMimeType,
        'image/png',
        'image/jpeg',
        'image/gif'];


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
}