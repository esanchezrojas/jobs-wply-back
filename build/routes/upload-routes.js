"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upload_controller_1 = require("../controllers/upload-controller");
const multer_1 = __importDefault(require("../libs/multer"));
class UploadRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //this.router.get('/',middleware,vacantesController.list );
        this.router.post('/', multer_1.default.single('files'), upload_controller_1.uploadController.guardar);
        //this.router.post('/',uploadController.guardar);
        this.router.get('/', upload_controller_1.uploadController.list);
    }
}
const uploadRoutes = new UploadRoutes();
exports.default = uploadRoutes.router;