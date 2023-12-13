const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const userSchema = mongoose.Schema({

  name: {
    type: String,
    maxLength: 50
  },
  email: {
    type: String,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    minLength: 5
  },
  role: {
    type: Number,
    default: 0
  },
  image: String

})

userSchema.pre('save', async function( next ) {

  let user = this;

  if(user.isModified('password')){
    
    const salt = await bcrypt.genSalt(saltRounds); //salt를 생성하고
    const hash = await bcrypt.hash(user.password, salt); //암호화

    user.password = hash;

  }

  next();

})

userSchema.methods.comparePassword = async function(password){

  let user = this;

  let isMatch = await bcrypt.compare(password, user.password);

  return isMatch
}

userSchema.methods.createJwt = async function(userData){

  const accessToken = jwt.sign(userData, process.env.SECRET_KEY, { expiresIn : '1h'}) // userData는 json 형태로 넣어줘야함

  return accessToken;
}

const User = mongoose.model("User", userSchema);

module.exports = User;