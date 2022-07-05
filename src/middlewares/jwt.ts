
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import {GeneralData} from '../config/general-data'

export const checkJwt = (req:Request,res:Response, next: NextFunction)=>{
   const token = <string> req.headers['auth'];
   let jwtPayload;
   try{
    jwtPayload = <any>jwt.verify(token, GeneralData.jwtSecret);
    res.locals.jwtPayload = jwtPayload;
   }catch(err){
    return res.status(401).json({message: 'No autorizado'});
   } 

   const {userId,username} = jwtPayload;
   const newToken = jwt.sign({userId,username},GeneralData.jwtSecret);
   res.setHeader('token',newToken);

   next();

}