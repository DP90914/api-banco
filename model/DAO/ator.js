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

const getAtor = async function(){
    try {
        let sql = `select * from tbl_ator`
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
const getAtorById = async function (id) {
    try {
        let sql = `select * from tbl_ator where id=${id}`
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
const setInsertAtor = async function(ator){
    try{
        if(ator.data_morte == null){
            let sql = `INSERT INTO tbl_ator(
                            nome,
                            genero,
                            data_nascimento,
                            biografia,
                            data_morte,
                            img_ator
            ) VALUES (
                '${ator.nome}', 
                '${ator.genero}',
                '${ator.data_nascimento}',
                '${ator.biografia}',
                null,
                '${ator.img_ator}'
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
                            img_ator
                ) VALUES (
                    '${ator.nome}', 
                    '${ator.genero}',
                    '${ator.data_nascimento}',
                    '${ator.biografia}',
                    '${ator.data_morte}',
                    '${ator.img_ator}'
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

const setUpdateAtor = async function(ator) {
    try{
        let sql = `update tbl_ator set
                        nome = '${ator.nome}',
                        genero = '${ator.genero}',
                        data_nascimento ="${ator.data_nascimento}",
                        data_morte = "${ator.data_morte}",
                        biografia = "${ator.biografia}",
                        img_ator = "${ator.img_ator}"
                    where id = ${ator.id}`
        let result = await prisma.$executeRawUnsafe(sql)
        if(result){
            return true
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

const setDeleteAtor = async function(id) {
    try{
        let sql = `delete from tbl_ator where id = ${id}`
        let result = await prisma.$queryRawUnsafe(sql)

        //Validação para identificar se o retorna o Array é vazio ou com dados
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
const getSelectLastIdAtor = async function() {
    try{
        let sql =`select id from tbl_ator order by id desc limit 1`
        let result = await prisma.$queryRawUnsafe(sql)
        if(Array.isArray(result)){
            return Number(result[0].id)
        } else{
            return false
        }
    } catch(error){
        return false
    }
}

module.exports = {
    getAtor,
    getAtorById,
    setInsertAtor,
    getSelectLastIdAtor,
    setUpdateAtor,
    setDeleteAtor
}