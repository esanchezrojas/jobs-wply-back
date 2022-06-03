import db from '../conection-db'


export class ModelRegistro{

  guardarExperiencia( registroExperiencia:any ){

     registroExperiencia.forEach((element:any) => {
        db.query('INSERT INTO vacante_hv_experiencia set ?', [element]);
     });

}


 guardarFormacion( registroFormacion:any ){

     registroFormacion.forEach((element:any) => {
        db.query('INSERT INTO vacante_hv_formacion set ?', [element]);
     });

}

 guardarDatosUser( registroInicial:any ){

  db.query('INSERT INTO vacante_hv set ?', [registroInicial]);

}


}