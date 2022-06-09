import { GoogleDriveService } from '../libs/googleDriveService';
import { Request, Response } from 'express';
import db from '../conection-db'


class UploadController {


    async guardar(req: Request, res: Response) {

        const urlDrive = await GoogleDriveService.uploadToGoogleDrive(req.file);
      //  console.log(req.file?.path,'este es el nombre path')
      console.log(urlDrive)
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