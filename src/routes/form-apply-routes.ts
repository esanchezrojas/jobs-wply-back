import { Router } from 'express';
import {formApplyController } from '../controllers/form-apply-controllers';


class FormApplyRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    
    config(): void { 
        
       this.router.post('/',formApplyController.list);
       
        
    }

}

const formApplyRoutes = new FormApplyRoutes();

export default formApplyRoutes.router;