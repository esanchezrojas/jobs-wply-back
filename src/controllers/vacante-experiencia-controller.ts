import { Request, Response } from 'express';
import db from '../conection-db'

class ExperienciaController {

    public async list(req: Request, res: Response) {

       
        const sql = await db.query('SELECT * FROM vacante_hv_experiencia');
    
        res.json(sql);
    }



    public async getOne(req: Request, res: Response): Promise<any> {

        const { id } = req.params;

        const sql = await db.query('SELECT * FROM vacante_hv_experiencia WHERE id = ?', [id]);

        if (sql.length > 0) {
            return res.json(sql[0]);
        }
        res.status(404).json({ 'message': "The vacante doesn't exists" })
        console.log(sql)

    }



    public async create(req: Request, res: Response) {

        await db.query('INSERT INTO vacante_hv_experiencia set ?', [req.body]);
        console.log(req.body);
        res.json({ message: 'Experiencia guardada' });
    }


    public update(req: Request, res: Response) {
        const { id } = req.params;
        db.query('UPDATE vacante_hv_experiencia SET ? WHERE id = ?', [req.body, id]);
        res.json({ text: 'Experiencia Actualizada ' + [id] });
    }

    public async delete(req: Request, res: Response): Promise<void> {

        const { id } = req.params;
        await db.query('DELETE FROM vacante_hv_experiencia WHERE id = ?', [id]);
        res.json({ message: 'Experiencia Eliminada' + req.params.id });
    }


}


export const experienciaController = new ExperienciaController();