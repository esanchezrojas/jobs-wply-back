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
exports.uploadController = void 0;
const conection_db_1 = __importDefault(require("../conection-db"));
class UploadController {
    guardar(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            /*
                const {title,description} = req.body;
                console.log(req.file?.path)
               
                const newPhoto = {
                    title: title,
                    description:description,
                    imagePath: req.file?.path
            
                }
            
                console.log(newPhoto)
            */
            try {
                console.log((_a = req.file) === null || _a === void 0 ? void 0 : _a.path);
                const nomArchivo = (_b = req.file) === null || _b === void 0 ? void 0 : _b.path;
                const archivo = { nomarchivo_hv: nomArchivo };
                yield conection_db_1.default.query('INSERT INTO vacante_hv set ?  ', [archivo]);
                return res.json({ message: 'Upload correcto' });
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    list(req, res) {
        return res.send('Listar Uploads');
    }
    update(req, res) {
        const { id } = req.params;
        conection_db_1.default.query('UPDATE vacante_hv SET ? WHERE vacante_id = ?', [req.body, id]);
        res.json({ text: 'updating a game ' + [id] });
    }
}
exports.uploadController = new UploadController();
