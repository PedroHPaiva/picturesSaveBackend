import { getStorageInformation } from '../../repositories/google_cloud/storage';
import { getBucketName } from '../../services/getBucketName';

export const deletePictures = async (brandId, statusToDelete, referenceToDelete) => {
    const bucketName = getBucketName(Number(brandId));
    const {files, bucket} = await getStorageInformation(bucketName);

    let somePhotoWasDeleted = false;

    await Promise.all(
        files.map(async item => {
            const arrayName = item.name.split('/');
            const reference = arrayName[arrayName.length - 1];
            const actualStatus = arrayName.length >= 2 ? arrayName[0] : undefined;

            const lastDot = reference.lastIndexOf(".");
            const referenceWithNoMimeType = reference.slice(0, lastDot);

            if(referenceToDelete === referenceWithNoMimeType && actualStatus === statusToDelete){
                const file = bucket.file(item.name);
                await file.delete();
                somePhotoWasDeleted = true;
            }
        })
    );

    if(!somePhotoWasDeleted){
        throw new Error(`A imagem ${referenceToDelete} não foi encontrada no status ${statusToDelete}`);
    }

    return `${referenceToDelete} excluida com sucesso no status ${statusToDelete}`;
}