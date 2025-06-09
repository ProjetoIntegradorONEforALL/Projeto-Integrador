const express = require('express');
const app = express();

// Middlewares básicos
app.use(express.json());

// Rotas
const personRoutes = require('./routes/person.routes');
const actuatorsRouter = require('./routes/actuators');
const sensorsRouter = require('./routes/sensors');
const authRouter = require('./routes/auth');

app.use('/api/v1/person', personRoutes);
app.use('/api/v1/actuators', actuatorsRouter);
app.use('/api/v1/sensors', sensorsRouter);
app.use('/api/v1/auth', authRouter);

module.exports = app;