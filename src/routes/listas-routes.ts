import { Router } from 'express';
import {listasController } from '../controllers/listas-controller';

class ListasRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    
    config(): void {

        //this.router.get('/',middleware,vacantesController.list );
        
        this.router.get('/',listasController.list );
        this.router.post('/', listasController.create);
       
        
    }

}

const listasRoutes = new ListasRoutes();

export default listasRoutes.router;