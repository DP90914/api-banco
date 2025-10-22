/************************************************************************************************************************************************
 * Objetivo:    arquivo responsavel pela maniplação de dados entre o APP e a Model (Validações, tratamento de dados, tratamento de erros, etc)
 * Data:        21/10/2025
 * Autor:       Gustavo de Paula Silva
 * Versão:      1.0
*******************************************************************************************************************************************************/
//Import do arqivo DAO para manipular o CRUD no DB
const res = require("express/lib/response.js")

const generoDAO = require("../../model/DAO/genero.js")
//Import do arquivo que padroniza as menssgens
const MESSAGE_DEFAUT = require("../modulo/config_messages.js")

const listarGeneros = async function() { 
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAUT))
    try {
        let result = await generoDAO.getSelectAllGeneros()
        if(result){
            if(result.length > 0){
                MESSAGE.HEADER.status = MESSAGE.SUCESS_REQUEST.status
                MESSAGE.HEADER.status_code = MESSAGE.SUCESS_REQUEST.status_code
                MESSAGE.HEADER.response.generos = result
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
const buscarGeneroId = async function(id) {
        //realizando uma copia do odjeto MESSAGE_DEFAUT, permitindo que as alterações desta função não interfira nas demais
        let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAUT))
        try {
            // validação de campo obrigatorio
            if(id != '' && id != null && id != undefined && !isNaN(id) && id > 0){
                let result = await generoDAO.getSelectGeneroByID(parseInt(id))
                if(result){
                    if(result.length > 0){
                        MESSAGE.HEADER.status = MESSAGE.SUCESS_REQUEST.status
                        MESSAGE.HEADER.status_code = MESSAGE.SUCESS_REQUEST.status_code
                        MESSAGE.HEADER.response.genero = result
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
const inserirGenero = async function(genero, contentType) {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAUT))
    try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            if(genero.nome == '' || genero.nome == null || genero.nome == undefined || genero.nome.length > 100){
                MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [NOME] invalido'
                return MESSAGE.ERROR_REQUIRED_FIELDS//400
            }else{
                let result = await generoDAO.setInsertGenero(genero)
                if(result){
                    let lastIdGenero = await generoDAO.getSelectLastIdGenero()
                    if(lastIdGenero){
                        //Adiciona no JSON o id criado no DB
                        genero.id                   =   lastIdGenero 
                        MESSAGE.HEADER.status       =   MESSAGE.SUCESS_CREATED_ITEM.status
                        MESSAGE.HEADER.status_code  =   MESSAGE.SUCESS_CREATED_ITEM.status_code
                        MESSAGE.HEADER.message      =   MESSAGE.SUCESS_CREATED_ITEM.message
                        MESSAGE.HEADER.response     =   genero
                        return MESSAGE.HEADER
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                }else{
                    return MESSAGE.ERROR_NOT_FOUND //404
                }
            }        
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}
//Revizar
const atualizarGenero = async function(genero, id, contentType) {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAUT))
    try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            if(genero.nome == '' || genero.nome == null || genero.nome == undefined || genero.nome.length > 100){
                MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [NOME] invalido'
                return MESSAGE.ERROR_REQUIRED_FIELDS//400
            }else{
                let validarID = await buscarGeneroId(id)
                if(validarID.status_code == 200){
                    genero.id = parseInt(id)
                    let result = await generoDAO.setUpdateGenero(genero)
                    if(result){
                        MESSAGE.HEADER.status       =   MESSAGE.SUCESS_UPDATED_ITEM.status
                        MESSAGE.HEADER.status_code  =   MESSAGE.SUCESS_UPDATED_ITEM.status_code
                        MESSAGE.HEADER.message      =   MESSAGE.SUCESS_UPDATED_ITEM.message
                        MESSAGE.HEADER.response     =   genero
                        return MESSAGE.HEADER //200
                    }else{
                        return MESSAGE.ERROR_NOT_FOUND//404
                    }
                }else{
                    return validarID // Retorno da função de buscarFilmeID 400 || 404 || 500
                }
            }        
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}
const excluirGenero = async function(id) {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAUT))
    try {
        let validarDados = await buscarGeneroId(id)
        if(validarDados.status_code == 200){
            let result = await generoDAO.setDeleteGenero(parseInt(id))
            if(result){
                MESSAGE.HEADER.status       =   MESSAGE.SUCESS_DELETED_ITEM.status
                MESSAGE.HEADER.status_code  =   MESSAGE.SUCESS_DELETED_ITEM.status_code
                MESSAGE.HEADER.response     =   MESSAGE.SUCESS_DELETED_ITEM.message
                return MESSAGE.HEADER //200
            }else{
                return MESSAGE.ERROR_NOT_FOUND//404
            }
        }else{
            MESSAGE.ERROR_NOT_FOUND.invalid_field =  'atributo [ID] invalido'
            return MESSAGE.ERROR_REQUIRED_FIELDS // 400
        }
    
    }catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}
//Revizar
module.exports = {
    listarGeneros,
    buscarGeneroId,
    inserirGenero,
    atualizarGenero,
    excluirGenero

}