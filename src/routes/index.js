const { Router, response } = require('express');
const router = Router();
const { getProds,setProds, bodega,getProd,costos,ventas } = require('../controllers/index.controller')
router.get('/prods',getProds);
router.get('/prods/:id',getProd);
router.post('/prods',setProds);

router.get('/costos',costos);
router.get('/ventas',ventas);
router.get('/',bodega);
module.exports = router;