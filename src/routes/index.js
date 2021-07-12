const { Router } = require('express');
const router = Router();
const { deleteProd,createProd,updateProds,costos,ventas,bodega,maximo,boleta} = require('../controllers/index.controller')
//router.get('/prods',getProds);
//router.get('/prods/:id',getProd);
router.post('/costos', createProd);
//router.delete('/costos/:codigo',deleteproduct);
router.get('/boleta', boleta);
router.get('/delete/:id',deleteProd);
router.get('/maximo',maximo);
router.get('/costos',costos);
router.get('/ventas',ventas);
router.get('/',bodega);
router.post('/',updateProds);
module.exports = router;