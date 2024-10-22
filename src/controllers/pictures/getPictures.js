import { getStorageInformation } from '../../repositories/google_cloud/storage';
import { getBucketName } from '../../services/getBucketName';
import { NO_TREATMENT, CONFERENCE, PENDING_UPLOAD, SEND_UPLOAD, ERROR_UPLOAD } from '../../constants/pictureStatus';

export const getPictures = async (brandId) => {
    const bucketName = getBucketName(Number(brandId));
    const {files, bucket} = await getStorageInformation(bucketName);

    const noTreatment = [];
    const inConference = [];
    const pendingUpload = [];
    const sendUpload = [];
    const errorUpload = [];

    await Promise.all(
        files.map(async item => {
            const arrayName = item.name.split('/');
            const reference = arrayName[arrayName.length - 1];
            const status = arrayName.length >= 2 ? arrayName[0] : undefined;
    
            const partsArray = reference.split('_');
    
            if (partsArray.length >= 3) {
                const [url] = await bucket.file(item.name).getSignedUrl({
                    action: 'read',
                    expires: '01-01-2030',
                });

                const obj = {
                    status: status,
                    product: partsArray[0],
                    color: partsArray[1],
                    type: partsArray[2].split('.')[0],
                    reference: `${partsArray[0]}_${partsArray[1]}`,
                    url: url
                };
    
                if(status === NO_TREATMENT){
                    noTreatment.push(obj);
                }

                if(status === CONFERENCE){
                    inConference.push(obj);
                }

                if(status === PENDING_UPLOAD){
                    pendingUpload.push(obj);
                }

                if(status === SEND_UPLOAD){
                    sendUpload.push(obj);
                }

                if(status === ERROR_UPLOAD){
                    errorUpload.push(obj);
                }
            }
        })
    );

    return [
        {
            status: NO_TREATMENT,
            data: noTreatment,
            length: noTreatment.length
        },
        {
            status: CONFERENCE,
            data: inConference,
            length: inConference.length
        },
        {
            status: PENDING_UPLOAD,
            data: pendingUpload,
            length: pendingUpload.length
        },
        {
            status: SEND_UPLOAD,
            data: sendUpload,
            length: sendUpload.length
        },
        {
            status: ERROR_UPLOAD,
            data: errorUpload,
            length: errorUpload.length
        }
    ];
}