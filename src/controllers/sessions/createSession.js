import { getUser } from '../../services/getUser';
import { autenticateUser } from '../../services/autenticateUser';

export const createSession = async (email, password) => {
    try{
        const user = await getUser(email);
        const token = await autenticateUser(user.id_user, user.password, password);

        return {
            email:user.email,
            name: user.name,
            perfil: user.perfil_name,
            token: token
        }
    }catch(err){
        throw new Error(err.message)
    }
}