const express = require('express');
const cors = require('cors');
const app = express();
const connection = require('../src/services/database');

app.use(cors());

// Middlewares básicos
app.use(express.json());

// async function testDbConnection() {
//     try {
//       // Tenta obter um cliente do pool e liberar imediatamente
//       // Isso força o pool a tentar estabelecer uma conexão.
//       const client = await db.pool.connect();
//       client.release(); // Libera o cliente de volta para o pool
//       console.log('✔ Conexão bem-sucedida com o PostgreSQL!');
//     } catch (error) {
//       console.error('✖ Falha ao conectar ao PostgreSQL:', error.message);
//       console.error('Por favor, verifique as variáveis de ambiente (DB_HOST, DB_USER, etc.) e se o contêiner do DB está rodando e acessível.');
//       process.exit(1); // Encerra o processo se não conseguir conectar ao DB
//     }
//   }

//   testDbConnection();
  

// Rotas
const personRoutes = require('./routes/person.routes');
const actuatorsRouter = require('./routes/actuators');
const sensorsRouter = require('./routes/sensors');
const authRouter = require('./routes/auth');
const monitoringRouter = require('./routes/monitoring');
const dashboardRouter = require('./routes/dashboard');
const chatbotRouter = require('./routes/chatbot');
const receiveRouter = require('./routes/data');

app.use('/api/v1/person', personRoutes);
app.use('/api/v1/actuators', actuatorsRouter);
app.use('/api/v1/sensors', sensorsRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/auth/login', authRouter);
app.use('/api/v1/monitoring', monitoringRouter);
app.use('/api/v1/dashboard', dashboardRouter);
app.use('/api/v1/chatbot', chatbotRouter);
app.use('/api/v1/receive', receiveRouter);


module.exports = app;