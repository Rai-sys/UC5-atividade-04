const express = require('express'); // biblioteca (sempre em cima) 
const ReservaController = require('../../reserva/controller/index');

// sistema de roteamento do express (todo gereciamento de rota dentro do router)
const router = express.Router()

// criando
router.post("/reserva", ReservaController.criarReserva)  // passando o path e pegando a funçao de criar no controller

// listando todos
router.get("/reserva", ReservaController.listarReservas) // passando o path e pegando a funçao de listar todos no controller

// listando por id
router.get("/reserva/:id", ReservaController.listarReservaID) // passando o path e pegando a funçao de listar por matricula no controller

// editando por id
router.put("/reserva/:id", ReservaController.editarReserva) // passando o path e pegando a funçao de editar no controller

// excluindo todos
router.delete("/reserva", ReservaController.excluirReservas) // passando o path e pegando a funçao de excluir todos no controller

// excluindo por matricula
router.delete("/reserva/:id", ReservaController.excluirReservaID) //passando o path e pegando a funçao de excluir por matricula no controller

module.exports = router;