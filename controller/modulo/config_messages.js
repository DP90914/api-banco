const { status } = require("express/lib/response")

/************************************************************************************************************************************************
 * Objetivo: arquivo responsavel pela padronização de todas a mensagens da API projetos de Filmes
 * Data: 07/10/2025
 * Autor: Gustavo de Paula Silva
 * Versão:1.0
*******************************************************************************************************************************************************/
const dataAtual = new Date()
/****************************************************MENSAGENS DE PADRONIZAÇÃO DO PROJETO**************************************************************/
const HEADER = {
    development: "Gustavo de Paula Silva",
    api_description: "api para manipular a locadora de filmes",
    version: "1.0.10.25",
    request_date: dataAtual.toLocaleDateString(),
    status:  Boolean,
    status_code: Number,
    response: {},
}
/********************************************************MENSAGENS DE ERRO DO PROJETO******************************************************************/

const ERROR_NOT_FOUND = {
    status: false,
    status_code: 404,
    message: "dados NÃO foram encontrados"
}

const ERROR_INTERNAL_SERVER_MODEL = {
    status: false,
    status_code: 500,
    message: "NÃO foi possivel processar a requisição, devido a problemas na camada da modelagem de dados!!!",
}

const ERROR_INTERNAL_SERVER_CONTROLLER = {
    status: false,
    status_code: 500,
    message: "NÃO foi possivel processar a requisição, devido a problemas na camada da controle de dados!!!",
}

const ERROR_REQUIRED_FIELDS ={
    status: false,
    status_code: 400, 
    message: "NÃO foi possivel processar a requisição, devido a campos obrigatorios que NÃO foram enviados corretamente, conforme a documentação da API!!!"
}
const ERROR_CONTENT_TYPE = {
    status: false,
    status_code: 415,
    message: "NÃO foi possivel processar a requisição, pois o tipo de conteudo enviado no body não é permitido, apenas permitido JSON!!!",
}
/*******************************************************MENSAGENS DE SUCESSO DO PROJETO****************************************************************/
const SUCESS_REQUEST = {
    status: true,
    status_code: 200,
    message: "Requisição bem sucedida!!!"
}
const SUCESS_CREATED_ITEM = {
    status: true,
    status_code: 201,
    message: "Requisição bem sucedida, objeto criado com sucesso!!!"
}




module.exports = {
    HEADER,
    SUCESS_REQUEST,
    ERROR_NOT_FOUND,
    ERROR_INTERNAL_SERVER_MODEL,
    ERROR_INTERNAL_SERVER_CONTROLLER,
    ERROR_REQUIRED_FIELDS,
    SUCESS_CREATED_ITEM,
    ERROR_CONTENT_TYPE

}