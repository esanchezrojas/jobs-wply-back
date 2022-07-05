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
exports.forgotPasswordController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const conection_db_1 = __importDefault(require("../conection-db"));
const general_data_1 = require("../config/general-data");
const emailer_1 = require("../libs/emailer");
const templates_email_1 = require("../config/templates-email");
class ForgotPasswordController {
    forgot(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            try {
                const registro = yield conection_db_1.default.query('select * from usuario_externo a where email = ? LIMIT 1', [email]);
                if (registro == undefined || registro == null || Object.entries(registro).length === 0) {
                    return res.status(202).json({ message: 'Usuario no existe', status: 401 });
                }
                else {
                    const register = registro[0];
                    let forgot = new templates_email_1.Templates(register.nombres);
                    let template = forgot.forgot();
                    const user = {
                        correo: register.email,
                        nombre: `${register.nombres}`,
                        subject: 'Solicitud cambio de contraseña',
                        html: template
                    };
                    let emailer = new emailer_1.Emailer(user);
                    return res.status(200).json({ message: `Se envió un mensaje de comprobación al correo ${register.email}`, status: 200, registro: register });
                }
            }
            catch (err) {
                return res.status(500).json({ message: err });
            }
        });
    }
    forgot2(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = req.body;
            console.log('este es el dato bbbbbbb ', user);
            let sql = {};
            if (!user.email) {
                return res.status(400).json({ message: 'El email es requerido' });
            }
            const message = 'Revise su correo electrónico para obtener un enlace para restablecer su contraseña';
            let verificacionLink = `http://localhost:3004/new-password/${token}`;
            let emailStatus = 'ok';
            try {
                const usuario = yield conection_db_1.default.query('select a.email,a.id from usuario_externo a where email = ?', [user.email]);
                if (!usuario) {
                    return res.status(403).send({
                        message: 'No existe este email'
                    });
                }
                const token = jsonwebtoken_1.default.sign({ id: usuario.id }, process.env.TOKEN_SECRET || general_data_1.GeneralData.jwtSecret, { expiresIn: '20m' });
            }
            catch (error) {
                res.status(500).json(error);
                console.log(error);
            }
        });
    }
}
exports.forgotPasswordController = new ForgotPasswordController();
