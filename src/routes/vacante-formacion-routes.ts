import { Router } from 'express';
import {formacionController } from '../controllers/vacante-formacion-controller';

class FormacionRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    
    config(): void {
        this.router.get('/',formacionController.list );
        this.router.get('/:id',formacionController.getOne );
        this.router.post('/',formacionController.create);
        this.router.put('/:id',formacionController.update);
        this.router.delete('/:id',formacionController.delete);
        
    }

}

const formacionRoutes = new FormacionRoutes();

export default formacionRoutes.router;