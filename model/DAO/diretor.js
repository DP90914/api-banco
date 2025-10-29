/**************************************************************************************************
 * Objetivo:    arquivo responsavel pela realização do CRUD de generos no Banco de Dados MySql
 * Data:        21/10/2025
 * Autor:       Gustavo de Paula Silva
 * Versão:      1.0
 *************************************************************************************************/
//Import da biblioteca do PrismaClient
// const { PrismaClient } = require("@prisma/client")
const { PrismaClient } = require("../../generated/prisma")

//cria o objeto do prisma client para manipular os scripts SQL
const prisma = new PrismaClient()

const getDiretor = async function() {
    try {
        let sql = `select * from tbl_diretor`
        let result = await prisma.$queryRawUnsafe(sql)
        if(Array.isArray(result)){
            return result
        }else{
            return false
        }
    } catch (error) {
        console.log(error)
        return false
    }
}
const getDiretorById = async function (id) {
    try {
        let sql = `select * from tbl_diretor where id=${id}`
        let result = await prisma.$queryRawUnsafe(sql)
        if(Array.isArray(result)){
            return result
        }else{
            return false
        }
    } catch (error) {
        console.log(error)
        return false
    }
}

const setInsertDiretor = async function(diretor) {
    try{
        if(diretor.data_morte == null){
            let sql = `INSERT INTO tbl_diretor(
                            nome,
                            genero,
                            data_nascimento,
                            biografia,
                            data_morte,
                            img_diretor
            ) VALUES (
                '${diretor.nome}', 
                '${diretor.genero}',
                '${diretor.data_nascimento}',
                '${diretor.biografia}',
                'null',
                '${diretor.img_diretor}'
            )`
            let result = await prisma.$executeRawUnsafe(sql)
            if(result){
                return true
            }else{
                return false
            }

        } else {
            let sql = `INSERT INTO tbl_ator(
                            nome,
                            genero,
                            data_nascimento,
                            biografia,
                            data_morte,
                            img_diretor
                ) VALUES (
                    '${diretor.nome}', 
                    '${diretor.genero}',
                    '${diretor.data_nascimento}',
                    '${diretor.biografia}',
                    '${diretor.data_morte}',
                    '${diretor.img_diretor}'
                )`
                let result = await prisma.$executeRawUnsafe(sql)
                if(result){
                    return true
                }else{
                    return false
                }
        }
    } catch(error){
        console.log(error)
        return false
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
    } else if(diretor.biografia == null || diretor.biografia == undefined || diretor.biografia == ""){
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = "Atributo [biografia] invalido"
        return MESSAGE.ERROR_REQUIRED_FIELDS
    } else if(diretor.data_morte == undefined){
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = "Atributo [data_morte] invalido"
        return MESSAGE.ERROR_REQUIRED_FIELDS
    } else if(diretor.img_diretor == undefined){
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = "Atributo [img_diretor] invalido"
        return MESSAGE.ERROR_REQUIRED_FIELDS
    }else{
        return false
    }
}

module.exports ={
    getDiretor,
    getDiretorById,
    setInsertDiretor
}