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
                    MESSAGE.HEADER.response.ator = result
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
const inserirAtor = async function(ator, contentType) {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAUT))
    try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            let validarDados = await validarDadosAtor(ator)
            if(!validarDados){
                let result = await AtorDAO.setInsertAtor(ator)
                if(result){
                    let lastIdAtor = await AtorDAO.getSelectLastIdAtor()
                    if(lastIdAtor){
                        ator.id = lastIdAtor
                        MESSAGE.HEADER.status       =   MESSAGE.SUCESS_CREATED_ITEM.status
                        MESSAGE.HEADER.status_code  =   MESSAGE.SUCESS_CREATED_ITEM.status_code
                        MESSAGE.HEADER.message      =   MESSAGE.SUCESS_CREATED_ITEM.message
                        MESSAGE.HEADER.response     =   ator
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

const atualizarAtor = async function(ator, id,contentType) {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAUT))
    try{
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            let validarDados = await validarDadosAtor(ator)
            if(!validarDados){
                let validarID = await buscarAtorById(id)
                if(validarID.status_code == 200){
                    // Adicionado o ID no JSon com os dados do filme
                    ator.id = parseInt(id)
                    let result = await AtorDAO.setUpdateAtor(ator)
                    if(result){
                        MESSAGE.HEADER.status       =   MESSAGE.SUCESS_UPDATED_ITEM.status
                        MESSAGE.HEADER.status_code  =   MESSAGE.SUCESS_UPDATED_ITEM.status_code
                        MESSAGE.HEADER.message      =   MESSAGE.SUCESS_UPDATED_ITEM.message
                        MESSAGE.HEADER.response     =   ator
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
const excluirAtor = async function(id) {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAUT))
    try {
        // validação de campo obrigatorio
        let validarDados = await buscarAtorById(id)
        if(validarDados.status_code == 200){
            let result = await AtorDAO.setDeleteAtor(parseInt(id))

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


const validarDadosAtor = async function(ator) {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAUT))
    if(ator.nome == '' || ator.nome == null || ator.nome == undefined || ator.nome.length > 100){
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [NOME] invalido'
        return MESSAGE.ERROR_REQUIRED_FIELDS//400
    } else if(ator.genero == '' || ator.genero == null || ator.genero == undefined || ator.genero.length > 100){
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [GENERO] invalido'
        return MESSAGE.ERROR_REQUIRED_FIELDS//400
    } else if(ator.data_nascimento == undefined || ator.data_nascimento == "" || ator.data_nascimento == null){
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = "Atributo [data_nascimento] invalido"
        return MESSAGE.ERROR_REQUIRED_FIELDS
    } else if(ator.biografia == null || ator.biografia == undefined || ator.biografia == ""){
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = "Atributo [biografia] invalido"
        return MESSAGE.ERROR_REQUIRED_FIELDS
    } else if(ator.data_morte == undefined){
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = "Atributo [data_morte] invalido"
        return MESSAGE.ERROR_REQUIRED_FIELDS
    } else if(ator.img_ator == undefined){
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = "Atributo [img_ator] invalido"
        return MESSAGE.ERROR_REQUIRED_FIELDS
    }else{
        return false
    }
}
module.exports = {
    listarAtor,
    buscarAtorById,
    inserirAtor,
    atualizarAtor,
    excluirAtor
}