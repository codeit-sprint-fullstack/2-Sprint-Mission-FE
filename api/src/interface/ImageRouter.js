import express from 'express';
import multer from 'multer';
import path from 'path';

import { asyncErrorHandler } from './utils/asyncErrorHandler.js';
import { AuthN } from './utils/AuthN.js';

export const ImageRouter = express.Router();

const imageUpload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join(path.resolve(), 'public/images/'));
        },
        filename: function (req, file, cb) {
            cb(null, [Date.now(), file.originalname].join('-'));
        },
    }),

    limits: {
        fileSize: 5 * 1024 * 1024,
    },

    fileFilter: function (req, file, cb) {
        if (['image/png', 'image/jpeg'].includes(file.mimetype) === false) {
            return cb(new Error('Only png and jpeg are allowed'));
        }

        cb(null, true);
    },
});

// 파일 업로드 API
ImageRouter.post(
    '/upload',
    AuthN(),
    imageUpload.single('image'),
    asyncErrorHandler(async (req, res) => {
        const filePath = path.join('static/images/', req.file.filename);
        return res.send({
            url: `${process.env.BASE_URL}/${filePath}`,
        });
    }),
);
