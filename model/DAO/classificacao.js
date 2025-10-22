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

const getClassificacao = async function(){
    try {
        let sql = `select * from tbl_classificacao`
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
const getClassificacaoById = async function (id) {
    try {
        let sql = `select * from tbl_classificacao where id=${id}`
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
const getSelectLastIdClassificacao = async function(){
    try {
        let sql = `select id from tbl_classificacao order by id desc limit 1`
        let result = await prisma.$queryRawUnsafe(sql)
        if(Array.isArray(result)){
            return Number(result[0].id)
        }else{
            return false
        }
    } catch (error) {
        console.log(error)
        return false
    }
}
const setInsertClassificacao = async function(classificacao){
    try {
        let sql = `insert into tbl_classificacao(nome, idade_minima) values (
                    "${classificacao.nome}",
                    "${classificacao.idade_minima}")`
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
const setUpdateClassificacao = async function(classificacao){
    try {
        let sql =   `update tbl_classificacao set
                        nome            =   "${classificacao.nome}",
                        idade_minima    =   ${classificacao.idade_minima}
                    where id = ${classificacao.id}`
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
const setDeleteClassificacao = async function(id){
    try {
        let sql = `delete from tbl_classificacao where id = ${id}`
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
    getClassificacao,
    getClassificacaoById,
    getSelectLastIdClassificacao,
    setInsertClassificacao,
    setUpdateClassificacao,
    setDeleteClassificacao
}
