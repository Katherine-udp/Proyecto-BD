const {Pool} =require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'StockManagement',
    password: '',
    port: 5432,
});

const getProds = async (req,res)=>{
    const response = await pool.query('select * from productos;')
    res.status(200).json(response.rows);
}
const setProds = async (req,res)=>{
    const {codigo,nombre,precio,costo,stock} = req.body;
    await pool.query('insert into productos (codigo,nombre,precio,costo,stock) values ($1,$2,$3,$4,$5)',[codigo,nombre,precio,costo,stock]);
    res.send('product created');
}
module.exports = {
    getProds,
    setProds
}