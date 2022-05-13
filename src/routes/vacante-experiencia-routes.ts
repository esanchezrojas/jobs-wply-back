import { Router } from 'express';
import {experienciaController } from '../controllers/vacante-experiencia-controller';

class ExperienciaRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    
    config(): void {
        this.router.get('/',experienciaController.list );
        this.router.get('/:id',experienciaController.getOne );
        this.router.post('/',experienciaController.create);
        this.router.put('/:id',experienciaController.update);
        this.router.delete('/:id',experienciaController.delete);
        
    }

}

const experienciaRoutes = new ExperienciaRoutes();

export default experienciaRoutes.router;