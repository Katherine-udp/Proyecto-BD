const { Router, response } = require('express');
const router = Router();
const { getProds,setProds, displayHome } = require('../controllers/index.controller')
router.get('/prods',getProds);
router.post('/prods',setProds);

//1) aqui es donde no funciona getProds
router.get('/',displayHome);
module.exports = router;