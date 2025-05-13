const express = require('express');
const app = express();
const personRoutes = require('./routes/person.routes');

app.use(express.json());
app.use('/person', personRoutes);

app.get('/', (req, res) => {
  res.send('API is working ✅');
});

module.exports = app;
