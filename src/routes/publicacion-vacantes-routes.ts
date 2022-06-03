import { Router } from 'express';
import {vacantesController } from '../controllers/publicacion-vacantes-controller';

class VacantesRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    
    config(): void {

        //this.router.get('/',middleware,vacantesController.list );
        
        this.router.get('/',vacantesController.list );
        this.router.get('/:id',vacantesController.getOne );
        this.router.post('/',vacantesController.create);
        this.router.put('/:id',vacantesController.update);
        this.router.delete('/:id',vacantesController.delete);
        
    }

}

const vacantesRoutes = new VacantesRoutes();

export default vacantesRoutes.router;