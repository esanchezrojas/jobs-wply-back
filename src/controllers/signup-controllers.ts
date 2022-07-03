import { Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import db from '../conection-db'
import { GeneralData } from '../config/general-data';
import {Encrypt} from '../libs/encrypt';
import {ModeloVacanteHv} from '../models/vacante_hv.models'

class SignupController {

    constructor(
      
    ){}

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
        let encrypt = new Encrypt();
        const user = req.body;
        // let {user} = req.body;
        console.log(user)
        try{
        
        
        const password = await encrypt.encrypt(user.clave)
        user.clave = password;
        console.log(user.clave,'esta es la contraseña')
        console.log( password, ' Encriptada' )
        //let modelo = {user}
      
        await db.query('INSERT usuario_externo set ?', [user]);

        let modeloVH = new ModeloVacanteHv();

        modeloVH.cod_unico_registro = user.cod_unico_registro;
        modeloVH.nombres = user.nombres;
        modeloVH.apellidos = user.apellidos;
        modeloVH.email = user.email;

        await db.query('INSERT vacante_hv set ?', [modeloVH]);

        res.json({message:'Registro correcto',status:200});
        }catch(err){
            console.log('Error', err)
            res.json({message:'No se guardaron los datos',status:401})

        }
      
    }

}







export const signupController = new SignupController();