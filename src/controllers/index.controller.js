const {Pool} =require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'StockManagement',
    password: '',
    port: 5432,
});
//1) ayuda no se como hacer que getProds pueda insertar los como json en src/routes/index.js ;_;
const createProd = (req, res) => {
  const { nombre, precio,costo,stock } = req.body

  pool.query('INSERT INTO productos (codigo,nombre, precio,costo) VALUES ((select max(codigo)+1 from productos), $1,$2,$3)', [ nombre, precio, costo], (error, results) => {
    if (error) {
      throw error
    }
    console.log("producto agregado");
  })

  pool.query('INSERT INTO stocks (codigo_producto,stock) VALUES ((select max(codigo) from productos),$1)',[stock], (error, results) => {
    if (error) {
      throw error
    }
 });
 res.redirect('/costos')
}



const deleteProd = (req,res)=>{
  const id = req.params.id;
  pool.query("delete from productos where codigo=$1",[id], (error,results)=>{
    if (error) {
      throw error
    }
  });
  pool.query("delete from stocks where codigo_producto=$1",[id], (error,results)=>{
    if (error) {
      throw error
    }
  }); 
  console.log('producto eliminado');
   res.redirect('/costos');
}


const updateProds = (req,res)=>{
    const {stock,codigo} = req.body;
     pool.query('update stocks set stock=$1 where codigo_producto= $2',[stock,codigo]);
     console.log("producto actualizado");
     res.redirect('/');
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
};



const ventas = function(req,res){

  sql = 'select boletas.fecha,boletas.codigo,total_compra as total,trabajadores.nombre as vendedor,ARRAY_AGG(productos.nombre) as arr_nombre,ARRAY_AGG(cantidad) as arr_cantidad,ARRAY_AGG(productos.precio) as arr_precio from boletas,detalles,productos,trabajadores where trabajadores.rut_trabajadores=boletas.rut_trabajador and boletas.codigo=detalles.codigo_boleta and productos.codigo=detalles.codigo_producto group by boletas.codigo,total_compra,trabajadores.nombre order by codigo asc;';
  pool.query(sql,(error,results)=>{
    if (error) {
        console.log(error.stack)
      } else {
        res.render('partials/ventas',{ventas:results.rows});
      }
    })
}

const maximo = function(req,res){
  pool.query('select t1.codigo,t1.total,nombre from productos,(select productos.codigo as codigo,sum(cantidad) as total from productos,detalles,boletas where (select extract(month from boletas.fecha))=4 and boletas.codigo= detalles.codigo_boleta and detalles.codigo_producto=productos.codigo group by productos.codigo order by codigo asc) as t1 where t1.total=(select max(t1.total) from (select productos.codigo as codigo,sum(cantidad) as total from productos,detalles,boletas where (select extract(month from boletas.fecha))=4 and boletas.codigo= detalles.codigo_boleta and detalles.codigo_producto=productos.codigo group by productos.codigo order by codigo asc) as t1) and productos.codigo=t1.codigo;',
    (error,results)=>{
      if (error) {
        console.log(error.stack)
      } else {
        console.log(results.rows)
        res.render('partials/maximo',{mejor:results.rows})
      }
    }
  )
}

const grafica = function(req,res){

}

/* const boleta= function(req,res){

    res.render('partials/boleta');		
}*/


 const boleta = (req, res) => {
/*  const { rut_trabajador,hora,total_compra,codigo_producto,cantidad } = req.body
	

  pool.query('INSERT INTO boletas (codigo,rut_trabajador, fecha ,hora, total_compra) VALUES ((select max(codigo)+1 from productos), $1,$2,$3)', [ rut_trabajador, hora ,total_compra], (error, results) => {
    if (error) {
      throw error
    }
    console.log("Boleta agregada");
  })  

  pool.query('INSERT INTO detalles (codigo,codigo_boleta,codigo_producto,cantidad) VALUES ((select max(codigo)+1 from detalles),(select max(codigo) from boletas),$1,$2)',[codigo_producto,cantidad], (error, results) => {
    if (error) {
      throw error
    }
 });*/
 res.render('partials/boleta');
}


module.exports = {
    updateProds,
    costos,
    bodega,
    ventas,
    createProd,
    maximo,
    boleta,
    deleteProd
}
