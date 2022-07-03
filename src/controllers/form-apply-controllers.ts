import { Request, Response } from 'express';
import db from '../conection-db'


class FormApplyController {

    public async list(req: Request, res: Response) {

        const {dato } = req.body;
        console.log('este es el dato bbbbbbb ' ,dato)
        let sql:any = {};
        try{
            
            const sql = await db.query('select * from usuario_externo a where a.cod_unico_registro = ? Limit 1',[dato]);

           
       
            const datos = sql[0];
            console.log(datos)
        


            res.status(200).json({datos});

    }catch(error){
        res.status(500).json(error)
        console.log(error)
    }

    }


   



}


export const formApplyController = new FormApplyController();