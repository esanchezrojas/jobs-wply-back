import bcrypt from 'bcryptjs';


export class Encrypt {

    /**
     * 
     * @param textPlain Encriptamos
     * @returns 
     */
async encrypt(textPlain: any) {

    const hash = await bcrypt.hash(textPlain,10);
    return hash;
}

/**
 * Comparamos
 * @param passWordPlain 
 * @param hashPassword 
 * @returns 
 */
async compare(passWordPlain:any, hashPassword:any){

        return await bcrypt.compare(passWordPlain,hashPassword);

}

}