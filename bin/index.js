"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesToPdf = exports.hello = void 0;
const file_type_1 = __importDefault(require("file-type"));
const images_to_pdf_1 = require("./code/images-to-pdf");
const image_js_1 = require("image-js");
//import ImageColorModel from 'image-js';
const pdf_merger_js_1 = __importDefault(require("pdf-merger-js"));
const image_size_1 = __importDefault(require("image-size"));
const fs_1 = __importDefault(require("fs"));
const tiff = __importStar(require("tiff"));
const world = 'world';
function hello(name) {
    return `hello ${name}`;
}
exports.hello = hello;
class FilesToPdf {
    constructor() {
        this.pdfMimeType = 'application/pdf';
        this.tiffMimeType = 'image/tiff';
        this.imageTypes = ['image/png',
            'image/jpeg',
            'image/gif'];
        this.validMimeTypes = [
            this.pdfMimeType,
            this.tiffMimeType,
            'image/png',
            'image/jpeg',
            'image/gif'
        ];
    }
    tiffToJpeg(tiffFile, jpegFile) {
        return __awaiter(this, void 0, void 0, function* () {
            //let tiffData = tiff.(fs.readFileSync(tiffFile));
            let fileBuffer = fs_1.default.readFileSync(tiffFile);
            console.log('file buffer length', fileBuffer.length);
            let imageList = [];
            let tiffArray = tiff.decode(fileBuffer.buffer);
            for (let page = 0; page < tiffArray.length; page++) {
                let ifd = tiffArray[page];
                console.log('ifd.bitdepth', ifd.bitsPerSample);
                /*
                            let ijs =  new Image(ifd.width, ifd.height, {
                                // TODO: handle float data
                                data: ifd.data,
                                depth: ifd.bitsPerSample
                              } as ImageConstructorOptions);
                              */
                //   let loadedImage = await Image.load(tiffArray[page].data);
                //   loadedImage.save(jpegFile + '_' + page + '.jpg');
                //let image = new Image(tiffArray[page].data, tiffArray[page].width, tiffArray[page].height, tiffArray[page].bitsPerPixel);
                let image = new image_js_1.Image(tiffArray[page].width, tiffArray[page].height, tiffArray[page].data, {
                    depth: ifd.bitsPerSample,
                    colorModel: 'RGB',
                    kind: 'RGB'
                });
                let fileName = jpegFile + '_' + page + '.jpg';
                imageList.push(fileName);
                yield image.save(fileName);
                //  image.save(jpegFile);
            }
            return imageList;
            //let loadedImage = await Image.load(tiffFile);
            //console.log('image data', loadedImage.width, loadedImage.height);
            //return loadedImage.rotateLeft().save(jpegFile);
        });
    }
    convertFiles(files, workDir, outFile) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let mimeTypeMap = new Map();
            for (const file of files) {
                let fileType = yield file_type_1.default.fromFile(file);
                mimeTypeMap.set(file, (_a = fileType === null || fileType === void 0 ? void 0 : fileType.mime) !== null && _a !== void 0 ? _a : 'unknown');
            }
            for (const [file, mimeType] of mimeTypeMap) {
                if (!this.validMimeTypes.includes(mimeType)) {
                    throw new Error(`${file} is not a valid file type`);
                }
            }
            //convert each file to PDF, it multiple images in a row, put them together in a single PDF
            let imageMergeList = new Map();
            let pdfMergeList = [];
            let pdfCount = 0;
            for (let file of files) {
                if (mimeTypeMap.get(file) === this.pdfMimeType) { //once we encounter a PDF, we merge all prior Images into a single PDF
                    //   console.log('image merge list-befor render', JSON.stringify(imageMergeList.size));
                    //  await this.converImagesToTempPDF(imageMergeList, workDir, pdfCount, pdfMergeList);
                    pdfCount++;
                    pdfMergeList.push(file);
                }
                else if (mimeTypeMap.get(file) === this.tiffMimeType) {
                    let imageList = yield this.tiffToJpeg(file, workDir + '/converted_tiff_' + pdfCount);
                    console.log('image list', JSON.stringify(imageList));
                    for (let image of imageList) {
                        console.log('image', image);
                        imageMergeList.set(image, 'image/jpeg');
                        yield this.converImagesToTempPDF(imageMergeList, workDir, pdfCount, pdfMergeList);
                    }
                    console.log('image merge list', JSON.stringify(imageMergeList.size));
                }
                else if (mimeTypeMap.get(file)) {
                    imageMergeList.set(file, mimeTypeMap.get(file));
                    yield this.converImagesToTempPDF(imageMergeList, workDir, pdfCount, pdfMergeList);
                }
            }
            yield this.converImagesToTempPDF(imageMergeList, workDir, pdfCount, pdfMergeList);
            //merge all PDFs into one
            let merger = new pdf_merger_js_1.default();
            for (let pdf of pdfMergeList) {
                merger.add(pdf);
            }
            yield merger.save(outFile);
        });
    }
    getImageDetails(file) {
        var _a, _b;
        let dimensions = (0, image_size_1.default)(file);
        if (!dimensions) {
            throw new Error(`${file} is not a valid image`);
        }
        return {
            width: (_a = dimensions.width) !== null && _a !== void 0 ? _a : 0,
            height: (_b = dimensions.height) !== null && _b !== void 0 ? _b : 0,
        };
    }
    convertToImageDetails(file, mimeType) {
        return __awaiter(this, void 0, void 0, function* () {
            let imageDetails = this.getImageDetails(file);
            return {
                src: fs_1.default.readFileSync(file, { encoding: 'base64' }),
                width: imageDetails.width,
                height: imageDetails.height,
                imageType: this.convertMimeTypeToImageType(mimeType)
            };
        });
    }
    convertMimeTypeToImageType(mimeType) {
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
    converImagesToTempPDF(imageMergeList, workDir, pdfCount, pdfMergeList) {
        return __awaiter(this, void 0, void 0, function* () {
            if (imageMergeList.size > 0) {
                pdfCount++;
                let pdfName = `${workDir}/pdf${pdfCount}.pdf`;
                let images = [];
                for (let [file, mimeType] of imageMergeList) {
                    images.push(yield this.convertToImageDetails(file, mimeType));
                }
                console.log('images to convert', JSON.stringify(images.length));
                yield (0, images_to_pdf_1.generatePdfFromImages)(images, pdfName);
                pdfMergeList.push(pdfName);
                imageMergeList.clear();
            }
        });
    }
}
exports.FilesToPdf = FilesToPdf;
//# sourceMappingURL=index.js.map