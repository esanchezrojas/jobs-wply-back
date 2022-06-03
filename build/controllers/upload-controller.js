"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadController = void 0;
class UploadController {
    guardar(req, res) {
        var _a;
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
        console.log((_a = req.file) === null || _a === void 0 ? void 0 : _a.path);
        return res.json({ message: 'Upload correcto' });
    }
    list(req, res) {
        return res.send('Listar Uploads');
    }
}
exports.uploadController = new UploadController();
