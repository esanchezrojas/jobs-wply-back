import { Router } from 'express';
import {uploadController } from '../controllers/upload-controller';
import multer from '../libs/multer';

class UploadRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    
    config(): void {

        //this.router.get('/',middleware,vacantesController.list );
        
       this.router.post('/',multer.single('files'),uploadController.guardar);

        //this.router.post('/',uploadController.guardar);
        this.router.get('/',uploadController.list);
      
        
    }

}

const uploadRoutes = new UploadRoutes();

export default uploadRoutes.router;