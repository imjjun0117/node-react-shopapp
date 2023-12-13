const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(() => {

  console.log("mongoDB connect complete")
  
}).catch(err => {
  console.log(err);
})

app.use(express.static(path.join(__dirname,'../uploads')));//절대 경로를 사용하는 것이 좋다
app.use(cors());
app.use(express.json())
//Routes
app.use('/users', require('./routes/users'))

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.send(error.message || '서버에서 에러가 발생했습니다.')  
})

app.get('/', (req, res, next) => {
  // setImmediate(() => {next(new Error('it is an error'))})// 비동기에서 에러 발생 시에 next로 넘겨줘야함

  // // throw new Error("it is an error")
  res.send("Start nodeJS")
})

app.post('/', (req, res) => {
  console.log(req.body)
  res.json(req.body)  

})



const port = 8080

app.listen(port, () => {

  console.log(`Server Start ${port}`)

})
