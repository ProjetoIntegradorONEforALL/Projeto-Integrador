require('dotenv').config();
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { createServer } = require('http');
const { Server } = require('socket.io');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./config/swagger.json');
const cache = require('./services/cache');


const app = require('./app');
const httpServer = createServer(app);
const io = new Server(httpServer);

// Middlewares de segurança e utilitários
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(helmet());
app.use(limiter);

// Documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rota de teste
app.get('/', (req, res) => {
  res.send('API is working ✅');
});

// Socket.IO
io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('subscribe', (deviceId) => {
    socket.join(`device:${deviceId}`);
    console.log(`Client subscribed to device:${deviceId}`);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Middleware para emitir eventos Socket.IO
app.use((req, res, next) => {
  res.on('finish', () => {
    if (req.method === 'POST' && req.url === '/api/v1/actuators/receive') {
      const data = req.body;
      io.to(`device:${data.device}`).emit('update', data);
      console.log(`Dados emitidos via Socket.IO para device:${data.device}`);
    }
  });
  next();
});

// Middleware de erro global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Something went wrong!',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});