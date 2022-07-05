import { forgotPasswordController } from './controllers/forgot-password-controllers';
import express, { Application } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import swaggerUi from "swagger-ui-express";
import swaggerSetup from "./docs/swagger";

import indexRoutes from './routes/index-routes';
import vacantesRoutes from './routes/publicacion-vacantes-routes';
import experienciaRoutes from './routes/vacante-experiencia-routes';
import formacionRoutes from './routes/vacante-formacion-routes';
import listasRoutes from './routes/listas-routes';
import uploadRoutes from './routes/upload-routes';
import signinRoutes from './routes/signin-routes';
import signupRoutes from './routes/signup-routes';
import formApplyRoutes from './routes/form-apply-routes';
import forgotPasswordRoutes from './routes/forgot-password-routes';
import loginRoutes from './routes/login-routes';


//Inicializamos las variables de entorno .env
dotenv.config();
console.log(process.env.TESTING)
class Server {


    public app: Application;
    constructor() {
    
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {

        // Middlewares
        this.app.set('port', process.env.PORT || 3004);
        //Morgan se utiliza para ver detalles y logs de cada peticion
        this.app.use(morgan('dev'));
        //Cors se utiliza para recivir peticiones desde otros dominios
        this.app.use(cors());
        //Express.json es una funcion que ya trae la ultima version de express, antes se hacia con bodyparser
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:false}))
        

    }


    routes(): void {
        this.app.use('/index',indexRoutes)
        this.app.use('/api/publicVacantes',vacantesRoutes)
        this.app.use('/api/experiencia',experienciaRoutes)
        this.app.use('/api/formacion',formacionRoutes)

       
        this.app.use('/api/listas',listasRoutes)
        this.app.use('/api/upload',uploadRoutes)
        this.app.use('/api/signin',signinRoutes)
        this.app.use('/api/signup',signupRoutes)
        this.app.use('/api/formApply',formApplyRoutes)
        this.app.use('/api/recuperar',forgotPasswordRoutes)
        this.app.use('/api/login',loginRoutes)


        this.app.use('/documentacion',swaggerUi.serve, swaggerUi.setup(swaggerSetup))
    }

    start(): void {
        this.app.listen(this.app.get('port'), () =>{
            console.log(`Server on port `,this.app.get('port'));
        });
    }
}

const server = new Server();
server.start();


