/************************************************************************************************************************************************
 * Objetivo:    arquivo responsavel pela maniplação de dados entre o APP e a Model (Validações, tratamento de dados, tratamento de erros, etc)
 * Data:        21/10/2025
 * Autor:       Gustavo de Paula Silva
 * Versão:      1.0
*******************************************************************************************************************************************************/
//Import do arqivo DAO para manipular o CRUD no DB
const res = require("express/lib/response.js")

const DiretorDAO = require("../../model/DAO/diretor.js")
//Import do arquivo que padroniza as menssgens
const MESSAGE_DEFAUT = require("../modulo/config_messages.js")

const listarDiretor = async function(){
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAUT))
    try {
        let result = await DiretorDAO.getDiretor()
        if(result){
            if(result.length > 0){
                MESSAGE.HEADER.status = MESSAGE.SUCESS_REQUEST.status
                MESSAGE.HEADER.status_code = MESSAGE.SUCESS_REQUEST.status_code
                MESSAGE.HEADER.response.diretor = result
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
const listarDiretorById = async function(id) {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAUT))
    try {
        // validação de campo obrigatorio
        if(id != '' && id != null && id != undefined && !isNaN(id) && id > 0){
            let result = await DiretorDAO.getDiretorById(parseInt(id))
            if(result){
                if(result.length > 0){
                    MESSAGE.HEADER.status = MESSAGE.SUCESS_REQUEST.status
                    MESSAGE.HEADER.status_code = MESSAGE.SUCESS_REQUEST.status_code
                    MESSAGE.HEADER.response.diretor = result
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

const inserirDiretor = async function(diretor, contentType) {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAUT))
    try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            let validarDados = await validarDadosDiretor(diretor)
            if(!validarDados){
                let result = await DiretorDAO.setInsertDiretor(diretor)
                if(result){
                    let lastIdAtor = await DiretorDAO.getSelectLastIdDiretor()
                    if(lastIdAtor){
                        diretor.id = lastIdAtor
                        MESSAGE.HEADER.status       =   MESSAGE.SUCESS_CREATED_ITEM.status
                        MESSAGE.HEADER.status_code  =   MESSAGE.SUCESS_CREATED_ITEM.status_code
                        MESSAGE.HEADER.message      =   MESSAGE.SUCESS_CREATED_ITEM.message
                        MESSAGE.HEADER.response     =   diretor
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
const atualizarDiretor = async function(diretor, id,contentType) {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAUT))
    try{
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            let validarDados = await validarDadosDiretor(diretor)
            if(!validarDados){
                let validarID = await listarDiretorById(id)
                if(validarID.status_code == 200){
                    // Adicionado o ID no JSon com os dados do filme
                    diretor.id = parseInt(id)
                    let result = await DiretorDAO.setUpdateDiretor(diretor)
                    if(result){
                        MESSAGE.HEADER.status       =   MESSAGE.SUCESS_UPDATED_ITEM.status
                        MESSAGE.HEADER.status_code  =   MESSAGE.SUCESS_UPDATED_ITEM.status_code
                        MESSAGE.HEADER.message      =   MESSAGE.SUCESS_UPDATED_ITEM.message
                        MESSAGE.HEADER.response     =   diretor
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

const excluirDiretor = async function(id) {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAUT))
    try {
        // validação de campo obrigatorio
        let validarDados = await listarDiretorById(id)
        if(validarDados.status_code == 200){
            let result = await DiretorDAO.setDeleteDiretor(parseInt(id))

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


const validarDadosDiretor = async function(diretor) {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAUT))
    if(diretor.nome == '' || diretor.nome == null || diretor.nome == undefined || diretor.nome.length > 100){
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [NOME] invalido'
        return MESSAGE.ERROR_REQUIRED_FIELDS//400
    } else if(diretor.genero == '' || diretor.genero == null || diretor.genero == undefined || diretor.genero.length > 100){
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [GENERO] invalido'
        return MESSAGE.ERROR_REQUIRED_FIELDS//400
    } else if(diretor.data_nascimento == undefined || diretor.data_nascimento == "" || diretor.data_nascimento == null){
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = "Atributo [data_nascimento] invalido"
        return MESSAGE.ERROR_REQUIRED_FIELDS
    }else if(diretor.data_morte ==""){
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = "Atributo [data_morte] invalido"
        return MESSAGE.ERROR_REQUIRED_FIELDS
    } else if(diretor.biografia == null || diretor.biografia == undefined || diretor.biografia == ""){
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = "Atributo [biografia] invalido"
        return MESSAGE.ERROR_REQUIRED_FIELDS
    }else{
        return false
    }
}
module.exports = {
    listarDiretor,
    listarDiretorById,
    inserirDiretor,
    atualizarDiretor,
    excluirDiretor
    
}