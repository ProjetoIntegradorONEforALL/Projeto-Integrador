// src/config/db.js (exemplo com pg para PostgreSQL)
const { Pool } = require('pg'); // ou require('mysql2') para MySQL

// Configurações de conexão usando variáveis de ambiente
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: { // O RDS geralmente exige SSL/TLS para conexões externas
    rejectUnauthorized: false // Pode ser necessário para conexões de desenvolvimento local
  }
});

// Testar a conexão (opcional, mas recomendado)
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Erro ao adquirir cliente do pool', err.stack);
  }
  client.query('SELECT NOW()', (err, result) => {
    release();
    if (err) {
      return console.error('Erro ao executar a query de teste', err.stack);
    }
    console.log('Conexão com o banco de dados RDS estabelecida com sucesso!');
    // console.log(result.rows); // Opcional: mostra o resultado da query de teste
  });
});

// Exportar o pool para ser usado em outras partes do aplicativo
module.exports = pool;
