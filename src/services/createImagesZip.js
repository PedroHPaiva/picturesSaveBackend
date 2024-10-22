import JSZip from "jszip";

export const createImagesZip = async (images) => {
    const zip = new JSZip();

    for (const image of images) {
      zip.file(image.name, image.data);
    }

    const zipContent = await zip.generateAsync({ type: 'nodebuffer' });

    return zipContent
}