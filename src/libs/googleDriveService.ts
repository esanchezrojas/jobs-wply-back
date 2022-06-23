import fs from 'fs';
import { google } from 'googleapis';
import { Readable } from 'stream';
import { v4 as uuidv4 } from 'uuid';

// service account key file from Google Cloud console.
const KEYFILEPATH = 'C:\\ServiceAccountCred.json';


export class GoogleDriveService {
    //urlDrive: any;
    static urlDrive: string;
    constructor(

    ) { }

    static getAuth = () => {
        
        const auth = new google.auth.GoogleAuth({

            keyFile: `${__dirname}/../../service-account.json`,
            scopes: "https://www.googleapis.com/auth/drive",
        });
        return auth;
    }


    static getDriveService = () => {
        const auth = GoogleDriveService.getAuth();
        return google.drive({ version: 'v3', auth });
    }

    static authenticateGoogle = () => {
        const auth = new google.auth.GoogleAuth({
            keyFile: `${KEYFILEPATH}`,
            scopes: "https://www.googleapis.com/auth/drive",
        });
        google.options({ auth })
        return auth;
    };


    static uploadToGoogleDrive = async (file: any,carpeta:string) => {
        
        //Se obtiene la autenticación
        const auth = GoogleDriveService.getAuth();

        console.log('nombre de la carpeta en el service',file)

        const fieldname = file.fieldname;
        console.log(fieldname,'Este es el nopbre')
       
        if(fieldname == 'fileHv'){
            console.log('Ingreso pv')
        var fileMetadata = {
           
            //Se agrega nombre a el archivo
            name: uuidv4()+"_"+file.originalname,
            //Se agraga el id de la ruta en el drive
            parents: ["17AnQ8bbdXewaG-FIUw_clh2QhyrVAs_0"], // Change it according to your desired parent folder id
        };
    }else{
         fileMetadata = {
            //Se agrega nombre a el archivo
            name: uuidv4()+"_"+file.originalname,
            //Se agraga el id de la ruta en el drive
            parents: ["1P3hxSMcSds2_bXZPD2EdPO9qILIyfLGA"], // Change it according to your desired parent folder id
        };
    }

        const media = {
             mimeType: file.mimetype,
            // body: fs.createReadStream(file.path),
            body: GoogleDriveService.bufferToStream(file.buffer)
        };

        //Se crea el servicio de drive
        const driveService = google.drive({ version: "v3", auth });

        const response = await driveService.files.create({
            requestBody: fileMetadata,
            media: media,
            fields: "id",
        });
           await this.getFilesList(fileMetadata.name)
          console.log('este es el valor de url', this.urlDrive)
         

        return this.urlDrive;
    };

    //Eliminar archivos
    static deleteFile = (filePath: string) => {
        fs.unlink(filePath, () => {
            console.log('file deleted');
        })
    }

    //Obtener archivos
    static getFilesList = async (nombre:any) => {
      

        const driveService = GoogleDriveService.getDriveService()
        const response = await driveService.files.list({
            pageSize: 3
        });

        let arrayDoc:any = [];
        arrayDoc = response.data.files;
       
        await arrayDoc.forEach((element:any) => {
          
           if( element.name == nombre){
             
              this.urlDrive = `https://drive.google.com/file/d/${element.id}/view?usp=sharing`;
             
           }
       
    });
}


    static bufferToStream(buffer: Buffer) {
        const stream = new Readable();
        stream.push(buffer);
        stream.push(null);
        return stream;
    }



}
