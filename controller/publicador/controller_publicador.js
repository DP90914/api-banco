/************************************************************************************************************************************************
 * Objetivo:    arquivo responsavel pela maniplação de dados entre o APP e a Model (Validações, tratamento de dados, tratamento de erros, etc)
 * Data:        21/10/2025
 * Autor:       Gustavo de Paula Silva
 * Versão:      1.0
*******************************************************************************************************************************************************/
//Import do arqivo DAO para manipular o CRUD no DB
const res = require("express/lib/response.js")

const publicadorDAO = require("../../model/DAO/publicador.js")
//Import do arquivo que padroniza as menssgens
const MESSAGE_DEFAUT = require("../modulo/config_messages.js")

const listarPublicador = async function(){
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAUT))
    try {
        let result = await publicadorDAO.getPublicador()
        if(result){
            if(result.length > 0){
                MESSAGE.HEADER.status = MESSAGE.SUCESS_REQUEST.status
                MESSAGE.HEADER.status_code = MESSAGE.SUCESS_REQUEST.status_code
                MESSAGE.HEADER.response.publicador = result
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
const buscarPublicadorById = async function(id) {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAUT))
    try {
        // validação de campo obrigatorio
        if(id != '' && id != null && id != undefined && !isNaN(id) && id > 0){
            let result = await publicadorDAO.getPublicadorById(parseInt(id))
            if(result){
                if(result.length > 0){
                    MESSAGE.HEADER.status = MESSAGE.SUCESS_REQUEST.status
                    MESSAGE.HEADER.status_code = MESSAGE.SUCESS_REQUEST.status_code
                    MESSAGE.HEADER.response.publicador = result
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
const inserirPublicador = async function(publicador, contentType) {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAUT))
    try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            let validarDados = await validarDadosPublicador(publicador)
            if(!validarDados){
                let result = await publicadorDAO.setInsertPublicador(publicador)
                if(result){
                    let lastIdPublicador = await publicadorDAO.getSelectLastIdPublicador()
                    if(lastIdPublicador){
                        publicador.id = lastIdPublicador
                        MESSAGE.HEADER.status       =   MESSAGE.SUCESS_CREATED_ITEM.status
                        MESSAGE.HEADER.status_code  =   MESSAGE.SUCESS_CREATED_ITEM.status_code
                        MESSAGE.HEADER.message      =   MESSAGE.SUCESS_CREATED_ITEM.message
                        MESSAGE.HEADER.response     =   publicador
                        return MESSAGE.HEADER
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
                    }
                }else{
                    return MESSAGE.ERROR_NOT_FOUND //404
                }
            }else{
                return validarDados
            }
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE
        }

    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const atualizarPublicador = async function(publicador, id,contentType) {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAUT))
    try{
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            let validarDados = await validarDadosPublicador(publicador)
            if(!validarDados){
                let validarID = await buscarPublicadorById(id)
                if(validarID.status_code == 200){
                    // Adicionado o ID no JSon com os dados do filme
                    publicador.id = parseInt(id)
                    let result = await publicadorDAO.setUpdatePublicador(publicador)
                    if(result){
                        MESSAGE.HEADER.status       =   MESSAGE.SUCESS_UPDATED_ITEM.status
                        MESSAGE.HEADER.status_code  =   MESSAGE.SUCESS_UPDATED_ITEM.status_code
                        MESSAGE.HEADER.message      =   MESSAGE.SUCESS_UPDATED_ITEM.message
                        MESSAGE.HEADER.response     =   publicador
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
const excluirPublicador = async function(id) {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAUT))
    try {
        // validação de campo obrigatorio
        let validarDados = await buscarPublicadorById(id)
        if(validarDados.status_code == 200){
            let result = await publicadorDAO.setDeletePublicador(parseInt(id))

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


const validarDadosPublicador = async function(publicador) {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAUT))
    if(publicador.nome == '' || publicador.nome == null || publicador.nome == undefined || publicador.nome.length > 100){
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [NOME] invalido'
        return MESSAGE.ERROR_REQUIRED_FIELDS//400
    } else if(publicador.logradouro == '' || publicador.logradouro == null || publicador.logradouro == undefined || publicador.logradouro.length > 100){
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [logradouro] invalido'
        return MESSAGE.ERROR_REQUIRED_FIELDS//400
    } else if(publicador.cidade == '' || publicador.cidade == null || publicador.cidade == undefined || publicador.cidade.length > 100){
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [cidade] invalido'
        return MESSAGE.ERROR_REQUIRED_FIELDS//400
    } else if(publicador.estado == '' || publicador.estado == null || publicador.estado == undefined || publicador.estado.length > 100){
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [estado] invalido'
        return MESSAGE.ERROR_REQUIRED_FIELDS//400
    } else if(publicador.pais == '' || publicador.pais == null || publicador.pais == undefined || publicador.pais.length > 100){
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [pais] invalido'
        return MESSAGE.ERROR_REQUIRED_FIELDS//400
    } else if(publicador.data_fundacao == undefined || publicador.data_fundacao == "" || publicador.data_fundacao == null){
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = "Atributo [data_fundacao] invalido"
        return MESSAGE.ERROR_REQUIRED_FIELDS
    }else{
        return false
    }
}
module.exports = {
    listarPublicador,
    buscarPublicadorById,
    inserirPublicador,
    atualizarPublicador,
    excluirPublicador
}