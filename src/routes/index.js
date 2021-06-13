const { Router } = require('express');
const router = Router();
const { getProds,setProds } = require('../controllers/index.controller')
router.get('/prods',getProds);
router.post('/prods',setProds);

module.exports = router;