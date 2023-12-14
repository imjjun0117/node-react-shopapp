const express = require('express');
const router = express.Router();
const User = require('../models/User')
const auth = require('../middleware/auth')

router.post('/register', async(req, res, next) => {
  
  let body = req.body

  try{
    
    let user = new User(body);
    await user.save();
    return res.status(200);

  }catch(error){

    next(error)

  }//end catch

})

router.post('/login', async(req, res, next) => {

  let body = req.body;

  try{

    //존재하는 유저인지 체크
    const user = await User.findOne({email: body.email});
  
    if(!user){//유저가 존재하지 않는경우
  
      return res.status(400).json({
        success: false,
        message: "해당 이메일은 존재하지 않습니다."
      })
      
    }
    
    const isMatch = await user.comparePassword(body.password);
    
    if(!isMatch){
      
      return res.status(400).json({
        success: false,
        message: "비밀번호가 일치하지 않습니다."
      })
  
    }
  
    const payload = {
      _id: user._id.toHexString()
    };
  
    const accessToken = await user.createJwt(payload);
  
    return res.json({
      success: true,
      user,
      accessToken
    })

  }catch(err){

    next(err)

  }//end catch

})

router.get('/auth', auth, (req, res, next) => {

  let userData = req.user;

  return res.json({
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,
    image: req.user.image,
    cart: req.user.cart,
    history: req.user.history
  })

})

router.post('/logout', auth , (req, res, next) => {

  try{
    return res.sendStatus(200);
  }catch(error){
    next(error);
  }//end catch

})


module.exports = router;