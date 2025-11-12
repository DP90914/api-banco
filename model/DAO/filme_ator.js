/**************************************************************************************************
 * Objetivo:    arquivo responsavel pela realização do CRUD de relacionamento filme_ator
 * Data:        05/11/2025
 * Autor:       Gustavo de Paula Silva
 * Versão:      1.0
 *************************************************************************************************/

const res = require("express/lib/response")
const { PrismaClient } = require("../../generated/prisma")

const prisma = new PrismaClient()

// Retorna uma lista de todos os filmes e generos do banco de dados
const getSelectAllFilmsActor = async function(){
    try {

        let sql = `select * from tbl_filme_ator order by id desc`

        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result)){

            return result
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}
// Retorna um filmeGenero filtrado por id
const getSelectFilmsActorByID = async function(id){
    try {
        let sql = `select * from tbl_filme_ator where id=${id}`

        let result = await prisma.$queryRawUnsafe(sql)


        if(Array.isArray(result)){
            return result
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}
const getSelectActorsByIDFilm = async function(idFilme) {
    try {
        let sql = `select a.*
                        from tbl_filme f 
                            inner join tbl_filme_ator fa 
                                on f.id = fa.id_filme
                            inner join tbl_ator a
                                on a.id = fa.id_ator
                        where f.id = ${idFilme}`

        let result = await prisma.$queryRawUnsafe(sql)
        if(Array.isArray(result)){
            return result
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}
const getSelectFilmByIDActor = async function(idAtor) {
    try {
        let sql = `select f.*
                        from tbl_filme f 
                            inner join tbl_filme_ator fa 
                                on f.id = fa.id_filme
                            inner join tbl_ator a
                                on a.id = fa.id_ator
                        where f.id = ${idAtor}`

        let result = await prisma.$queryRawUnsafe(sql)
        if(Array.isArray(result)){
            return result
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}
module.exports = {
    getSelectAllFilmsActor,
    getSelectFilmsActorByID,
    getSelectActorsByIDFilm,
    getSelectFilmByIDActor,
}