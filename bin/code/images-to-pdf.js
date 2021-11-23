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
exports.generatePdfFromImages = exports.imageDimensionsOnA4 = void 0;
const jspdf_1 = require("jspdf");
const A4_PAPER_DIMENSIONS = {
    width: 210,
    height: 297,
};
const A4_PAPER_RATIO = A4_PAPER_DIMENSIONS.width / A4_PAPER_DIMENSIONS.height;
const imageDimensionsOnA4 = (dimensions) => {
    const isLandscapeImage = dimensions.width >= dimensions.height;
    if (isLandscapeImage) {
        return {
            width: A4_PAPER_DIMENSIONS.width,
            height: A4_PAPER_DIMENSIONS.width / (dimensions.width / dimensions.height),
        };
    }
    const imageRatio = dimensions.width / dimensions.height;
    if (imageRatio > A4_PAPER_RATIO) {
        const imageScaleFactor = (A4_PAPER_RATIO * dimensions.height) / dimensions.width;
        const scaledImageHeight = A4_PAPER_DIMENSIONS.height * imageScaleFactor;
        return {
            height: scaledImageHeight,
            width: scaledImageHeight * imageRatio,
        };
    }
    return {
        width: A4_PAPER_DIMENSIONS.height / (dimensions.height / dimensions.width),
        height: A4_PAPER_DIMENSIONS.height,
    };
};
exports.imageDimensionsOnA4 = imageDimensionsOnA4;
/**
 *
 * @param {ARRAY} images - check the formats here => http://raw.githack.com/MrRio/jsPDF/master/docs/module-addImage.html#~addImage
 * @param {STRING} output_method - check the formats here => http://raw.githack.com/MrRio/jsPDF/master/docs/jsPDF.html#output
 * @param {Boolean} save - would you like to save the pdf?
 * @param {STRING} pdfname - if you want to save the pdf then what is it's name
 * @returns output
 */
const generatePdfFromImages = (images, pdfname) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = new jspdf_1.jsPDF({ format: "a4" });
    images.forEach((image) => {
        const imageDimensions = (0, exports.imageDimensionsOnA4)({
            width: image.width,
            height: image.height,
        });
        doc.addImage(image.src, image.imageType, (A4_PAPER_DIMENSIONS.width - imageDimensions.width) / 2, (A4_PAPER_DIMENSIONS.height - imageDimensions.height) / 2, imageDimensions.width, imageDimensions.height);
    });
    doc.save(`${pdfname}`);
});
exports.generatePdfFromImages = generatePdfFromImages;
//# sourceMappingURL=images-to-pdf.js.map