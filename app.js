//paquete pg de nodejs
const express = require('express')
const { Client, Query } = require('pg');
const app = express()
const port = 3000

//conexion a la base de datos
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'StockManagement',
    password: '',
    port: 5432,
});

client.connect();

//lectura de datos
const prod_list = 'select * from productos;'

client.query(prod_list, (err, res) => {
    if (err) {
        console.error('This does not work',err);
        return;
    }
    for (let row of res.rows) {
        console.log(row);
    }
    client.end();
});
app.listen(port, () => {
    console.log(`Example app listening at port: ${port}`)
  })

