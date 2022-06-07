import { validacionToken } from './../middlewares/validacionToken';
import { Router } from 'express';
import {singinController } from '../controllers/singin-controllers';


class SinginRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    
    config(): void {

        //this.router.get('/',middleware,vacantesController.list );
        
        this.router.get('/',singinController.list );
       this.router.post('/',singinController.singin);
       
        
    }

}

const singinRoutes = new SinginRoutes();

export default singinRoutes.router;