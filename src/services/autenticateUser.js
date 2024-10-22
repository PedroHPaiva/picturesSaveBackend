import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { JWT_EXPIRES, JWT_SECRET } from '../config/auth';

export const autenticateUser = async (userId, userCryptedPassword, password) => {
    try{
        const passwordMatch = await compare(password, userCryptedPassword);

        if(!passwordMatch){
            throw new Error('E-mail/Password incorretos.');
        }

        const token = sign({}, JWT_SECRET, {
            subject: userId.toString(),
            expiresIn: JWT_EXPIRES
        });

        return token;
    }catch(err){
        throw new Error(err.message)
    }
}