import { Router } from 'express';
import {forgotPasswordController } from '../controllers/forgot-password-controllers';


class ForgotPasswordRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    
    config(): void { 
        
       this.router.post('/',forgotPasswordController.forgot);
       
        
    }

}

const forgotPasswordRoutes = new ForgotPasswordRoutes();

export default forgotPasswordRoutes.router;