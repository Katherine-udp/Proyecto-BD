//paquetes
const express = require('express');
const { getProds } = require('./controllers/index.controller');
const app = express()
const port = 3000
const path = require('path')

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

//middlewares
app.use(express.json());  
app.use(express.urlencoded({extended:false}));

//Routes
app.use(require('./routes/index'));

app.get('/', (req,res)=>{
  getProds;
  res.render('index.ejs',{getProds:getProds})
})

app.listen(port, () => {
    console.log('App listening at port: '+port)
  })