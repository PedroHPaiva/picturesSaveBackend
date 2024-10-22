import { Router } from 'express';

import pictures from './pictures.routes';
import sessions from './sessions.routes';
import users from './users.routes';

const routes = Router();

routes.use('/sessions', sessions);
routes.use('/pictures', pictures);
routes.use('/users', users);

export default routes;