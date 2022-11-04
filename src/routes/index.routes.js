const express = require('express');
const router = express.Router();
const userRoutes = require('./usuario.routes');

router.use('/usuario', userRoutes);

module.exports = router;