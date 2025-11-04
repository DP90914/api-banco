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

const getPublicador = async function() {
    try {
        let sql = `select * from tbl_publicador`
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
const getPublicadorById = async function (id) {
    try {
        let sql = `select * from tbl_publicador where id=${id}`
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
const setInsertPublicador = async function(publicador){
    try {
        let sql = `insert into tbl_publicador(
            nome, data_fundacao,is_ativa, logradouro, cidade,estado, pais
        ) values (
        "${publicador.nome}",
        "${publicador.data_fundacao}",
        ${publicador.is_ativa} ,
        "${publicador.logradouro}",
        "${publicador.cidade}",
        "${publicador.estado}",
        "${publicador.pais}"
        );`
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

const setUpdatePublicador = async function(publicador) {
    try{
        let sql = `update tbl_publicador set
                        nome = '${publicador.nome}',
                        data_fundacao = '${publicador.data_fundacao}',
                        is_ativa = ${publicador.is_ativa},
                        logradouro = "${publicador.logradouro}",
                        cidade = "${publicador.cidade}",
                        estado = "${publicador.estado}",
                        pais = "${publicador.pais}"
                    where id = ${publicador.id}`
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

const setDeletePublicador = async function(id) {
    try{
        let sql = `delete from tbl_publicador where id = ${id}`
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

const getSelectLastIdPublicador = async function() {
    try{
        let sql =`select id from tbl_publicador order by id desc limit 1`
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



module.exports ={
    getPublicador,
    getPublicadorById,
    setInsertPublicador,
    getSelectLastIdPublicador,
    setUpdatePublicador,
    setDeletePublicador
}