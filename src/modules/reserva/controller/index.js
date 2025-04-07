const ReservaModel = require('../../reserva/models/index');

class ReservaController {
    static async criarReserva(requisicao, resposta) {
        try {
            const { id, cliente_id, sala, data_hora_inicio, data_hora_termino, status} = requisicao.body 
            if (!id || !cliente_id || !sala || !data_hora_inicio || !data_hora_termino || !status) {
                return resposta.status(400).json({ mensagem: "Todos os campos devem ser preenchidos!" })
            }
            const novaReserva = await ReservaModel.criarReserva(id, cliente_id, sala, data_hora_inicio, data_hora_termino, status);
            resposta.status(201).json({ mensagem: "Reserva criada com sucesso", reserva: novaReserva })
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao criar reserva.", erro: error.message })
        }
    }

    static async editarReserva(requisicao, resposta) {
        try {
            const id = requisicao.params.id
            const {cliente_id, sala, data_hora_inicio, data_hora_termino, status} = requisicao.body  // passando parametro para editar
            if (!cliente_id || !sala || !data_hora_inicio || !data_hora_termino || !status) {
                return resposta.status(400).json({ mensagem: "Todos os campos devem ser preenchidos" })
            }
            const reserva = await ReservaModel.editarReserva(id, cliente_id, sala, data_hora_inicio, data_hora_termino, status)
            if (reserva.length === 0) {
                return resposta.status(400).json({ mensagem: "Reserva não encontrado para editar." })
            }
            resposta.status(200).json({ mensagem: "Reserva editada com sucesso!", reservaEditada: reserva })
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao atualizar os dados.", erro: error.message })
        }
    }

    static async listarReservas(requisicao, resposta) {
        try {
            const reservas = await ReservaModel.listarReservas()
            if (reservas.length === 0) {
                return resposta.status(400).json({ mensagem: "Nenhuma reserva cadastrada." })
            }
            resposta.status(200).json(reservas)
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao listar as reservas.", erro: error.message })
        }
    }

    static async listarReservaID(requisicao, resposta) {
        try {
            const id = requisicao.params.id
            const reserva = await ReservaModel.listarReservaID(id)
            if (reserva.length === 0) {
                return resposta.status(400).json({ mensagem: "Nenhuma reserva cadastrada." })
            }
            resposta.status(200).json(reserva)
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao listar reserva selecionada.", erro: error.message })
        }
    }

    static async excluirReservas(requisicao, resposta) {
        try {
            await ReservaModel.excluirReservas()
            resposta.status(200).json({ mensagem: "Todas as reservas foram excluidas." })
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao apagar todas as reservas.", erro: error.message })
        }
    }

    static async excluirReservaID(requisicao, resposta) {
        try {
            const id = requisicao.params.id       
            const reserva = await ReservaModel.excluirReservaID(id) // verificar se o aluno existe pela matricula NA LISTA
            if (!reserva) {                                           // se não encontrar...
                return resposta.status(400).json({ mensagem: "Reserva excluida!." })
            }
            await ReservaModel.excluirReservaID(id)    // apagando aluno se for encontrado
            resposta.status(200).json({ mensagem: "Rserva excluida com sucesso!" })
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao excluir a reserva.", erro: error.message })
        }
    }
}

module.exports = ReservaController;