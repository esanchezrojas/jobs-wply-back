import { validacionToken } from '../middlewares/validacionToken';
import { Router } from 'express';
import {signinController } from '../controllers/signin-controllers';


class SigninRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    
    config(): void {

        //this.router.get('/',middleware,vacantesController.list );
        
        this.router.get('/',signinController.list );
       this.router.post('/',signinController.signin);
       
        
    }

}

const signinRoutes = new SigninRoutes();

export default signinRoutes.router;