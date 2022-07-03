import { GoogleDriveService } from '../libs/googleDriveService';
import { Request, Response } from 'express';
import db from '../conection-db'


class UploadController {


    async guardar(req: Request, res: Response) {

        const {num_unico_hv,nombre} = req.body;
        console.log('este es el nombre del archivo enviado req '+nombre)

       
      
        const urlDrive = await GoogleDriveService.uploadToGoogleDrive(req.file);

        if(nombre == 'hv'){
        await  db.query( 'UPDATE vacante_hv SET nomarchivo_hv = ? WHERE num_unico_hv = ?', [urlDrive,num_unico_hv]);
        }else{
            await  db.query( 'UPDATE vacante_hv SET nomarchivo_portafolio = ? WHERE num_unico_hv = ?', [urlDrive,num_unico_hv]);
        }
     //  await  db.query('INSERT INTO vacante_hv set ? where num_unico_hv = ?', [urlDrive,nomFile]);
       // const {carpeta} = req.body;
      

       

      //  console.log(req.file?.path,'este es el nombre path')
      console.log('esta es la url ',urlDrive)
        res.json({
            message: urlDrive
            
        });

        /*
            const {title,description} = req.body;
            console.log(req.file?.path)
           
            const newPhoto = {
                title: title,
                description:description,
                imagePath: req.file?.path
        
            }
        
            console.log(newPhoto)
        */


       /*     
        try {
            console.log(req.file?.path);
            const nomArchivo = req.file?.path
            const archivo = { nomarchivo_hv: nomArchivo }
            await db.query('INSERT INTO vacante_hv set ?  ', [archivo]);
            return res.json({ message: 'Upload correcto' });
        } catch (err) {
            console.log(err)
        }

*/

    }

    list(req: Request, res: Response) {


        return res.send('Listar Uploads')



    }


    
    public update(req: Request, res: Response) {
        const { id } = req.params;
        db.query('UPDATE vacante_hv SET ? WHERE vacante_id = ?', [req.body, id]);
        res.json({ text: 'updating a game ' + [id] });
    }

}

export const uploadController = new UploadController();