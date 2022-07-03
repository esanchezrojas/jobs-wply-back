"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const form_apply_controllers_1 = require("../controllers/form-apply-controllers");
class FormApplyRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/', form_apply_controllers_1.formApplyController.list);
    }
}
const formApplyRoutes = new FormApplyRoutes();
exports.default = formApplyRoutes.router;
