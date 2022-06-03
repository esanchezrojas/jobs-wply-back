import { Request, Response } from 'express';
import db from '../conection-db'


class UploadController {


guardar(req:Request,res:Response){
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
    console.log(req.file?.path);
    return res.json({ message: 'Upload correcto' });



}

list(req:Request,res:Response){


    return res.send('Listar Uploads')



}

}

export const uploadController = new UploadController();