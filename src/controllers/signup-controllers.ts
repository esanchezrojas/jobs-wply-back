import { Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import db from '../conection-db'
import { GeneralData } from '../config/general-data';

class SignupController {

    public async list(req: Request, res: Response) {
        let sql: any = {};
        try {

            const user: any = await db.query("select * from user ");
            console.log(user)

            res.status(200).json(user);

        } catch (error) {
            res.status(500).json(error)
            console.log(error)
        }

    }

    /**
     * Registro de usuario
     * @param req 
     * @param res 
     * @returns 
     */
    async signup(req: Request, res: Response) {
        try{
        //const { user } = req.body;
        const user = req.body;
        await db.query('INSERT user set ?', [user]);
        res.json({message:'Registro correcto',status:200});
        }catch(err){
            console.log(err)
            res.json({message:'No se guardaron los datos',status:401})
        }
      
    }

}







export const signupController = new SignupController();