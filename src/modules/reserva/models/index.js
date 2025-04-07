const { pool } = require('../../../config/database');

class ReservaModel {
    static async criarReserva(id, cliente_id, sala, data_hora_inicio, data_hora_termino, status) {
        const dados = [
            id,
            cliente_id,
            sala,
            data_hora_inicio,
            data_hora_termino,
            status
        ];
        const consulta = `insert into reserva(id, cliente_id, sala, data_hora_inicio, data_hora_termino, status)
                            values ($1, $2, $3, $4, $5, $6) returning *`;
        const novoCliente = await pool.query(consulta, dados);
        return novoCliente.rows
    }

    static async editarReserva(id, cliente_id, sala, data_hora_inicio, data_hora_termino, status) {
        const dados = [
            id,
            cliente_id,
            sala,
            data_hora_inicio,
            data_hora_termino,
            status
        ];
        const consulta = `update reserva set cliente_id = $2, sala = $3, data_hora_inicio = $4,
                            data_hora_termino = $5, status = $6 where id = $1 returning *`;
        const reservaEditada = await pool.query(consulta, dados);
        return reservaEditada.rows
    }

    static async listarReservas() {
        const consulta = `select * from reserva`;
        const clientes = await pool.query(consulta);
        return clientes.rows
    }

    static async listarReservaID(id) {
        const dado = [id];
        const consulta = `select * from reserva where id = $1`;
        const cliente = await pool.query(consulta, dado);
        return cliente.rows
    }

    static async excluirReservas() {
        const consulta = `delete from reserva returning *`
        await pool.query(consulta);
    }

    static async excluirReservaID(id) {
        const dados = [id];
        const consulta = `delete from reserva where id = $1 returning *`;
        await pool.query(consulta, dados);
    }
}

module.exports = ReservaModel;