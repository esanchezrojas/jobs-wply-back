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
exports.vacantesController = void 0;
const conection_db_1 = __importDefault(require("../conection-db"));
class VacantesController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // const responsabilidades = await db.query('SELECT * FROM vacantes_beneficios WHERE id = ?',[20220506])
            //console.log('Estas son las responsabilidades',responsabilidades)
            const sql = yield conection_db_1.default.query('SELECT a.reqpersonal_id as id,a.nombre as nombreVacante,a.imagen,a.cantidad,a.proposito,a.horario,a.descripcion,b.nombre as ciudad, c.nombre as area FROM vacante_publicacion a LEFT JOIN ciudades b ON a.ciudad_id = b.id LEFT JOIN area c ON a.area_id = c.id LEFT JOIN contrato d ON a.tipocontrato_id = d.id WHERE a.estado = "A"');
            for (let i = 0; i < sql.length; i++) {
                const beneficio = yield conection_db_1.default.query('SELECT a.descripcion FROM vacante_beneficio a WHERE vacantepub_id = ?', [sql[i].id]);
                const responsabilidad = yield conection_db_1.default.query('SELECT a.descripcion FROM vacante_responsabilidad a WHERE vacantepub_id = ?', [sql[i].id]);
                const conocimiento = yield conection_db_1.default.query('SELECT a.descripcion FROM vacante_conocimiento a WHERE vacantepub_id = ?', [sql[i].id]);
                sql[i].beneficios = beneficio;
                sql[i].responsabilidades = responsabilidad;
                sql[i].conocimientos = conocimiento;
            }
            // res.json('list a games');
            res.json(sql);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const sql = yield conection_db_1.default.query('SELECT * FROM vacantes WHERE id = ?', [id]);
            if (sql.length > 0) {
                return res.json(sql[0]);
            }
            res.status(404).json({ 'message': "The vacante doesn't exists" });
            console.log(sql);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield conection_db_1.default.query('INSERT INTO vacante_hv_experiencia set ?', [req.body]);
            console.log(req.body);
            res.json({ message: 'Experiencia guardada' });
        });
    }
    update(req, res) {
        const { id } = req.params;
        conection_db_1.default.query('UPDATE games SET ? WHERE id = ?', [req.body, id]);
        res.json({ text: 'updating a game ' + [id] });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield conection_db_1.default.query('DELETE FROM games WHERE id = ?', [id]);
            res.json({ message: 'delete a game ' + req.params.id });
        });
    }
}
exports.vacantesController = new VacantesController();
