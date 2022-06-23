import { Router } from 'express';
import { uploadController } from '../controllers/upload-controller';
import multer from '../middlewares/multer';

class UploadRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }


    config(): void {

        //this.router.get('/',middleware,vacantesController.list );

        this.router.post('/', multer.getInstance().single('file'), uploadController.guardar);
        this.router.get('/', uploadController.list);
        this.router.put('/', uploadController.update);


    }

}

const uploadRoutes = new UploadRoutes();

export default uploadRoutes.router;