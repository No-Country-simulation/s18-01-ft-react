const { registerEmp, loginEmp } = require('../controller/emp.controller.js');
const express = require('express');
const router = express.Router();

router.post('/register', registerEmp);
router.post('/login', loginEmp);

module.exports = router;