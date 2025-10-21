/************************************************************************************************************************************************
 * Objetivo: arquivo responsavel pela realização do CRUD de filmes no Banco de Dados MySql
 * Data: 01/10/2025
 * Autor: Gustavo de Paula Silva
 * Versão:1.0
 * 
 */
/* Dependencias do NODE para banco de dados relacional
 *              Sequelize   ->  Biblioteca para acesso a banco de dados  
 *                    
 *              Prisma      ->  Biblioteca atual para acesso e manipulação de dados,            
 *                              utilizando SQL ou ORM (MYsql, PostgreSQL, SQLServer, Oracle)
 * 
 *              Knex        ->  biblioteca atual para acesso e manipulação de dados, utilizando SQL (MySQL)
 * 
 * * Instalação do prisma
 * 
 *          - npm install prisma --save         -> Realiza a coneção com o banco de dados
 *          - npm install @prima/client --save  -> Permite execultar scripts SQL no banco de dados
 *          - npx prisma migrate dev            -> Permite sincronizar o prisma com o DB, modelar o DB conforme as configurações do ORM
 *                                                 Cuidado: faz reset no DB
 *          - npx prisma migrate reset          -> reset no DB
 *          - npx prisma generate               -> sicronismo com DB
 *  
 * * Dependencia do node para bancos de dados NÃO relacional
 *              Mongoose    -> biblioteca para acesso a banco de dados não relacional (MongoDB)
 *
 *       $queryRawUnsafe()       - > permite execultar apenas scripts SQL que retornam dados do DB (SELECT),
 *                               permite também execultar um script SQL através de uma variavél
 *
 *       $executeRawUnsafe()     -> permite execultar scripts SQL que NÃO retornam dados do BD
 *                               (INSERT, UPDATE, DELETE)
 * 
 *       $queryRaw()       -> permite execultar apenas scripts SQL que retornam dados do DB (SELECT),
 *                               permite também execultar um script SQL direto no metodo. Permire aplicar segurança contra SQL injection
 *
 *       $executeRaw()     -> permite execultar scripts SQL que NÃO retornam dados do BD. Permire aplicar segurança contra SQL injection
 *                               (INSERT, UPDATE, DELETE)
 ***********************************************************************************************************************************************/

//Import da biblioteca do PrismaClient
// const { PrismaClient } = require("@prisma/client")
const { PrismaClient } = require("../../generated/prisma")

//cria o objeto do prisma client para manipular os scripts SQL
const prisma = new PrismaClient()

//Retorna todos os filmes do banco de dados
const getSelectAllFilms = async function(){
    try {
        //Script SQL
        let sql = `select * from tbl_filme order by id desc`
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

//Retora o filme por um ID do banco de dados
const getSelectByIdFilms = async function(id){
    try {
        //Script SQL
        let sql = `select * from tbl_filme where id=${id}`
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

//Insere um filme no banco de dados 
const setInsertFilm = async function(filme){
    try {
        let sql = `INSERT INTO tbl_filme (
                        nome,
                        sinopse, 
                        data_lancamento, 
                        duracao,
                        orcamento,
                        trailer,
                        capa
                    ) VALUES (
                        '${filme.nome}', 
                        '${filme.sinopse}',
                        '${filme.data_lancamento}',
                        '${filme.duracao}', 
                        '${filme.orcamento}',
                        '${filme.trailer}',
                        '${filme.capa}')`
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

//atualiza um filme existente no banco de dados filtrando pelo ID
const setUpdateFilme = async function(filme){
    try {
        let sql = `UPDATE tbl_filme set
                        nome            = '${filme.nome}', 
                        sinopse         = '${filme.sinopse}',
                        data_lancamento = '${filme.data_lancamento}',
                        duracao         = '${filme.duracao}', 
                        orcamento       = '${filme.orcamento}',
                        trailer         = '${filme.trailer}',
                        capa            = '${filme.capa}'
                    where id = ${filme.id}`

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

//Apaga um filme existente no banco de dados filtrando pelo ID
const setDeleteFilms = async function(id){
    try {
        //Script SQL
        let sql = `delete from tbl_filme where id=${id}`
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
module.exports = {
    getSelectAllFilms,
    getSelectByIdFilms,
    setInsertFilm,
    setUpdateFilme,
    setDeleteFilms
}