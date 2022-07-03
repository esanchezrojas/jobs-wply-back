import { check } from 'express-validator';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import db from '../conection-db'
import { GeneralData } from '../config/general-data';
import {Encrypt} from '../libs/encrypt';
import nodemailer from 'nodemailer';
import {Emailer} from '../libs/emailer'


class SigninController {
    
    constructor
    (
        
    ){}

    public async list(req: Request, res: Response) {

       const user = {
        correo:'edwinsanchez.ad6@gmail.com',
        nombre: 'Edwin Sánchez Rojas',
        subject: 'Bienvenido esto es una prueba',
        html: `<h1>Hola Mundo</h1>`
       }
       let emailer = new Emailer(user)
        //emailer.sendMail();
        return res.status(200).json({msg:'correo enviado'})
        
        
        /*
     const config = nodemailer.createTransport({
            host: 'smtp.mailtrap.io',
            port: 587,
            auth: {
                user: '1ba32909aa9c36',
                pass: '02f1d8965b64c5'
            }
        });

        const opciones = {
            from: 'Programación',
            subject: 'Asuntoooo',
            to: 'edwinsanchez.ad6@gmail.com',
            text: 'Cuerpo',
            html: `<b>Hola Mundo!!</b>`

        };

        config.sendMail(opciones,(error,result)=>{

            if(error) {
                return res.status(500).json({msg:'no se envió '+error})
            }else{
            return res.status(200).json({msg:'correo enviado'})
            }
        });
        
       */

       

    }

    /**
     * Inicio de sesion
     * @param req 
     * @param res 
     * @returns 
     */
    async signin(req: Request, res: Response) {

        let encrypt = new Encrypt();

        var { email, clave } = req.body;

        console.log(req.body)

         //pass = await encrypt.encrypt(pass)

        try{
    
         const registro:any = await db.query('select * from usuario_externo a where email = ? LIMIT 1',[email])

         console.log(typeof(registro))
         console.log(registro[0])
         
         
         if(registro == undefined || registro == null || Object.entries(registro).length === 0){
           
            return  res.status(200).json({message:'Usuario no existe',status:401})
         }
         
         const password = registro[0].clave;
       //  const cedula = registro[0].cedula;

         console.log(registro[0].clave, ' password')
         

        //desencrypta la contraseña y devuelve un valor booleano
         const checkPass = await encrypt.compare(clave,password); 
             console.log(checkPass)

             if(checkPass){

                
             
                 console.log('Inicio de sesion correcto')
                 //expireIn: 1 (segundos)
                 const token: any = jwt.sign({ registro }, process.env.TOKEN_SECRET || GeneralData.SECRET,{expiresIn:'3h'});
                 return res.json({token,message:'Inicio de sesión correcto',status:200,registro:registro[0]});
             }else{

                return res.json({message:'Usuario o contraseña incorrecto',status:401});

             }
            
            }catch(err){
                console.log(err)
                return res.json({message:err,status:500});
            }
        
        }



}







export const signinController = new SigninController();


