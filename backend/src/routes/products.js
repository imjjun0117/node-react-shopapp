const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { modelNames } = require('mongoose');
const multer = require('multer'); //파일 업로드 라이브러리

const storage = multer.diskStorage({
  destination : function (req, file, cd){
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`)
  }
})

multer({ storage: storage}).single('file')

router.post('/', async (req, res, next) => {

  const body = req.body;

  for(key in body){//유효성 검사
    if(!body[key]){
      let error = new Error('필수 값이 누락되었습니다.');
      return next(error)
    }//end if
  }//end for

  try{

    const product = new Product(body);
    await product.save();
    return res.status(201).json({
      success: true,
      message: '등록을 성공하였습니다.'
    });

  }catch(error){
    return next(error);
  }//end catch

})


router.post('/image', (req, res, next) => {
  
  

})

module.exports = router;