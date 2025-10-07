/************************************************************************************************************************************************
 * Objetivo: arquivo responsavel pela padronização de todas a mensagens da API projetos de Filmes
 * Data: 07/10/2025
 * Autor: Gustavo de Paula Silva
 * Versão:1.0
*******************************************************************************************************************************************************/
const dataAtual = new Date()
/****************************************************MENSAGENS DE PADRONIZAÇÃO DO PROJETO**************************************************************/
const MESSAGE_HEADER = {
    development: "Gustavo de Paula Silva",
    api_description: "api para manipular a locadora de filmes",
    version: "1.0.10.25",
    request_date: dataAtual.toLocaleDateString(),
    status:  Boolean,
    status_code: Number,
    response: {},
}
/********************************************************MENSAGENS DE ERRO DO PROJETO******************************************************************/

/*******************************************************MENSAGENS DE SUCESSO DO PROJETO****************************************************************/
const MESSAGE_SUCESS_REQUEST = {
    status: true,
    statuscode: 200,
    message: "Requisição bem sucedida!!!"
}





module.exports = {
    MESSAGE_HEADER,
    MESSAGE_SUCESS_REQUEST
}