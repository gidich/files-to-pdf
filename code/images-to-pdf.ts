import { jsPDF } from "jspdf";

const A4_PAPER_DIMENSIONS = {
  width: 210,
  height: 297,
};
interface Dimensions {
  width: number;
  height: number;
}
const A4_PAPER_RATIO = A4_PAPER_DIMENSIONS.width / A4_PAPER_DIMENSIONS.height;
export const imageDimensionsOnA4 = (dimensions:Dimensions) => {
  const isLandscapeImage = dimensions.width >= dimensions.height;
  if (isLandscapeImage) {
    return {
      width: A4_PAPER_DIMENSIONS.width,
      height:
        A4_PAPER_DIMENSIONS.width / (dimensions.width / dimensions.height),
    };
  }
  const imageRatio = dimensions.width / dimensions.height;
  if (imageRatio > A4_PAPER_RATIO) {
    const imageScaleFactor =
      (A4_PAPER_RATIO * dimensions.height) / dimensions.width;
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

export interface ImageDetails {
  width: number;
  height: number;
  src: string;
  imageType: string;
}

/**
 *
 * @param {ARRAY} images - check the formats here => http://raw.githack.com/MrRio/jsPDF/master/docs/module-addImage.html#~addImage
 * @param {STRING} output_method - check the formats here => http://raw.githack.com/MrRio/jsPDF/master/docs/jsPDF.html#output
 * @param {Boolean} save - would you like to save the pdf?
 * @param {STRING} pdfname - if you want to save the pdf then what is it's name
 * @returns output
 */
export const generatePdfFromImages = async (images : ImageDetails[], pdfname:string) => {
  const doc = new jsPDF({format: "a4"});
  images.forEach((image) => {
    const imageDimensions = imageDimensionsOnA4({
      width: image.width,
      height: image.height,
    });
    doc.addImage(
      image.src,
      image.imageType,
      (A4_PAPER_DIMENSIONS.width - imageDimensions.width) / 2,
      (A4_PAPER_DIMENSIONS.height - imageDimensions.height) / 2,
      imageDimensions.width,
      imageDimensions.height
    );
  });
  doc.save(`${pdfname}`);
}