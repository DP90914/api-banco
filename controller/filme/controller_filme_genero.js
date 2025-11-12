/************************************************************************************************************************************************
 * Objetivo:    arquivo responsavel pela maniplação de dados entre o APP e a Model (Validações, tratamento de dados, tratamento de erros, etc)
 * Data:        05/11/2025
 * Autor:       Gustavo de Paula Silva
 * Versão:      1.0
*******************************************************************************************************************************************************/
//Import do arqivo DAO para manipular o CRUD no DB

const filmeGeneroDAO = require("../../model/DAO/filme_genero.js")
//Import do arquivo que padroniza as menssgens
const MESSAGE_DEFAUT = require("../modulo/config_messages.js")

const listarFilmesGeneros = async function() { 
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAUT))
    try {
        
        let result = await filmeGeneroDAO.getSelectAllFilmsGenres()
        
        if(result){
            if(result.length > 0){
                MESSAGE.HEADER.status = MESSAGE.SUCESS_REQUEST.status
                MESSAGE.HEADER.status_code = MESSAGE.SUCESS_REQUEST.status_code
                MESSAGE.HEADER.response.filmes_generos = result
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
const buscarFilmesGenerosId = async function(id) {
        //realizando uma copia do odjeto MESSAGE_DEFAUT, permitindo que as alterações desta função não interfira nas demais
        let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAUT))
        try {

            // validação de campo obrigatorio
            if(id != '' && id != null && id != undefined && !isNaN(id) && id > 0){
                let result = await filmeGeneroDAO.getSelectFilmsGenresByID(parseInt(id))
                if(result){
                    if(result.length > 0){
                        MESSAGE.HEADER.status = MESSAGE.SUCESS_REQUEST.status
                        MESSAGE.HEADER.status_code = MESSAGE.SUCESS_REQUEST.status_code
                        MESSAGE.HEADER.response.filmes_generos = result
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
            console.log(error)
            return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
        }
}
// Retorna os generos pelo id do filme
const listarGenerosIdFilme = async function(idFilme) {
    //realizando uma copia do odjeto MESSAGE_DEFAUT, permitindo que as alterações desta função não interfira nas demais
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAUT))
    try {
        // validação de campo obrigatorio
        if(idFilme  != '' && idFilme != null && idFilme != undefined && !isNaN(idFilme) && idFilme > 0){
            let result = await filmeGeneroDAO.getSelectGenresByIDFilm(parseInt(idFilme))

            if(result){
                if(result.length > 0){
                    MESSAGE.HEADER.status = MESSAGE.SUCESS_REQUEST.status
                    MESSAGE.HEADER.status_code = MESSAGE.SUCESS_REQUEST.status_code
                    MESSAGE.HEADER.response.films_generos = result


                    return MESSAGE.HEADER
                }else{
                    return MESSAGE.ERROR_NOT_FOUND //404
                }
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 404
            }
        }else{
            MESSAGE.ERROR_NOT_FOUND.invalid_field =  'atributo [idFilme] invalido'
            return MESSAGE.ERROR_REQUIRED_FIELDS // 400
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}
// Retorna os filmes pelo id do genero
const listarFilmesIdGenero = async function(idGenero) {
    //realizando uma copia do odjeto MESSAGE_DEFAUT, permitindo que as alterações desta função não interfira nas demais
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAUT))
    try {
        // validação de campo obrigatorio
        if(idGenero  != '' && idGenero != null && idGenero != undefined && !isNaN(idGenero) && idGenero > 0){
            let result = await filmeGeneroDAO.getSelectFilmsByIDGenre(parseInt(idGenero))
            if(result){
                if(result.length > 0){
                    MESSAGE.HEADER.status = MESSAGE.SUCESS_REQUEST.status
                    MESSAGE.HEADER.status_code = MESSAGE.SUCESS_REQUEST.status_code
                    MESSAGE.HEADER.response.filmes_generos = result
                    return MESSAGE.HEADER
                }else{
                    return MESSAGE.ERROR_NOT_FOUND //404
                }
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 404
            }
        }else{
            MESSAGE.ERROR_NOT_FOUND.invalid_field =  'atributo [idGenero] invalido'
            return MESSAGE.ERROR_REQUIRED_FIELDS // 400
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

const inserirFilmeGenero = async function(filmeGenero, contentType) {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAUT))
    try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            //chama a função de validação dos dados de cadastro
            let validarDados = await validarDados1(filmeGenero)
            if(!validarDados){
                let result = await filmeGeneroDAO.setInsertFilmsGeners(filmeGenero)
                if(result){
                    //Chama a função para receber o ID gerado no DB
                    let lastIdFilme = await filmeGeneroDAO.getSelectLastId()
                    if(lastIdFilme){
                        //Adiciona no JSON o id criado no DB
                        filmeGenero.id                    =   lastIdFilme 
                        MESSAGE.HEADER.status       =   MESSAGE.SUCESS_CREATED_ITEM.status
                        MESSAGE.HEADER.status_code  =   MESSAGE.SUCESS_CREATED_ITEM.status_code
                        MESSAGE.HEADER.message      =   MESSAGE.SUCESS_CREATED_ITEM.message
                        MESSAGE.HEADER.response     =   filmeGenero
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
//Revizar
const atualizarFilmeGenero = async function(filmeGenero, id, contentType) {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAUT))
    try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            //chama a função de validação dos dados de cadastro
            let validarDados = await validarDados1(filmeGenero)
            if(!validarDados){
                
                let validarID = await buscarFilmesGenerosId(id)

                //verifica se o ID existe no DB, caso exista teremos um 200
                if(validarID.status_code == 200){
                    // Adicionado o ID no JSon com os dados do filme
                    filmeGenero.id = parseInt(id)
                    let result = await filmeGeneroDAO.setUpdateFilmsGeners(filmeGenero)
                    if(result){
                        MESSAGE.HEADER.status       =   MESSAGE.SUCESS_UPDATED_ITEM.status
                        MESSAGE.HEADER.status_code  =   MESSAGE.SUCESS_UPDATED_ITEM.status_code
                        MESSAGE.HEADER.message      =   MESSAGE.SUCESS_UPDATED_ITEM.message
                        MESSAGE.HEADER.response     =   filmeGenero
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
const excluirFilmeGenero = async function(id) {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAUT))
    try {
        let validarDados = await buscarFilmesGenerosId(id)
        if(validarDados.status_code == 200){
            let result = await filmeGeneroDAO.setDeleteFilmsGeners(parseInt(id))
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
const excluirGeneroIdFilme = async function(id_filme) {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAUT))
    try{
        let validarDados = await listarGenerosIdFilme(id_filme)
        console.log(validarDados)
        if(validarDados.status_code == 200){
            let result = await filmeGeneroDAO.setDeleteGenersByIdFilme(parseInt(id_filme))
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

    }catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500

    }
}
const validarDados1 = async function(filmeGenero) {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAUT))

    if(filmeGenero.id_filme == "" || filmeGenero.id_filme == null ||filmeGenero.id_filme == undefined){
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [id_filme] invalido'
        return MESSAGE.ERROR_REQUIRED_FIELDS//400
    } else if(filmeGenero.id_genero == "" || filmeGenero.id_genero == null ||filmeGenero.id_genero == undefined){
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [id_genero] invalido'
        return MESSAGE.ERROR_REQUIRED_FIELDS//400
    } else {
        return false
    }
}
//Revizar
module.exports = {
    listarFilmesGeneros,
    buscarFilmesGenerosId,
    listarFilmesIdGenero,
    listarGenerosIdFilme,
    excluirFilmeGenero,
    atualizarFilmeGenero,
    inserirFilmeGenero,
    excluirGeneroIdFilme

}