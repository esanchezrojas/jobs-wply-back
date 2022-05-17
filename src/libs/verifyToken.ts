import  jwt  from 'jsonwebtoken';
import { Request,Response, NextFunction } from "express";

export const TokenValidation = (req:Request, res:Response, next: NextFunction) =>{
    const token = req.header('auth-token');
    if(!token) return res.status(401).json('Access denied')

    const payload = jwt.verify(token,process.env.TOKEN_SECRET || 'secret')
    console.log(payload)

    next();
}