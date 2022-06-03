import { Request, Response } from 'express';
import db from '../conection-db'

class VacantesController {

    public async list(req: Request, res: Response) {

        try{

        const sql = await db.query('SELECT a.reqpersonal_id as id,a.nombre as nombreVacante,a.imagen,a.cantidad,a.proposito,a.horario,a.descripcion,b.nombre as ciudad, b.id as ciudad_id, c.nombre as area FROM vacante_publicacion a LEFT JOIN ciudades b ON a.ciudad_id = b.id LEFT JOIN area c ON a.area_id = c.id LEFT JOIN contrato d ON a.tipocontrato_id = d.id WHERE a.estado = "A"');
        
 for (let i = 0; i < sql.length; i++) {

            const beneficio = await db.query('SELECT a.descripcion FROM vacante_beneficio a WHERE vacantepub_id = ?', [sql[i].id]);

             const responsabilidad = await db.query('SELECT a.descripcion FROM vacante_responsabilidad a WHERE vacantepub_id = ?', [sql[i].id]);

            const conocimiento = await db.query('SELECT a.descripcion FROM vacante_conocimiento a WHERE vacantepub_id = ?', [sql[i].id]);


            sql[i].beneficios = beneficio;
            sql[i].responsabilidades = responsabilidad;
            sql[i].conocimientos = conocimiento;
            
        }
      
        res.status(200).json(sql);

    }catch(error){
        res.status(500).json(error)
    }

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

        console.log(req.body)
        res.json({ message: 'Vacante guardada' });
        
        /*

       console.log('este es el body ',req.body.registroIni)
       const registroInicial = req.body.registroIni;
       const registroExperiencia = req.body.experiencia;
       const registroFormacion = req.body.formacion;

      await registroExperiencia.forEach((element:any) => {
         const ciudad =   db.query('SELECT ciudad_nom From ciudad WHERE ciudad_nom = ? Limit 1',element.ciudad_nom)
         const id =   db.query('SELECT ciudad_id From ciudad WHERE ciudad_nom = ? Limit 1',element.ciudad_nom)
         console.log('Esta es la ciuda del elemento ',element)
        db.query('INSERT INTO vacante_hv_experiencia set ?', [element]);
     });

     await registroFormacion.forEach((element:any) => {
        db.query('INSERT INTO vacante_hv_formacion set ?', [element]);
     });

     await db.query('INSERT INTO vacante_hv set ?', [registroInicial]);

     res.json({ message: 'Vacante guardada' });
     */
      
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