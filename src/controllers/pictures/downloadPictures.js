import { getStorageInformation } from '../../repositories/google_cloud/storage';
import { getBucketName } from '../../services/getBucketName';

export const downloadPictures = async (brandId, status, referenceArray) => {
    const bucketName = getBucketName(Number(brandId));
    const {files, bucket} = await getStorageInformation(bucketName);

    const images = [];

    await Promise.all(
        files.map(async item => {
            const arrayName = item.name.split('/');
            const reference = arrayName[arrayName.length - 1];
            const actualStatus = arrayName.length >= 2 ? arrayName[0] : undefined;

            const lastDot = reference.lastIndexOf(".");
            const referenceWithNoMimeType = reference.slice(0, lastDot);

            const storageReferenceIsOnArray = referenceArray.find(item => item === referenceWithNoMimeType);

            if(storageReferenceIsOnArray === referenceWithNoMimeType && actualStatus === status){
                const file = bucket.file(item.name);
                const [fileBuffer] = await file.download();

                images.push({
                    name: file.name, 
                    data: fileBuffer
                })
            }
        })
    );

    return images
}