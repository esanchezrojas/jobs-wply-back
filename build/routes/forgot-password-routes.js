"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const forgot_password_controllers_1 = require("../controllers/forgot-password-controllers");
class ForgotPasswordRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/', forgot_password_controllers_1.forgotPasswordController.forgot);
    }
}
const forgotPasswordRoutes = new ForgotPasswordRoutes();
exports.default = forgotPasswordRoutes.router;
