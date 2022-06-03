import { Request, Response } from 'express';
import db from '../conection-db'

class ListasController {

    public async list(req: Request, res: Response) {
        let sql:any = {};
        try{

        const ciudad:any = await db.query("select a.ciudad_id,concat(a.ciudad_nom,' - ',b.depto_nom) ciudad from ciudad a inner join departamento b on a.depto_id=b.depto_id where b.pais_id=1 order by ciudad");

        const nivel:any = await db.query("select clasificador_id,descripcion from clasificador where tipo='NEST' order by descripcion");

        sql.ciudad = ciudad;
        sql.nivel = nivel;


            res.status(200).json(sql);

    }catch(error){
        res.status(500).json(error)
    }

    }


    public async create(req: Request, res: Response){

        let element = req.body;
        console.log('Estos son los datos  ',req.body)

        await db.query('INSERT INTO pruebas set ?', [element]);
        res.json({mensaje:'mensaje recivido'})

    }

}


export const listasController = new ListasController();