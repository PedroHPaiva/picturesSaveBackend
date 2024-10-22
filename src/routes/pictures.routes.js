import { Router } from 'express';
import multer from 'multer';

//Configs
import { multerConfigs } from '../config/multer';

//Constants
import { ADMINISTRATOR } from '../constants/allUserPerfils';
import { BRANDS } from '../constants/allBrands';

//Controllers
import { getPictures } from '../controllers/pictures/getPictures';
import { postPictures } from '../controllers/pictures/postPicture';
import { deletePictures } from '../controllers/pictures/deletePictures';
import { downloadPictures } from '../controllers/pictures/downloadPictures';

//Services
import { createImagesZip } from '../services/createImagesZip';

//Middlewares
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { ensurePermissions } from '../middlewares/ensurePermissions';

//Routes configurations
const picturesRouter = Router();
picturesRouter.use(ensureAuthenticated);

picturesRouter.get('/:id', async (req, res, next) => {
    await ensurePermissions(req, res, next, [ADMINISTRATOR])
}, async (req, res) => {
    try{
        const { id } = req.params;

        const idIsValid = BRANDS.find(brands => brands.id === Number(id));

        if(!idIsValid){
            throw new Error(`Não foi identificado um ID válido.`);
        }

        const allPictures = await getPictures(id);
    
        return res.json(allPictures);
    }catch(err){
        return res.status(500).json({ error: err.message })
    }
});

picturesRouter.post('/:id', multer(multerConfigs).single('file'), async (req, res, next) => {
    await ensurePermissions(req, res, next, [ADMINISTRATOR])
}, async (req, res) => {
    try{
        const { id } = req.params;
        const { status } = req.query;
        const file = req.file;

        const idIsValid = BRANDS.find(brands => brands.id === Number(id));

        if(!idIsValid){
            throw new Error(`Não foi identificado um ID válido.`);
        }

        if(!status){
            throw new Error(`status não informado.`);
        }

        if(!file){
            throw new Error(`arquivo não encontrado.`);
        }

        const result = await postPictures(id, file, status);
    
        return res.json({ success: result });
    }catch(err){
        return res.status(500).json({ error: err.message })
    }
});

picturesRouter.post('/download/:id', async (req, res, next) => {
    await ensurePermissions(req, res, next, [ADMINISTRATOR])
}, async (req, res) => {
    try{
        const { id } = req.params;
        const { status, references } = req.body;

        const idIsValid = BRANDS.find(brands => brands.id === Number(id));

        if(!idIsValid){
            throw new Error(`Não foi identificado um ID válido.`);
        }

        if(!status){
            throw new Error(`status não informado.`);
        }

        if(!references || references.length === 0){
            throw new Error(`referências não informadas.`);
        }

        const images = await downloadPictures(id, status, references);
        const zipContent = await createImagesZip(images);

        res.setHeader('Content-Disposition', 'attachment; filename=images.zip');
        res.setHeader('Content-Type', 'application/zip');
        res.end(zipContent);
    }catch(err){
        return res.status(500).json({ error: err.message })
    }
});

picturesRouter.delete('/:id', async (req, res, next) => {
    await ensurePermissions(req, res, next, [ADMINISTRATOR])
}, async (req, res) => {
    try{
        const { id } = req.params;
        const { status, reference } = req.query;

        const idIsValid = BRANDS.find(brands => brands.id === Number(id));

        if(!idIsValid){
            throw new Error(`Não foi identificado um ID válido.`);
        }

        if(!status){
            throw new Error(`status não informado.`);
        }

        if(!reference){
            throw new Error(`referência não informada.`);
        }

        const result = await deletePictures(id, status, reference);
    
        return res.json({ success: result });
    }catch(err){
        return res.status(500).json({ error: err.message })
    }
});

export default picturesRouter;