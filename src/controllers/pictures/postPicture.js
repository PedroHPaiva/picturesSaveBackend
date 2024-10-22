import fs from 'fs';

import { getStorageBucket } from '../../repositories/google_cloud/storage';
import { getBucketName } from '../../services/getBucketName';
import { STATUS_ARRAY } from '../../constants/pictureStatus';
import { referenceMatch } from '../../services/verifyReference';


export const postPictures = async (brandId, file, status) => {
    const bucketName = getBucketName(Number(brandId));
    const bucket = await getStorageBucket(bucketName);

    const referenceIsValid = await referenceMatch(file.originalname);

    if(!referenceIsValid){
        fs.unlink(file.path,(err) => {
            if(err){
                throw new Error(`Ocorreu um erro ao remover a imagem da pasta temporária.`)
            }
        });

        throw new Error(`O nome da referência precisa estar no formato PRODUTO_COR_TIPO`);
    }

    const statusIsValid = STATUS_ARRAY.find(item => item === status);

    if(!statusIsValid){
        fs.unlink(file.path,(err) => {
            if(err){
                throw new Error(`Ocorreu um erro ao remover a imagem da pasta temporária.`)
            }
        });

        throw new Error(`O status escolhido é inválido.`);
    }

    const fileName = `${status}/${file.originalname}`

    await bucket.upload(file.path, {
        destination: fileName,
    });

    fs.unlink(file.path,(err) => {
        if(err){
            throw new Error(`O arquivo foi enviado com sucesso ao storage, mas ocorreu um erro ao remover a imagem da pasta temporária.`)
        }
    });

    return `${file.originalname} adicionado com sucesso.`
}