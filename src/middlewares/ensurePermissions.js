import { getUserById } from '../repositories/users';

export const ensurePermissions = async (req, res, next, routePermissions) => {
    return next();
    const user = await getUserById(req.user.id);

    const userHasPermissionToAcessData = routePermissions.find(item => Number(item) === Number(user.id_perfil));

    if(userHasPermissionToAcessData !== undefined){
        return next();
    }

    return res.status(401).json({ error: 'Sem permissão para acessar rota.' });
}