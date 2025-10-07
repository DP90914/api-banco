/************************************************************************************************************************************************
 * Objetivo: arquivo responsavel pela maniplação de dados entre o APP e a Model (Validações, tratamento de dados, tratamento de erros, etc)
 * Data: 07/10/2025
 * Autor: Gustavo de Paula Silva
 * Versão:1.0
*******************************************************************************************************************************************************/

//Import do arqivo DAO para manipular o CRUD no DB
const filmeDAO = require("../../model/DAO/filme.js")
//Import do arquivo que padroniza as menssgens
const MESSAGE_DEFAUT = require("../modulo/config_messages.js")

//retorna um lista de filmes
const listarFilmes = async function() {
    //Chama a função do DAO para retornar a lista de filmes
    let result = await filmeDAO.getSelectAllFilms()
    if(result){
        if(result.length > 0){
            MESSAGE_DEFAUT.MESSAGE_HEADER.status = MESSAGE_DEFAUT.MESSAGE_SUCESS_REQUEST.status
            MESSAGE_DEFAUT.MESSAGE_HEADER.status_code = MESSAGE_DEFAUT.MESSAGE_SUCESS_REQUEST.statuscode
            MESSAGE_DEFAUT.MESSAGE_HEADER.response.films = result
            return MESSAGE_DEFAUT.MESSAGE_HEADER 
        }
    }else{

    } 
}
//retorna um filme filtrando por id
const buscarFilmeId = async function(id) {
    
}

//Insere um novo fime
const inserirFilme = async function(filme) {
    
}

//atualiza um filme
const atualizarFilme = async function(filme, id) {
    
}

const excluirFilme = async function (id) {
    
}
module.exports = {
    listarFilmes
}