import { Router } from 'express';

import { createSession } from '../controllers/sessions/createSession';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
    try{
        const { email, password } = req.body;

        if(!email || !password){
            throw new Error(`email ou password não encontrados`);
        }

        const session = await createSession(email, password);
    
        return res.json(session)
    }catch(err){
        return res.status(500).json({ error: err.message })
    }
});

export default sessionsRouter;