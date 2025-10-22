/************************************************************************************************************************************************
 * Objetivo:    arquivo responsavel pela maniplação de dados entre o APP e a Model (Validações, tratamento de dados, tratamento de erros, etc)
 * Data:        21/10/2025
 * Autor:       Gustavo de Paula Silva
 * Versão:      1.0
*******************************************************************************************************************************************************/
//Import do arqivo DAO para manipular o CRUD no DB
const res = require("express/lib/response.js")

const AtorDAO = require("../../model/DAO/ator.js")
//Import do arquivo que padroniza as menssgens
const MESSAGE_DEFAUT = require("../modulo/config_messages.js")

const listarAtor = async function(){
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAUT))
    try {
        let result = await AtorDAO.getAtor()
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
const buscarAtorById = async function(id) {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAUT))
    try {
        // validação de campo obrigatorio
        if(id != '' && id != null && id != undefined && !isNaN(id) && id > 0){
            let result = await AtorDAO.getAtorById(parseInt(id))
            if(result){
                if(result.length > 0){
                    MESSAGE.HEADER.status = MESSAGE.SUCESS_REQUEST.status
                    MESSAGE.HEADER.status_code = MESSAGE.SUCESS_REQUEST.status_code
                    MESSAGE.HEADER.response.classificacao = result
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

module.exports = {
    listarAtor,
    buscarAtorById
}