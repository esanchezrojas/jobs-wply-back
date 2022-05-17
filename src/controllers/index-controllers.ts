import { UsuarioToken } from './../models/usuario-token.model';
import db from '../conection-db'
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';


class IndexController {

    //sigin registro 
    public index(req: Request, res: Response) {

        
        const user = new UsuarioToken();
        user.id = 4,
        user.nombre = req.body.nombre,
        user.correo = req.body.correo
    
        const token:string = jwt.sign({id:user.id },process.env.TOKEN_SECRET || 'secret');

          res.header('auth-token',token).json(user)
    }

    //sigup registro 
    public async signup(req: Request, res: Response) {

        
        const user = new UsuarioToken();
        user.id = req.body.id,
        user.nombre = req.body.nombre,
        user.correo = req.body.correo
    
       
        console.log(user)

        
        await db.query('INSERT INTO pruebas set ?', [user]);
        console.log(user);
        
    
        const token:string = jwt.sign({id:user.id },process.env.TOKEN_SECRET || 'secret');

          res.header('auth-token',token).json({mensaje:"Registrado",usuario:user})
          
    }



//sigup registro 
public async signin(req: Request, res: Response) {

    
        
   res.send('login')
      
}


}






export const indexController = new IndexController();