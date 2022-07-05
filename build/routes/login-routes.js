"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_controllers_1 = require("../controllers/login-controllers");
class LoginRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', login_controllers_1.loginController.list);
    }
}
const loginRoutes = new LoginRoutes();
exports.default = loginRoutes.router;
