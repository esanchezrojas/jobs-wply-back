"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const listas_controller_1 = require("../controllers/listas-controller");
class ListasRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //this.router.get('/',middleware,vacantesController.list );
        this.router.get('/', listas_controller_1.listasController.list);
        this.router.post('/', listas_controller_1.listasController.create);
    }
}
const listasRoutes = new ListasRoutes();
exports.default = listasRoutes.router;
