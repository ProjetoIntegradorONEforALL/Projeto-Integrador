const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

// Middlewares básicos
app.use(express.json());

// Rotas
const personRoutes = require('./routes/person.routes');
const actuatorsRouter = require('./routes/actuators');
const sensorsRouter = require('./routes/sensors');
const authRouter = require('./routes/auth');
const monitoringRouter = require('./routes/monitoring');
const dashboardRouter = require('./routes/dashboard');

app.use('/api/v1/person', personRoutes);
app.use('/api/v1/actuators', actuatorsRouter);
app.use('/api/v1/sensors', sensorsRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/auth/login', authRouter);
app.use('/api/v1/monitoring', monitoringRouter);
app.use('/api/v1/dashboard', dashboardRouter);

module.exports = app;