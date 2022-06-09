"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signin_controllers_1 = require("../controllers/signin-controllers");
class SigninRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //this.router.get('/',middleware,vacantesController.list );
        this.router.get('/', signin_controllers_1.signinController.list);
        this.router.post('/', signin_controllers_1.signinController.signin);
    }
}
const signinRoutes = new SigninRoutes();
exports.default = signinRoutes.router;
