"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = __importDefault(require("./docs/swagger"));
const index_routes_1 = __importDefault(require("./routes/index-routes"));
const publicacion_vacantes_routes_1 = __importDefault(require("./routes/publicacion-vacantes-routes"));
const vacante_experiencia_routes_1 = __importDefault(require("./routes/vacante-experiencia-routes"));
const vacante_formacion_routes_1 = __importDefault(require("./routes/vacante-formacion-routes"));
const listas_routes_1 = __importDefault(require("./routes/listas-routes"));
const upload_routes_1 = __importDefault(require("./routes/upload-routes"));
const login_routes_1 = __importDefault(require("./routes/login-routes"));
const signin_routes_1 = __importDefault(require("./routes/signin-routes"));
const signup_routes_1 = __importDefault(require("./routes/signup-routes"));
//Inicializamos las variables de entorno .env
dotenv_1.default.config();
console.log(process.env.TESTING);
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        // Middlewares
        this.app.set('port', process.env.PORT || 3004);
        //Morgan se utiliza para ver detalles y logs de cada peticion
        this.app.use((0, morgan_1.default)('dev'));
        //Cors se utiliza para recivir peticiones desde otros dominios
        this.app.use((0, cors_1.default)());
        //Express.json es una funcion que ya trae la ultima version de express, antes se hacia con bodyparser
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use('/index', index_routes_1.default);
        this.app.use('/api/publicVacantes', publicacion_vacantes_routes_1.default);
        this.app.use('/api/experiencia', vacante_experiencia_routes_1.default);
        this.app.use('/api/formacion', vacante_formacion_routes_1.default);
        this.app.use('/api/listas', listas_routes_1.default);
        this.app.use('/api/upload', upload_routes_1.default);
        this.app.use('/api/login', login_routes_1.default);
        this.app.use('/api/signin', signin_routes_1.default);
        this.app.use('/api/signup', signup_routes_1.default);
        this.app.use('/documentacion', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log(`Server on port `, this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
