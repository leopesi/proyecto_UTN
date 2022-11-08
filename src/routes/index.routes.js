const express = require('express');
const router = express.Router();
const userRoutes = require('./usuario.routes');
const authRoutes = require('./auth.routes')

router.use('/', userRoutes, authRoutes);

module.exports = router;