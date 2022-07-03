
import nodemailer from 'nodemailer';
import { google } from 'googleapis';






export class Emailer {

    CLIENT_ID = '1051545007389-h9r6dc3i1ju623b1epkpusip5hplrn5n.apps.googleusercontent.com';
    CLIENT_SECRET = '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';
    REDIRECT_URI = 'https://developers.google.com/oauthplayground';
    REFRESH_TOKEN = '1//04q6AlVBdw5lSCgYIARAAGAQSNwF-L9Ir3NLHzDID2IyJQWCSlD-jSztu1tDpes9pw9OC_Xq5rEvAZzAxQI_Yhs0wDapuo8HnTO0';
    accessToken:any;





    user: any;

    constructor(
        user: any
    ) {
        this.user = user
        this.sendMail();
    }







    /**
     * Metodo principal trasportador
     * @returns transport
     */
    async createTrans() {

        const oAuth2Client = new google.auth.OAuth2(
            this.CLIENT_ID,
            this.CLIENT_SECRET,
            this.REDIRECT_URI
        );

        oAuth2Client.setCredentials({ refresh_token: this.REFRESH_TOKEN })

        this.accessToken = await oAuth2Client.getAccessToken();
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'edwin.sanchez@wplay.co',
                clientId: this.CLIENT_ID,
                clientSecret: this.CLIENT_SECRET,
                refreshToken: this.REFRESH_TOKEN,
                accessToken: this.accessToken,
                
            }
        });

        /*
        const transport = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "1ba32909aa9c36",
                pass: "02f1d8965b64c5"
            }
        });*/

        return transport;

    }


    async sendMail() {




        const transporter = await this.createTrans()
        const info = await transporter.sendMail({
            from: '"<food@example>"',
            subject: this.user.subject,
            to: this.user.correo,
            html: this.user.html
        });

        console.log('Mensaje enviado: %s', info.messageId);

    }


}


