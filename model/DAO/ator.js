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

module.exports = {
    getAtor,
    getAtorById
}