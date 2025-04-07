const express = require('express'); // biblioteca (sempre em cima) 
const ClienteController = require('../../cliente/controller/index');

// sistema de roteamento do express (todo gereciamento de rota dentro do router)
const router = express.Router()

// criando
router.post("/cliente", ClienteController.criarCliente)  // passando o path e pegando a funçao de criar no controller

// listando todos
router.get("/cliente", ClienteController.listarClientes) // passando o path e pegando a funçao de listar todos no controller

// listando por id
router.get("/cliente/:id", ClienteController.listarClienteID) // passando o path e pegando a funçao de listar por matricula no controller

// editando por id
router.put("/cliente/:id", ClienteController.editarCliente) // passando o path e pegando a funçao de editar no controller

// excluindo todos
router.delete("/cliente", ClienteController.excluirClientes) // passando o path e pegando a funçao de excluir todos no controller

// excluindo por matricula
router.delete("/cliente/:id", ClienteController.excluirClienteID) //passando o path e pegando a funçao de excluir por matricula no controller

module.exports = router;