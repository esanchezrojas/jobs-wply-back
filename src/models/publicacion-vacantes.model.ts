import db from '../conection-db'


export class ModelPubVacantes{

async listaVacantes(){

    const sql = await db.query('SELECT a.reqpersonal_id as id,a.nombre as nombreVacante,a.imagen,a.cantidad,a.proposito,a.horario,a.descripcion,b.nombre as ciudad, c.nombre as area FROM vacante_publicacion a LEFT JOIN ciudades b ON a.ciudad_id = b.id LEFT JOIN area c ON a.area_id = c.id LEFT JOIN contrato d ON a.tipocontrato_id = d.id WHERE a.estado = "A"');


for (let i = 0; i < sql.length; i++) {

    const beneficio = await db.query('SELECT a.descripcion FROM vacante_beneficio a WHERE vacantepub_id = ?', [sql[i].id]);

   

    const responsabilidad = await db.query('SELECT a.descripcion FROM vacante_responsabilidad a WHERE vacantepub_id = ?', [sql[i].id]);

    const conocimiento = await db.query('SELECT a.descripcion FROM vacante_conocimiento a WHERE vacantepub_id = ?', [sql[i].id]);


    sql[i].beneficios = beneficio;
    sql[i].responsabilidades = responsabilidad;
    sql[i].conocimientos = conocimiento;

    console.log(sql);

    return sql;
    
}
}


}