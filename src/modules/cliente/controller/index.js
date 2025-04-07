const ClienteModel = require('../../cliente/models/index');

class ClienteController {
    static async criarCliente(requisicao, resposta) {
        try {
            const { id, usuario, email } = requisicao.body  // passando os dados da requisicao
            if (!id || !usuario || !email) {
                return resposta.status(400).json({ mensagem: "Todos os campos devem ser preenchidos!" })
            }
            const novoCliente = await ClienteModel.criarCliente(id, usuario, email);
            resposta.status(201).json({ mensagem: "Cliente criado com sucesso", cliente: novoCliente })
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao criar cliente.", erro: error.message })
        }
    }

    static async editarCliente(requisicao, resposta) {
        try {
            const id = requisicao.params.id
            const { usuario, email } = requisicao.body  // passando parametro para editar
            if (!usuario || !email) {
                return resposta.status(400).json({ mensagem: "Todos os campos devem ser preenchidos" })
            }
            const cliente = await ClienteModel.editarCliente(id, usuario, email)
            if (cliente.length === 0) {
                return resposta.status(400).json({ mensagem: "Cliente não encontrado para editar." })
            }
            resposta.status(200).json({ mensagem: "Cliente editado com sucesso!", clienteEditado: cliente })
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao atualizar os dados.", erro: error.message })
        }
    }

    static async listarClientes(requisicao, resposta) {
        try {
            const clientes = await ClienteModel.listarClientes()
            if (clientes.length === 0) {
                return resposta.status(400).json({ mensagem: "Nenhum cliente cadastrado." })
            }
            resposta.status(200).json(clientes)
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao listar clientes.", erro: error.message })
        }
    }

    static async listarClienteID(requisicao, resposta) {
        try {
            const id = requisicao.params.id
            const cliente = await ClienteModel.listarClienteID(id)
            if (cliente.length === 0) {
                return resposta.status(400).json({ mensagem: "Nenhum cliente cadastrado." })
            }
            resposta.status(200).json(cliente)
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao listar cliente selecionado.", erro: error.message })
        }
    }

    static async excluirClientes(requisicao, resposta) {
        try {
            await ClienteModel.excluirCliente()
            resposta.status(200).json({ mensagem: "Todos os clientes foram excluidos." })
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao apagar todos os clientes.", erro: error.message })
        }
    }

    static async excluirClienteID(requisicao, resposta) {
        try {
            const id = requisicao.params.id       
            const cliente = await ClienteModel.listarClienteID(id) // verificar se o aluno existe pela matricula NA LISTA
            if (!cliente) {                                           // se não encontrar...
                return resposta.status(400).json({ mensagem: "Cliente não encontrado" })
            }
            await ClienteModel.excluirClienteID(id)    // apagando aluno se for encontrado
            resposta.status(200).json({ mensagem: "Cliente excluido com sucesso!" })
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao excluir o cliente.", erro: error.message })
        }
    }
}

module.exports = ClienteController;