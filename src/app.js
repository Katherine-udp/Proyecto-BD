//paquetes
const express = require('express');
const app = express()
const port = 3000
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({
    extended: true
  }));

//paths to ejs
app.set('views',path.join(__dirname,'views'));
app.set('views','./src/views')
app.set('view engine','ejs');

//middlewares
app.use(express.json());  
app.use(express.urlencoded({extended:false}));

//Routes
app.use(require('./routes/index'));


app.use(express.static(path.join(__dirname,'/public')));


app.listen(port, () => {
    console.log('App listening at port: '+port)
  })
