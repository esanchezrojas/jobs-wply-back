
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import db from '../conection-db'
import { GeneralData } from '../config/general-data';
import { Encrypt } from '../libs/encrypt';
import { Emailer } from '../libs/emailer'
import { Templates } from '../config/templates-email';


class ForgotPasswordController {


    async forgot(req: Request, res: Response) {

        const { email } = req.body;

        try{

        const registro: any = await db.query('select * from usuario_externo a where email = ? LIMIT 1', [email]);

        if (registro == undefined || registro == null || Object.entries(registro).length === 0) {

            return res.status(202).json({ message: 'Usuario no existe', status: 401 })
        } else {
            const register = registro[0];

            let forgot = new Templates(register.nombres);
            let template = forgot.forgot()

        const user = {
                correo: register.email,
                nombre: `${register.nombres}`,
                subject: 'Solicitud cambio de contraseña',
                html: template
            }
            let emailer = new Emailer(user)

          
            return res.status(200).json({ message: `Se envió un mensaje de comprobación al correo ${register.email}`, status: 200, registro: register });
        }
        
    
    }catch(err){
        return res.status(500).json({ message: err });

    }




    }





    public async forgot2(req: Request, res: Response) {

        const { user } = req.body;
        console.log('este es el dato bbbbbbb ', user)
        let sql: any = {};


        if (!user.email) {
            return res.status(400).json({ message: 'El email es requerido' })
        }

        const message = 'Revise su correo electrónico para obtener un enlace para restablecer su contraseña';
        let verificacionLink = `http://localhost:3004/new-password/${token}`;
        let emailStatus = 'ok'
        try {

            const usuario = await db.query('select a.email,a.id from usuario_externo a where email = ?', [user.email])

            if (!usuario) {
                return res.status(403).send({
                    message: 'No existe este email'
                })
            }

            const token: any = jwt.sign({ id: usuario.id }, process.env.TOKEN_SECRET || GeneralData.jwtSecret, { expiresIn: '20m' });

        } catch (error) {
            res.status(500).json(error)
            console.log(error)
        }

    }






}


export const forgotPasswordController = new ForgotPasswordController();