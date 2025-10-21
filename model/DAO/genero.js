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

//Retorna todos os generos do banco de dados
const getSelectAllGeneros = async function(){
    try {
        //Script SQL
        let sql = `select * from tbl_genero`
        //Executa no DB
        let result = await prisma.$queryRawUnsafe(sql)

        //Validação para identificar se o retorna o Array é vazio ou com dados
        if(Array.isArray(result)){
            // console.log(result)
            return result
        }else{
            return false
        }
    } catch (error) {
        console.log(error)
        return false
    }
}
//Retora o genero por um ID do banco de dados
const getSelectGeneroByID = async function(id){
    try {
        //Script SQL
        let sql = `select * from tbl_genero where id=${id}`
        //Executa no DB
        let result = await prisma.$queryRawUnsafe(sql)

        //Validação para identificar se o retorna o Array é vazio ou com dados
        if(Array.isArray(result)){
            // console.log(result)
            return result
        }else{
            return false
        }
    } catch (error) {
        console.log(error)
        return false
    }
}
//Retorna o ultimo genero adiconado do banco de dados
const getSelectLastIdGenero = async function(){
    try {
        //Script SQL
        let sql = `select id from tbl_genero order by id desc limit 1`
        //Executa no DB
        let result = await prisma.$queryRawUnsafe(sql)

        //Validação para identificar se o retorna o Array é vazio ou com dados
        if(Array.isArray(result)){
            return Number(result[0].id)
        }else{
            return false
        }
    } catch (error) {
        // console.log(error)
        return false
    }
}
//Insere um genero no DB
const setInsertGenero = async function(genero){
    try {
        let sql = `INSERT INTO tbl_genero (
                        nome
                    ) VALUES (
                        '${genero.nome}')`
        //$executeRawUnsafe() -> permite apenas exeultar scripts SQL que não tem retorno de dados(INSERT, UPDATE, DELETE)
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
//Atualiza um genero do banco de dados 
const setUpdateGenero = async function(genero){
    try {
        let sql =  `UPDATE tbl_genero set
                        nome = '${genero.nome}', 
                    where id = ${genero.id}`
        //$executeRawUnsafe() -> permite apenas exeultar scripts SQL que não tem retorno de dados(INSERT, UPDATE, DELETE)
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
//Deleta um genero do banco de dados
const setDeleteGenero = async function(id){
    try {
        //Script SQL
        let sql = `delete from tbl_genero where id=${id}`
        //Executa no DB
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

// getSelectAllGeneros()
// getSelectGeneroByID(3)
// getSelectLastIdGenero()

module.exports = {
    getSelectAllGeneros,
    getSelectGeneroByID,
    getSelectLastIdGenero,
    setInsertGenero,
    setUpdateGenero,
    setDeleteGenero
}