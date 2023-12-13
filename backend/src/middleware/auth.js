const User = require('../models/User')


const auth = async(req, res, next) => {

  let token = req.headers.authorization;
  token = token && token.replace("Bearer", "");

  if(!token){
    return res.sendStatus(401);
  }

  try{

    const decoded = await User.decodeToken(token);
    const id = decoded._id;
  
    const user = await User.findOne({_id: id});
    
    if(!user){
      return res.status(400).send("올바르지 않은 토큰입니다.")
    }

    req.user = user;
    req.accessToken = token

    next();

  }catch(error){
    next(error)
  }


}

module.exports = auth