import { Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import db from '../conection-db'
import { GeneralData } from '../config/general-data';

class SinginController {

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
     * Inicio de sesion
     * @param req 
     * @param res 
     * @returns 
     */
    async singin(req: Request, res: Response) {

        const { userName, pass } = req.body;
        await db.query('select a.userName,a.roleId from user a where userName = ? and pass = ?', [userName, pass]).then(user => {
            if (user.length === 0 ) {
                console.log('Esta vacio')
                console.log(user)
                return res.json({message:'Usuario o contraseña incorrecto',status:401});
            } else {
                console.log(user[0].userName)
                console.log('Ingresó en el esle')
                //const newToken = jwt.sign({ userId, username }, config.jwtSecret, { expiresIn: '1h' });
                /**Recive un dato tipo object, clave secreta y tiempo que expira */
                const token: any = jwt.sign({ user }, process.env.TOKEN_SECRET || GeneralData.SECRET,{expiresIn: 120});
                return res.json({token,message:'Mensaje valido',status:200});

            }

        }).catch(err => {
            console.log('Este es el error')
            console.log(err)
        });

        console.log('Termino la consulta')
    }

}







export const singinController = new SinginController();