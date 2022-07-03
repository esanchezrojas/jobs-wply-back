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
exports.formApplyController = void 0;
const conection_db_1 = __importDefault(require("../conection-db"));
class FormApplyController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { dato } = req.body;
            console.log('este es el dato bbbbbbb ', dato);
            let sql = {};
            try {
                const sql = yield conection_db_1.default.query('select * from usuario_externo a where a.cod_unico_registro = ? Limit 1', [dato]);
                const datos = sql[0];
                console.log(datos);
                res.status(200).json({ datos });
            }
            catch (error) {
                res.status(500).json(error);
                console.log(error);
            }
        });
    }
}
exports.formApplyController = new FormApplyController();
