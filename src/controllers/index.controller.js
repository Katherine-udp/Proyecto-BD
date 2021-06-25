const {Pool} =require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'StockManagement',
    password: '',
    port: 5432,
});
//1) ayuda no se como hacer que getProds pueda insertar los como json en src/routes/index.js ;_;
const getProds = function(req,res){
    var data;
    pool.query('select * from productos order by codigo asc;',(error,results)=>{
        if (error) {
            console.log(error.stack)
          } else {
            res.status(200).json(results.rows);
            data = results.rows;
          }
    })
    return data;
}

const setProds = (req,res)=>{
    const {codigo,nombre,precio,costo,stock} = req.body;
     pool.query('insert into productos (codigo,nombre,precio,costo,stock) values ($1,$2,$3,$4,$5)',[codigo,nombre,precio,costo,stock]);
    res.send('product created');
}

const displayHome = function(req,res){
    pool.query('select * from productos order by codigo asc;',(error,results)=>{
        if (error) {
            console.log(error.stack)
          } else {
            res.render('index.ejs',{prods:results.rows});
          }
    })
} 

module.exports = {
    getProds,
    setProds,
    displayHome
}