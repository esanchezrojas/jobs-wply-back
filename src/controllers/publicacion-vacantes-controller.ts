import { Request, Response } from 'express';
import db from '../conection-db'

class VacantesController {

    public async list(req: Request, res: Response) {

        // const responsabilidades = await db.query('SELECT * FROM vacantes_beneficios WHERE id = ?',[20220506])
        //console.log('Estas son las responsabilidades',responsabilidades)
        const sql = await db.query('SELECT a.reqpersonal_id as id,a.nombre as nombreVacante,a.imagen,a.cantidad,a.proposito,a.horario,a.descripcion,b.nombre as ciudad, c.nombre as area FROM vacante_publicacion a LEFT JOIN ciudades b ON a.ciudad_id = b.id LEFT JOIN area c ON a.area_id = c.id LEFT JOIN contrato d ON a.tipocontrato_id = d.id WHERE a.estado = "A"');
        

        
        for (let i = 0; i < sql.length; i++) {

            const beneficio = await db.query('SELECT a.descripcion FROM vacante_beneficio a WHERE vacantepub_id = ?', [sql[i].id]);

           

            const responsabilidad = await db.query('SELECT a.descripcion FROM vacante_responsabilidad a WHERE vacantepub_id = ?', [sql[i].id]);

            const conocimiento = await db.query('SELECT a.descripcion FROM vacante_conocimiento a WHERE vacantepub_id = ?', [sql[i].id]);


            sql[i].beneficios = beneficio;
            sql[i].responsabilidades = responsabilidad;
            sql[i].conocimientos = conocimiento;
            
        }
        // res.json('list a games');
        res.json(sql);
    }



    public async getOne(req: Request, res: Response): Promise<any> {

        const { id } = req.params;

        const sql = await db.query('SELECT * FROM vacantes WHERE id = ?', [id]);

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
        db.query('UPDATE games SET ? WHERE id = ?', [req.body, id]);
        res.json({ text: 'updating a game ' + [id] });
    }

    public async delete(req: Request, res: Response): Promise<void> {

        const { id } = req.params;
        await db.query('DELETE FROM games WHERE id = ?', [id]);
        res.json({ message: 'delete a game ' + req.params.id });
    }


}


export const vacantesController = new VacantesController();