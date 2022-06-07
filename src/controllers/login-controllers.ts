import { Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import db from '../conection-db'
import {GeneralData} from '../config/general-data';

class LoginController {

    public async list(req: Request, res: Response) {
        let sql:any = {};
        try{

        const user:any = await db.query("select * from user ");
        console.log(user)

        


            res.status(200).json(user);

    }catch(error){
        res.status(500).json(error)
        console.log(error)
    }

    }


   

         test(req: Request, res: Response){
             let cp = req.body.user;
             console.log(cp[0].userName,' Este es el contenido delllll array')
             res.json(req.body)
         }


}


export const loginController = new LoginController();