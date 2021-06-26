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

const getProd = function(req,res){
    const id = parseInt(req.params.id)
    pool.query('select * from productos where codigo = $1',[id],(error,results)=>{
        if (error) {
            console.log(error.stack)
          } else {
            res.status(200).json(results.rows);
          }
    })
}

const setProds = (req,res)=>{
    const {codigo,nombre,precio,costo} = req.body;
     pool.query('insert into productos (codigo,nombre,precio,costo) values ($1,$2,$3,$4)',[codigo,nombre,precio,costo]);
    res.send('product created');
}

const bodega = function(req,res){
    pool.query('select codigo,nombre,stock from productos,stocks where productos.codigo=stocks.codigo_producto order by codigo asc;',(error,results)=>{
        if (error) {
            console.log(error.stack)
          } else {
            res.render('index',{prods:results.rows});
          }
    })
};
const costos = function(req,res){
  pool.query('select * from productos order by codigo asc;',(error,results)=>{
      if (error) {
          console.log(error.stack)
        } else {
          res.render('partials/costos',{prods:results.rows});
        }
  })
} 
const ventas = function(req,res){
  sql = 'select boletas.codigo,total_compra,trabajadores.nombre as vendedor,ARRAY_AGG(productos.nombre) as arr_nombre,ARRAY_AGG(cantidad) as arr_cantidad,ARRAY_AGG(productos.precio) as arr_precio from boletas,detalles,productos,trabajadores where trabajadores.rut_trabajadores=boletas.rut_trabajador and boletas.codigo=detalles.codigo_boleta and productos.codigo=detalles.codigo_producto group by boletas.codigo,total_compra,trabajadores.nombre order by codigo;';
  pool.query(sql,(error,results)=>{
    if (error) {
        console.log(error.stack)
      } else {
        res.render('partials/ventas',{ventas:results.rows});
        console.table(results.rows);
      }
    })

  pool.query('select * boletas order by codigo asc;',(error,results)=>{
      if (error) {
          console.log(error.stack)
        } else {
          res.render('partials/ventas',{prods:results.rows});
        }
  })
} 
module.exports = {
    getProd,
    getProds,
    setProds,
    costos,
    bodega,
    ventas
}