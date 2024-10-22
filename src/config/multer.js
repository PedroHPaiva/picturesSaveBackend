import multer from "multer";
import path from 'path';

export const multerConfigs = {
    dest: path.resolve(__dirname, "..", "tmp"),
    storage: multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, path.resolve(__dirname, "..", "tmp"))
        },
        filename: (req, file, callback) => {
            callback(null, file.originalname);
        }
    }),
    limits: {
        fileSize: 15 * 1024 * 1024
    },
    fileFilter: (req, file, callback) => {
        const allowed = [
            "image/jpeg",
            "image/png",
            "image/thumb",
            "image/gif",
            "image/pjpeg",
        ]

        if(allowed.includes(file.mimetype)){
            callback(null, true);
        }else{
            callback(new Error(`Invalid type format`));
        }
    }
}