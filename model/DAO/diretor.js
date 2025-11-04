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
                null,
                '${diretor.img_diretor}'
            )`
            let result = await prisma.$executeRawUnsafe(sql)
            if(result){
                return true
            }else{
                return false
            }

        } else {
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
const setUpdateDiretor = async function(diretor) {
    try{
        let sql = `update tbl_diretor set
                        nome = '${diretor.nome}',
                        genero = '${diretor.genero}',
                        data_nascimento ="${diretor.data_nascimento}",
                        data_morte = "${diretor.data_morte}",
                        biografia = "${diretor.biografia}",
                        img_diretor = "${diretor.img_diretor}"
                    where id = ${diretor.id}`
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

const setDeleteDiretor = async function(id) {
    try{
        let sql = `delete from tbl_diretor where id = ${id}`
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

const getSelectLastIdDiretor = async function() {
    try{
        let sql =`select id from tbl_diretor order by id desc limit 1`
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
    getDiretor,
    getDiretorById,
    setInsertDiretor,
    getSelectLastIdDiretor,
    setUpdateDiretor,
    setDeleteDiretor
}