import express, { Application } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import indexRoutes from './routes/index-routes';
import vacantesRoutes from './routes/publicacion-vacantes-routes';
import experienciaRoutes from './routes/vacante-experiencia-routes';
import formacionRoutes from './routes/vacante-formacion-routes';
//const express = require('express')

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
        this.app.set('port', process.env.PORT || 3000);
        //Morgan se utiliza para ver detalles y logs de cada peticion
        this.app.use(morgan('dev'));
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
    }

    start(): void {
        this.app.listen(this.app.get('port'), () =>{
            console.log(`Server on port `,this.app.get('port'));
        });
    }
}

const server = new Server();
server.start();