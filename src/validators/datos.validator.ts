import {check} from 'express-validator';

class ValidationsData{

validacionCrear(){

   const validateCreate =[
    check('nombre')
    .exists()
    .not()
    .isEmpty(),
    check('apellido')
    .exists()
    .not()
    .isEmpty()
   
   ]

}



}