const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORTA;
const app = express();

app.use(express.json());

// porta do servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });