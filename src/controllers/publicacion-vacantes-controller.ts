import { Request, Response } from 'express';
import db from '../conection-db'
import { ModeloExperiencia } from '../models/form-experiencia.model'

const model: any = [];
class VacantesController {

    experiencia: any = [];
    exper: any = {}
    constructor(

    ) { }

    /**
     * Lista la informacion de las vacantes con estado A
     * @param req 
     * @param res 
     */
    async list(req: Request, res: Response) {

        try {

            const sql = await db.query('SELECT a.reqpersonal_id as id,a.nombre as nombreVacante,a.imagen,a.cantidad as c_vacantes,a.proposito,a.horario,a.descripcion,b.ciudad_nom as ciudad , c.descripcion as area, d.descripcion as tipo_de_contrato FROM vacante_publicacion a LEFT JOIN ciudad b ON a.ciudad_id = b.ciudad_id LEFT JOIN proceso c ON a.area_id = c.proceso_id LEFT JOIN clasificador d ON a.tipocontrato_id = d.clasificador_id WHERE a.estado = "A"');

            for (let i = 0; i < sql.length; i++) {

                const beneficio = await db.query('SELECT a.descripcion FROM vacante_beneficio a WHERE vacantepub_id = ?', [sql[i].id]);

                const responsabilidad = await db.query('SELECT a.descripcion FROM vacante_responsabilidad a WHERE vacantepub_id = ?', [sql[i].id]);

                const conocimiento = await db.query('SELECT a.descripcion FROM vacante_conocimiento a WHERE vacantepub_id = ?', [sql[i].id]);


                sql[i].beneficios = beneficio;
                sql[i].responsabilidades = responsabilidad;
                sql[i].conocimientos = conocimiento;

            }

            res.status(200).json(sql);

        } catch (error) {
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


    /**
     * Guarda los datos del formulario de las vacantes
     * @param req ontienes los datos de la perticion post
     * @param res responde el mensaje de la petición post
     */
    public async create(req: Request, res: Response) {

        console.log(req.body)
        const registroInicial = req.body.registroIni;
        const registroExperiencia = req.body.experiencia;
        const registroFormacion = req.body.formacion;

        try{

         
        
        //Paso 1
        //Esta funcion se debe ejecutar de primero, guarda el registro datos iniciales
        const registro = await db.query('INSERT INTO vacante_hv set ?', [registroInicial]);
        const insertId = registro.insertId;
        console.log(insertId,' Este es el insert id');


        //Actualizamos el valor de ciudad_id por el id correspondiente en la base de datos
        for (let i = 0; i < registroExperiencia.length; i++) {

            

            registroExperiencia[i].vacantehv_id = insertId;
            console.log(registroExperiencia[i].vacantehv_id,' vacante_hv')


            let ciudad = registroExperiencia[i].ciudad_id.split('-')
            console.log('ciudad', ciudad)
            const ciudadId = await db.query('SELECT a.ciudad_id FROM ciudad a WHERE a.ciudad_nom = ? LIMIT 1', [ciudad[0]]);

            registroExperiencia[i].ciudad_id = ciudadId[0].ciudad_id;

            
             console.log('vacante id', registroExperiencia[i].vacantehv_id)
            console.log(' Final array ',registroExperiencia)
        }


      
        //Paso 2
        //Guarda el registro Experiencia
        await registroExperiencia.forEach((element: any) => {
            db.query('INSERT INTO vacante_hv_experiencia set ?', [element]);
            console.log('Terminó la consulta')
        });

          

        console.log(registroFormacion, ' este es el reg')
        //Actualizamos el valor de ciudad_id por el id correspondiente en la base de datos
        for (let i = 0; i < registroFormacion.length; i++) {


            registroFormacion[i].vacantehv_id = insertId;
            console.log(registroFormacion[i].vacantehv_id,' vacante_hv')

            
            let nivel = registroFormacion[i].nivel_id;
            const nivelId = await db.query('SELECT a.clasificador_id FROM clasificador a WHERE a.descripcion = ? LIMIT 1', [nivel]);
            registroFormacion[i].nivel_id = nivelId[0].clasificador_id;
            console.log('nivel id', registroFormacion[i].nivel_id)

            let estado = registroFormacion[i].estado_id;
            const estadoId = await db.query('SELECT a.clasificador_id FROM clasificador a WHERE a.descripcion = ? LIMIT 1', [estado]);
            registroFormacion[i].estado_id = estadoId[0].clasificador_id;
            console.log('estado id', registroFormacion[i].estado_id)

            console.log('esto es el registro form', registroFormacion)


        }
        
        
        //Paso 3
        //Guarda el registro Formación
        await registroFormacion.forEach((element: any) => {
            db.query('INSERT INTO vacante_hv_formacion set ?', [element]);
        });
        

        res.json({ message: 'Vacante guardada' });
        
    }catch(err){

        console.log('Error ', err)

    }

        

    }



    /**
     * Actualiza los datos
     * @param req 
     * @param res 
     */
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