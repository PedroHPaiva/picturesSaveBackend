import { getUserAndProfile } from '../repositories/users';

export const getUser = async (email) => {
    try{
        const user = await getUserAndProfile(email);

        if(!user){
            throw new Error(`O usuário não existe`);
        }

        const perfil_name = user['profile.name'];
        delete user['profile.name'];

        return {
            ...user,
            perfil_name
        };
    }catch(err){
        throw new Error(err.message)
    }
}