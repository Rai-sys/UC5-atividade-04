const express = require('express');
const dotenv = require('dotenv');
const clienteRoutes = require('./src/modules/cliente/routes/index')
dotenv.config();

const port = process.env.PORTA;
const app = express();

app.use(express.json());

app.use(clienteRoutes)

// porta do servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });