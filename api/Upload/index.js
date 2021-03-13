import express from 'express';
// import multer from 'multer';
// import fs from 'fs';

const router = express.Router(); // eslint-disable-line

// var upload = multer({
//     dest: 'public/upload/',
//     limits: {
//         fileSize: 4000000
//     }
// }) //4mb
// router.post('/', upload.single('file'), function (req, res, next) {
//     try {
//         console.log(req.body)
//         fs.rename(req.file.path, "public/upload/" + req.file.originalname)
//         res.status(201).json({
//             code: 201,
//             msg: 'Successful upload',
//         });
//     } catch (err) {
//         next(err)
//     }
// });
const path = require('path')
const multer = require('multer')
const fs = require('fs')
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      // 上传文件存在 public/uploads 下
      cb(null, 'public/uploads')
    },
    filename(req, file, cb) {
      // 使用时间戳作为上传的文件名
      const extname = path.extname(file.originalname)
      cb(null, Date.now() + extname)
    }
  })
})
router.post('/',  upload.single('file'), (req, res) => {
    const { file: { filename, path } } = req
    res.json({
      ok: true,
      message: '图片上传成功',
      data: {
        name: filename,
        url: path
      }
    })
  })
  router.delete('/delete',  async (req, res,next) => {
    const { path } = req.body
    fs.unlink(path, (err) => {
      if (err) return next(err)
      res.json({
        ok: true,
        message: '删除图片成功'
      })
    })
  })

export default router;