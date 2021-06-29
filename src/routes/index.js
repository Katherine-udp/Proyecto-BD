const { Router } = require('express');
const router = Router();
const { getProds,updateProds,getProd,costos,ventas,bodega,createProduct } = require('../controllers/index.controller')
router.get('/prods',getProds);
router.get('/prods/:id',getProd);
//router.post('/costos', createProduct)
//router.delete('/costos/:codigo',deleteproduct);


router.get('/costos',costos);
router.get('/ventas',ventas);
router.get('/',bodega);
router.post('/',updateProds);
module.exports = router;
