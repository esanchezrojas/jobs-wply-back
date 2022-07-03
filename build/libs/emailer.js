"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Emailer = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const googleapis_1 = require("googleapis");
class Emailer {
    constructor(user) {
        this.CLIENT_ID = '1051545007389-h9r6dc3i1ju623b1epkpusip5hplrn5n.apps.googleusercontent.com';
        this.CLIENT_SECRET = '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';
        this.REDIRECT_URI = 'https://developers.google.com/oauthplayground';
        this.REFRESH_TOKEN = '1//04q6AlVBdw5lSCgYIARAAGAQSNwF-L9Ir3NLHzDID2IyJQWCSlD-jSztu1tDpes9pw9OC_Xq5rEvAZzAxQI_Yhs0wDapuo8HnTO0';
        this.user = user;
        this.sendMail();
    }
    /**
     * Metodo principal trasportador
     * @returns transport
     */
    createTrans() {
        return __awaiter(this, void 0, void 0, function* () {
            const oAuth2Client = new googleapis_1.google.auth.OAuth2(this.CLIENT_ID, this.CLIENT_SECRET, this.REDIRECT_URI);
            oAuth2Client.setCredentials({ refresh_token: this.REFRESH_TOKEN });
            this.accessToken = yield oAuth2Client.getAccessToken();
            const transport = nodemailer_1.default.createTransport({
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
        });
    }
    sendMail() {
        return __awaiter(this, void 0, void 0, function* () {
            const transporter = yield this.createTrans();
            const info = yield transporter.sendMail({
                from: '"<food@example>"',
                subject: this.user.subject,
                to: this.user.correo,
                html: this.user.html
            });
            console.log('Mensaje enviado: %s', info.messageId);
        });
    }
}
exports.Emailer = Emailer;
