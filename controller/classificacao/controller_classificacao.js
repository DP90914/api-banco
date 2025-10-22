/************************************************************************************************************************************************
 * Objetivo:    arquivo responsavel pela maniplação de dados entre o APP e a Model (Validações, tratamento de dados, tratamento de erros, etc)
 * Data:        21/10/2025
 * Autor:       Gustavo de Paula Silva
 * Versão:      1.0
*******************************************************************************************************************************************************/
//Import do arqivo DAO para manipular o CRUD no DB
const res = require("express/lib/response.js")

const classificacaoDAO = require("../../model/DAO/classificacao.js")
//Import do arquivo que padroniza as menssgens
const MESSAGE_DEFAUT = require("../modulo/config_messages.js")

const listarClassificacao = async function(){
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAUT))
    try {
        let result = await classificacaoDAO.getClassificacao()
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
const buscarClassificacaoId = async function(id) {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAUT))
    try {
        // validação de campo obrigatorio
        if(id != '' && id != null && id != undefined && !isNaN(id) && id > 0){
            let result = await classificacaoDAO.getClassificacaoById(parseInt(id))
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
const inserirClassificacao = async function(classificacao, contentType){
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAUT))
    try{
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            let validarDados = await validarDadosClassificacao(classificacao)
            if(!validarDados){
                let result = await classificacaoDAO.setInsertClassificacao(classificacao)
                if(result){
                    let lastIdClassificacao = await classificacaoDAO.getSelectLastIdClassificacao()
                    if(lastIdClassificacao){
                        classificacao.id            =   lastIdClassificacao 
                        MESSAGE.HEADER.status       =   MESSAGE.SUCESS_CREATED_ITEM.status
                        MESSAGE.HEADER.status_code  =   MESSAGE.SUCESS_CREATED_ITEM.status_code
                        MESSAGE.HEADER.message      =   MESSAGE.SUCESS_CREATED_ITEM.message
                        MESSAGE.HEADER.response     =   classificacao
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
const atualizarClassificacao = async function(classificacao, id, contentType){
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAUT))
    try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            let validarDados = await validarDadosClassificacao(classificacao)
            if(!validarDados){
                let validarID = await buscarClassificacaoId(id)
                if(validarID.status_code == 200){
                    classificacao.id = parseInt(id)
                    let result = await classificacaoDAO.setUpdateClassificacao(classificacao)
                    if(result){
                        MESSAGE.HEADER.status       =   MESSAGE.SUCESS_UPDATED_ITEM.status
                        MESSAGE.HEADER.status_code  =   MESSAGE.SUCESS_UPDATED_ITEM.status_code
                        MESSAGE.HEADER.message      =   MESSAGE.SUCESS_UPDATED_ITEM.message
                        MESSAGE.HEADER.response     =   classificacao
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

const excluirClassificacao = async function(id){
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAUT))
    try {
        let validarID = await buscarClassificacaoId(id)
        if(validarID.status_code == 200){
            let result = await classificacaoDAO.setDeleteClassificacao(parseInt(id))
            if(result){
                MESSAGE.HEADER.status       =   MESSAGE.SUCESS_DELETED_ITEM.status
                MESSAGE.HEADER.status_code  =   MESSAGE.SUCESS_DELETED_ITEM.status_code
                MESSAGE.HEADER.message      =   MESSAGE.SUCESS_DELETED_ITEM.message
                return MESSAGE.HEADER //200
            }else{
                return MESSAGE.ERROR_NOT_FOUND//404
            }
        }else{
            MESSAGE.ERROR_NOT_FOUND.invalid_field =  'atributo [ID] invalido'
            return MESSAGE.ERROR_REQUIRED_FIELDS // 400
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const validarDadosClassificacao = async function(classificacao){
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAUT))
    if(classificacao.nome =='' || classificacao.nome == null || classificacao.nome == undefined || classificacao.nome.length > 100){
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [NOME] invalido'
        return MESSAGE.ERROR_REQUIRED_FIELDS//400
    } else if(classificacao.idade_minima == '' || classificacao.idade_minima == null || classificacao.idade_minima == undefined || typeof(classificacao.idade_minima) != 'number'){
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [idade minima] invalido'
        return MESSAGE.ERROR_REQUIRED_FIELDS//400
    }else{
        return false
    }
}

module.exports = {
    listarClassificacao,
    buscarClassificacaoId,
    inserirClassificacao,
    atualizarClassificacao,
    excluirClassificacao
}