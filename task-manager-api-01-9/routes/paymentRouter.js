const { Router } = require('express');
const auth = require('../middleware/authMiddleware');
const { paymentVerify, createOrder } = require('../controllers/paymentController');

const router = Router();

router.post('/order', auth, createOrder);

router.post('/verify', auth, paymentVerify);

module.exports = router;
