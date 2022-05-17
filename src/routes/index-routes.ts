import { Router } from 'express';
import {indexController} from '../controllers/index-controllers';

class IndexRoutes{

   public router: Router = Router() ;

    constructor(){
        this.config();

    }

    config(): void{
        this.router.get('/',indexController.index);
        this.router.post('/',indexController.signup);
        this.router.post('/',indexController.signin);
    }

}

const indexRoutes = new IndexRoutes();

export default indexRoutes.router;