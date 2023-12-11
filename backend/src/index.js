const express = require('express');
const app = express();


app.get('/', (req, res) => {

  res.send('welcome2131');

})

const port = 8080
app.listen(port, () => {

  console.log(`Server Start ${port}`)

})