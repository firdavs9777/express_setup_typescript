"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const express_1 = require("express");
const authMiddleware_1 = require("../middleware/authMiddleware");
const UploadRouter = (0, express_1.Router)();
const storage = multer_1.default.diskStorage({
    destination(req, file, cb) {
        cb(null, __dirname + '/uploads/');
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path_1.default.extname(file.originalname)}`);
    }
});
function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/;
    const extname = filetypes.test(path_1.default.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
        return cb(null, true);
    }
    else {
        cb(new Error('Images only!'));
    }
}
const upload = (0, multer_1.default)({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
});
const uploadSingleImage = upload.any();
UploadRouter.use(authMiddleware_1.protect, authMiddleware_1.admin);
UploadRouter.post('/', (req, res) => {
    uploadSingleImage(req, res, function (err) {
        if (err instanceof multer_1.default.MulterError) {
            // A Multer error occurred when uploading.
            console.error('Multer Error:', err);
            return res.status(400).send({ message: err.message });
        }
        else if (err) {
            // An unknown error occurred when uploading.
            return res.status(400).send({ message: err.message });
        }
        // Everything went fine.
        if (!req.file) {
            return res.status(400).send({ message: 'No file uploaded' });
        }
        res.status(200).send({
            message: 'Image uploaded successfully',
            image: `/${req.file.path}`,
        });
    });
});
exports.default = UploadRouter;
