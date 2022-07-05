"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const general_data_1 = require("../config/general-data");
const checkJwt = (req, res, next) => {
    const token = req.headers['auth'];
    let jwtPayload;
    try {
        jwtPayload = jsonwebtoken_1.default.verify(token, general_data_1.GeneralData.jwtSecret);
        res.locals.jwtPayload = jwtPayload;
    }
    catch (err) {
        return res.status(401).json({ message: 'No autorizado' });
    }
    const { userId, username } = jwtPayload;
    const newToken = jsonwebtoken_1.default.sign({ userId, username }, general_data_1.GeneralData.jwtSecret);
    res.setHeader('token', newToken);
    next();
};
exports.checkJwt = checkJwt;
