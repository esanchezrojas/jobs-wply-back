import { Router } from 'express';
import {loginController} from '../controllers/login-controllers';

class LoginRoutes{

   public router: Router = Router() ;

    constructor(){
        this.config();

    }

    config(): void{
        this.router.get('/',loginController.list);
       
    }

}

const loginRoutes = new LoginRoutes();

export default loginRoutes.router;