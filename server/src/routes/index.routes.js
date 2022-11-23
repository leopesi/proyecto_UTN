const app = require('express');
const userRoutes = require('./usuario.routes');
const authRoutes = require('./auth.routes')

require(userRoutes(app), authRoutes(app));

