import path from 'path';
import multer, { FileFilterCallback } from 'multer';
import { Router, Request, Response } from 'express';
import { admin, protect } from '../middleware/authMiddleware';

const UploadRouter = Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, __dirname+'/uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

function checkFileType(file: Express.Multer.File, cb: FileFilterCallback) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Images only!'));
  }
}

const upload = multer({
   storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
});

const uploadSingleImage = upload.any();


UploadRouter.use(protect,admin);
UploadRouter.post('/', (req:any, res: Response) => {


  uploadSingleImage(req, res, function (err: any) {

  
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      console.error('Multer Error:', err);
      return res.status(400).send({ message: err.message });
    } else if (err) {
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

export default UploadRouter;
