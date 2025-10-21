/************************************************************************************************************************************************
 * Objetivo: arquivo responsavel pela maniplação de dados entre o APP e a Model (Validações, tratamento de dados, tratamento de erros, etc)
 * Data: 07/10/2025
 * Autor: Gustavo de Paula Silva
 * Versão:1.0
*******************************************************************************************************************************************************/

//Import do arqivo DAO para manipular o CRUD no DB
const res = require("express/lib/response.js")
const filmeDAO = require("../../model/DAO/filme.js")
//Import do arquivo que padroniza as menssgens
const MESSAGE_DEFAUT = require("../modulo/config_messages.js")

//retorna um lista de filmes
const listarFilmes = async function() {
    //realizando uma copia do odjeto MESSAGE_DEFAUT, permitindo que as alterações desta função não interfira nas demais
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAUT))
    try {
         //Chama a função do DAO para retornar a lista de filmes
        let result = await filmeDAO.getSelectAllFilms()

        if(result){
            if(result.length > 0){
                MESSAGE.HEADER.status = MESSAGE.SUCESS_REQUEST.status
                MESSAGE.HEADER.status_code = MESSAGE.SUCESS_REQUEST.status_code
                MESSAGE.HEADER.response.films = result
                return MESSAGE.HEADER //200
            }else{
            return MESSAGE.ERROR_NOT_FOUND //400
            } 
        }else{
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
        }

    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}
//retorna um filme filtrando por id
const buscarFilmeId = async function(id) {
    //realizando uma copia do odjeto MESSAGE_DEFAUT, permitindo que as alterações desta função não interfira nas demais
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAUT))
    try {
        // validação de campo obrigatorio
        if(id != '' && id != null && id != undefined && !isNaN(id) && id > 0){
            let result = await filmeDAO.getSelectByIdFilms(parseInt(id))
            if(result){
                if(result.length > 0){
                    MESSAGE.HEADER.status = MESSAGE.SUCESS_REQUEST.status
                    MESSAGE.HEADER.status_code = MESSAGE.SUCESS_REQUEST.status_code
                    MESSAGE.HEADER.response.film = result
                    return MESSAGE.HEADER
                }else{
                    return MESSAGE.ERROR_NOT_FOUND //404
                }
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 404
            }
        }else{
            MESSAGE.ERROR_NOT_FOUND.invalid_field =  'atributo [ID] invalido'
            return MESSAGE.ERROR_REQUIRED_FIELDS // 400
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

//Insere um novo fime
const inserirFilme = async function(filme, contentType) {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAUT))
    try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            //chama a função de validação dos dados de cadastro
            let validarDados = await validarDadosFilme(filme)
            if(!validarDados){
                let result = await filmeDAO.setInsertFilm(filme)
                if(result){
                    //Chama a função para receber o ID gerado no DB
                    let lastIdFilme = await filmeDAO.getSelectLastIdfilm()
                    if(lastIdFilme){
                        //Adiciona no JSON o id criado no DB
                        filme.id                    =   lastIdFilme 
                        MESSAGE.HEADER.status       =   MESSAGE.SUCESS_CREATED_ITEM.status
                        MESSAGE.HEADER.status_code  =   MESSAGE.SUCESS_CREATED_ITEM.status_code
                        MESSAGE.HEADER.message      =   MESSAGE.SUCESS_CREATED_ITEM.message
                        MESSAGE.HEADER.response     =   filme
                        return MESSAGE.HEADER
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                }else{
                    return MESSAGE.ERROR_NOT_FOUND //404
                }
            }else{
                return validarDados
            }
        } else{
            return MESSAGE.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//atualiza um filme
const atualizarFilme = async function(filme, id, contentType) {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAUT))
    try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            //chama a função de validação dos dados de cadastro
            let validarDados = await validarDadosFilme(filme)
            if(!validarDados){
                
                let validarID = await buscarFilmeId(id)

                //verifica se o ID existe no DB, caso exista teremos um 200
                if(validarID.status_code == 200){
                    // Adicionado o ID no JSon com os dados do filme
                    filme.id = parseInt(id)
                    let result = await filmeDAO.setUpdateFilme(filme)
                    if(result){
                        MESSAGE.HEADER.status       =   MESSAGE.SUCESS_UPDATED_ITEM.status
                        MESSAGE.HEADER.status_code  =   MESSAGE.SUCESS_UPDATED_ITEM.status_code
                        MESSAGE.HEADER.message      =   MESSAGE.SUCESS_UPDATED_ITEM.message
                        MESSAGE.HEADER.response     =   filme
                        return MESSAGE.HEADER //200
                    }else{
                        return MESSAGE.ERROR_NOT_FOUND//404
                    }
                }else{
                    return validarID // Retorno da função de buscarFilmeID 400 || 404 || 500
                }
            }else{
                return validarDados // retorno da função de validar dados do filme 400
            }
        } else{
            return MESSAGE.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const excluirFilme = async function (id) {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAUT))
    try {
        // validação de campo obrigatorio
        let validarDados = await buscarFilmeId(id)
        if(validarDados.status_code == 200){
            let result = await filmeDAO.setDeleteFilms(parseInt(id))

            if(result){
                MESSAGE.HEADER.status = MESSAGE.SUCESS_DELETED_ITEM.status
                MESSAGE.HEADER.status_code = MESSAGE.SUCESS_DELETED_ITEM.status_code
                MESSAGE.HEADER.response = MESSAGE.SUCESS_DELETED_ITEM.message
                return MESSAGE.HEADER
            }else{
                return MESSAGE.ERROR_NOT_FOUND // 404
            }
        }else{
            MESSAGE.ERROR_NOT_FOUND.invalid_field =  'atributo [ID] invalido'
            return MESSAGE.ERROR_REQUIRED_FIELDS // 400
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }

}

//validação dos dados de cadastro do  filme
const validarDadosFilme = async function(filme) {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAUT))

    if(filme.nome == '' || filme.nome == null || filme.nome == undefined || filme.nome.length > 100){
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [NOME] invalido'
        return MESSAGE.ERROR_REQUIRED_FIELDS//400
    }else if(filme.sinopse == undefined){
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [sinopse] invalido'
        return MESSAGE.ERROR_REQUIRED_FIELDS//400
    }else if(filme.data_lancamento == undefined || filme.data_lancamento.length != 10){
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [data de lançamento] invalido'
        return MESSAGE.ERROR_REQUIRED_FIELDS//400
    } else if(filme.duracao == '' || filme.duracao == null || filme.duracao == undefined || filme.duracao.length > 8){
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [duração] invalido'
        return MESSAGE.ERROR_REQUIRED_FIELDS//400
    } else if(filme.orcamento == '' || filme.orcamento == null || filme.orcamento == undefined || filme.orcamento.length > 20 || typeof(filme.orcamento) != 'number'){
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [orçamento] invalido'
        return MESSAGE.ERROR_REQUIRED_FIELDS//400
    } else if(filme.trailer == undefined || filme.trailer.length > 200){
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [trailer] invalido'
        return MESSAGE.ERROR_REQUIRED_FIELDS //400
    } else if(filme.capa == '' || filme.capa == null || filme.capa == undefined || filme.capa.length > 200){
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [capa] invalido'
        return MESSAGE.ERROR_REQUIRED_FIELDS //400
    } else {
        return false
    }
}
module.exports = {
    listarFilmes,
    buscarFilmeId,
    inserirFilme,
    atualizarFilme,
    excluirFilme
}