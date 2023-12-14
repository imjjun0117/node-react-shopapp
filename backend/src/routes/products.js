const express = require('express');
const router = express.Router();
const Products = require('../models/Product');
const { modelNames } = require('mongoose');


router.post('/', async (req, res, next) => {

  const body = req.body;

  console.log(body,'==============')

  for(key in body){//유효성 검사
    if(!body[key]){
      let error = new Error('필수 값이 누락되었습니다.');
      return next(error)
    }//end if
  }//end for

  try{

    const products = new Products(body);
    await products.save();
    return res.status(200).json({
      success: true,
      message: '등록을 성공하였습니다.'
    });

  }catch(error){
    return next(error);
  }//end catch

})

module.exports = router;