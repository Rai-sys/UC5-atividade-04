const {pool} = require('../../../config/database');

class ClienteModel {
    static async criarCliente(id, usuario, email) {
        const dados = [id, usuario, email];
        const consulta = `insert into cliente(id, usuario, email) values ($1, $2, $3) returning *`;
        const novoCliente = await pool.query(consulta, dados);
        return novoCliente.rows
    }

    static async editarCliente(id, usuario, email) {
        const dados = [id, usuario, email];
        const consulta = `update cliente set usuario = $2, email = $3 where id = $1 returning *`;
        const clienteEditado = await pool.query(consulta, dados);
        return clienteEditado.rows
    }

    static async listarClientes() {
        const consulta = `select * from cliente`;
        const clientes = await pool.query(consulta);
        return clientes.rows
    }

    static async listarClienteID(id) {
        const dado = [id];
        const consulta = `select * from cliente where id = $1`;
        const aluno = await pool.query(consulta, dado);
        return aluno.rows
    }

    static async excluirCliente() {
        const consulta = `delete from cliente returning *`;
        await pool.query(consulta);
    }

    static async excluirClienteID(id) {
        const dados = [id];
        const consulta = `delete from cliente where id = $1 returning *`;
        await pool.query(consulta, dados)
    }
}

module.exports = ClienteModel;