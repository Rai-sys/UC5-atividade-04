const axios = require('axios');
const { pool } = require('../../../config/database');

class EnderecoModel {
    static async criarEndereco(cliente_id, cep, numero, bairro) {
        const resposta = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        const { logradouro, complemento, localidade, uf } = resposta.data
        
        const dados = [
            cliente_id,
            cep,
            logradouro,
            complemento,
            numero,
            bairro,
            localidade,
            uf
        ];

        const consulta = `insert into endereco(cliente_id, cep, logradouro, complemento, numero, bairro, localidade, uf) 
                            values ($1, $2, $3, $4, $5, $6, $7, $8) returning *`;
        const resultado = await pool.query(consulta, dados);
        return resultado.rows
    }

    static async editarEndereco(id, cliente_id, cep, numero, bairro) {
        const resposta = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        const { logradouro, complemento, localidade, uf } = resposta.data

        const dados = [
            cliente_id,
            cep,
            logradouro,
            complemento,
            numero,
            bairro,
            localidade,
            uf
        ];

        const consulta = `update endereco set cep = $2, logradouro = $3, complemento = $4,
        numero = $5, bairro = $6, localidade = $7, uf = $8 where cliente_id = $1`;
        const resultado = await pool.query(consulta, dados);
        return resultado.rows
    }

    static async listarEnderecos() {
        const consulta = `select * from endereco`
        const resultado = await pool.query(consulta)
        return resultado.rows
    }

    static async listarEnderecoCEP(cep) {
        const dados = [cep]
        const consulta = `select * from endereco where cep = $1`
        const resultado = await pool.query(consulta, dados)
        return resultado.rows
    }
}