import { Router } from 'express';
import {listasController } from '../controllers/listas-controller';
import { checkJwt } from '../middlewares/jwt';

class ListasRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    
    config(): void {

        //this.router.get('/',middleware,vacantesController.list );
        

         /**
 * Post track
 * @openapi
 * /api/listas:
 *    get:
 *      tags:
 *        - listas
 *      summary: "Listas desplegables"
 *      description: Este endpoint es para listar los datos del front 
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/user"
 *      responses:
 *        '200':
 *          description: Retorna el listado de datos iniciales.
 *        '422':
 *          description: Error de validacion.
 *      security:
 *       - ffofofof: []
 */
        //this.router.get('/',[checkJwt],listasController.list );
        this.router.get('/',listasController.list );
        this.router.post('/', listasController.create);
       
        
    }

}

const listasRoutes = new ListasRoutes();

export default listasRoutes.router;