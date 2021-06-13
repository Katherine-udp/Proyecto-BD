//paquetes
const express = require('express')

const app = express()
const port = 3000

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//Routes
app.use(require('./routes/index'))

//lectura de datos
const prod_list = 'select * from productos;'

app.listen(port, () => {
    console.log('App listening at port: '+port)
  })

