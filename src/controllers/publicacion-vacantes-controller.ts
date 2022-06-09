import { Request, Response } from 'express';
import db from '../conection-db'
import { ModeloExperiencia } from '../models/form-experiencia.model'

class VacantesController {


    constructor(

    ) { }

    public async list(req: Request, res: Response) {

        try {

            const sql = await db.query('SELECT a.reqpersonal_id as id,a.nombre as nombreVacante,a.imagen,a.cantidad as c_vacantes,a.proposito,a.horario,a.descripcion,b.nombre as ciudad, b.id as ciudad_id, c.nombre as area FROM vacante_publicacion a LEFT JOIN ciudades b ON a.ciudad_id = b.id LEFT JOIN area c ON a.area_id = c.id LEFT JOIN contrato d ON a.tipocontrato_id = d.id WHERE a.estado = "A"');

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

        //console.log(req.body)
        //res.json({ message: 'Vacante guardada' });
        // console.log('este es el body ',req.body.registroIni)

        try {


            const registroInicial = req.body.registroIni;
            const registroExperiencia = req.body.experiencia;
            const registroFormacion = req.body.formacion;

           
            let modelE = new ModeloExperiencia();

            console.log(registroExperiencia)

          /*
            await registroExperiencia.forEach((element: any) => {
                    let palabra = element.ciudad_id.split('-')
                
                    db.query('SELECT a.ciudad_id FROM ciudad a WHERE ciudad_nom = ? LIMIT 1',[palabra[0]]).then(value =>{
                       console.log('Esta es la ciuuuu '+value[0].ciudad_id)
                       const ciudad = value[0].ciudad_id;
                       modelE.ciudad_id = ciudad;
                    }).catch(err=>{
                        console.log(err)
                    });
                });
            console.log(modelE.ciudad_id,'Ciudadd id')
               */
              await registroExperiencia.forEach((element: any) => {

               

                modelE.vacantehv_id = element.vacantehv_id;
                modelE.empresa = element.empresa;
                modelE.cargo = element.cargo;
                //modelE.ciudad_id = element.ciudad_id;
                modelE.descripcion = element.descripcion;
                modelE.anio_ini = element.anio_ini;
                modelE.actualmente = element.actualmente;
                modelE.anio_fin = element.anio_fin;
                modelE.mes_fin = element.mes_fin;

                let palabra = element.ciudad_id.split('-')
                
                db.query('SELECT a.ciudad_id FROM ciudad a WHERE ciudad_nom = ? LIMIT 1',[palabra[0]]).then(value =>{
                   console.log('Esta es la ciuuuu '+value[0].ciudad_id)
                   const ciudad = value[0].ciudad_id;
                   modelE.ciudad_id = ciudad;
                }).catch(err=>{
                    console.log(err)
                });

                


               // let city = this.buscarCiudad()
               // console.log('esta es la city ',city)

                
                //const sql = db.query('SELECT * FROM ciudad');
               // const ciudad = db.query("SELECT a.ciudad_id FROM ciudad a WHERE a.ciudad_id = ? ",[1]);

                //console.log('esta es la city ', sql)
                
                //modelE.ciudad_id = ciudad;

                //db.query('INSERT INTO vacante_hv_experiencia set ?', [modelE]);
                console.log(modelE)
            });

            console.log('Terminó la consulta')
            /*
           await registroFormacion.forEach((element: any) => {
               db.query('INSERT INTO vacante_hv_formacion set ?', [element]);
           });

           await db.query('INSERT INTO vacante_hv set ?', [registroInicial]);
           */
            res.json({ message: 'Vacante guardada' });

        } catch (error) {
            res.status(500).json(error)
        }

    }

        async buscarCiudad(){


        //let palabra = ciudad.split('-')
                
        await db.query('SELECT a.ciudad_id FROM ciudad a WHERE ciudad_nom = ? LIMIT 1',['Medellín']).then(value =>{
           //console.log('Esta es la ciuuuu '+value[0].ciudad_id)
           const ciudad = value[0].ciudad_id;
           return ciudad;
           //modelE.ciudad_id = ciudad;
        }).catch(err=>{
            console.log(err)
        });
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