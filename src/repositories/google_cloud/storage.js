import { Storage } from '@google-cloud/storage';

export const getStorageInformation = async (bucketName) => {
    try{
        const storage = new Storage({ keyFilename: 'storageKey.json' });
        const bucket = storage.bucket(bucketName);
        const [files] = await bucket.getFiles();
        
        return {files: files, bucket: bucket};
    }catch(err){
        throw new Error(`Erro ao receber os dados do storage.`);
    }
}

export const getStorageBucket = async (bucketName) => {
    try{
        const storage = new Storage({ keyFilename: 'storageKey.json' });
        const bucket = storage.bucket(bucketName);
        return bucket;
    }catch(err){
        throw new Error(`Erro ao receber os dados do storage.`);
    }
}