/**************************************************************************************************
 * Objetivo:    arquivo responsavel pela realização do CRUD de relacionamento filme_genero
 * Data:        05/11/2025
 * Autor:       Gustavo de Paula Silva
 * Versão:      1.0
 *************************************************************************************************/

const res = require("express/lib/response")
const { PrismaClient } = require("../../generated/prisma")

const prisma = new PrismaClient()

// Retorna uma lista de todos os filmes e generos do banco de dados
const getSelectAllFilmsGenres = async function(){
    try {

        let sql = `select * from tbl_filme_genero order by id desc`

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
const getSelectFilmsGenresByID = async function(id){
    try {
        let sql = `select * from tbl_filme_genero where id=${id}`

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
// Retorna os generos filtrado por id_filme
const getSelectGenresByIDFilm = async function(idFilme){
    try {
        let sql = `select tbl_genero.id, tbl_genero.nome 
                    from tbl_filme 
                        inner join tbl_filme_genero 
                            on tbl_filme.id = tbl_filme_genero.id_filme
                        inner join tbl_genero
                            on tbl_genero.id = tbl_filme_genero.id_genero
                    where tbl_filme.id=${idFilme}`
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
// Retorna os fimes filtrado por id_genero
const getSelectFilmsByIDGenre= async function(idGenero){
    try {
        let sql = `select tbl_filme.id, tbl_filme.nome 
                    from tbl_filme 
                        inner join tbl_filme_genero 
                            on tbl_filme.id = tbl_filme_genero.id_filme
                        inner join tbl_genero
                            on tbl_genero.id = tbl_filme_genero.id_genero
                    where id_genero=${idGenero}`
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
// Retorna o ultimo filme adicionado
const getSelectLastId = async function(){
    try {
        let sql = `select id from tbl_filme_genero order by id desc limit 1`
        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result)){
            return Number(result[0].id)
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}
const setInsertFilmsGeners = async function(filmeGenero){
    try {
        let sql = `INSERT INTO tbl_filme_genero (
                        id_filme, 
                        id_genero
                    ) VALUES (
                        ${filmeGenero.id_filme},
                        ${filmeGenero.id_genero})`
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
const setUpdateFilmsGeners = async function(filmeGenero){
    try {
        let sql =  `UPDATE tbl_filme_genero set
                        id_filme = ${filmeGenero.id_filme},
                        id_genero = ${filmeGenero.id_genero}
                    where id = ${filmeGenero.id}`
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
const setDeleteFilmsGeners = async function(id){
    try {
        let sql = `delete from tbl_filme_genero where id=${id}`
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

const setDeleteGenersByIdFilme = async function(id_filme) {
    try{
        let sql = `delete from tbl_filme_genero where id_filme = ${id_filme}`
        console.log(sql)
        let result = await prisma.$queryRawUnsafe(sql)
        if(Array.isArray(result)){
            return result
        }
    }catch(error){
        console.log(error)
        return false
    }
}

module.exports = {
    getSelectFilmsByIDGenre,
    getSelectAllFilmsGenres,
    getSelectFilmsGenresByID,
    getSelectGenresByIDFilm,
    getSelectLastId,
    setUpdateFilmsGeners,
    setInsertFilmsGeners,
    setDeleteFilmsGeners,
    setDeleteGenersByIdFilme
}