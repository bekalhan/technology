const express = require('express');
const { requireSignin, userMiddleware } = require('../middleware');
const { addAddress, getAddress } = require('../controllers/address');
const router = express.Router();


router.post('/user/address/create', requireSignin, userMiddleware, addAddress);
router.post('/user/getaddress', requireSignin, userMiddleware, getAddress);

module.exports = router;