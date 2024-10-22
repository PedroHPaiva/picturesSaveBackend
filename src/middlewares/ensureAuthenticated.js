import { verify } from 'jsonwebtoken';
import { JWT_SECRET } from '../config/auth';

export const ensureAuthenticated = (req, res, next) => {
    try{
        const token = req.headers.authorization;

        if(!token){
            return res.status(400).json({ error: 'Token não informado' });
        }

        const decodedToken = verify(token, JWT_SECRET);

        const { sub } = decodedToken;

        req.user = {
            id: sub,
        }

        return next();
    }catch(err){
        console.log(err)
        return res.status(400).json({ error: 'Token inválido' })
    }
}