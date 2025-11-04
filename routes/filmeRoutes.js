const express = require('express')


const cors              = require('cors')

const bodyParser        = require('body-parser')
const bodyParserJSON    = bodyParser.json()


const controllerFilms = require(".././controller/filme/controller_filme.js")
const router = express.Router()

router.use((request, response, next) =>{
    response.header('Access-Control-Allow-Origin', '*') //IP de Origem
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS') // Metodos (Verbos) do protocolo HTTP
    
    router.use(cors())
    next()// Ler os proximos EndPoints
})

router.get("/filme", cors(), async function (request, response) {
   let filme = await controllerFilms.listarFilmes()
   response.status(filme.status_code)
   response.json(filme)  
})
// retorna um filme pelo id
router.get("/filme/:id", cors(), async function (request, response) {
    //recebe o id via parametro
    let idFilme = request.params.id
    let filme = await controllerFilms.buscarFilmeId(idFilme)
    response.status(filme.status_code)
    response.json(filme)  
})

//Insere um novo filme no DB
router.post('/filme', cors(), bodyParserJSON, async function(request, response) {
  // Recebe o objeto JSON pelo body da requisição
    let dadosBody = request.body
    // Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    // chama a função da controller para inserir o filme, enviamos os dados do body e o content-text
    let filme = await controllerFilms.inserirFilme(dadosBody, contentType)
    response.status(filme.status_code)
    response.json(filme)
})

router.put('/filme/:id',cors(), bodyParserJSON, async function(request, response) {
    //recebe dados do body
    let dadosBody = request.body

    //recebe o id pela url
    let idFilme = request.params.id

    //recebe o content-type
    let contentType = request.headers['content-type']

    let filme = await controllerFilms.atualizarFilme(dadosBody, idFilme, contentType)
    response.status(filme.status_code)
    response.json(filme)
})

router.delete("/filme/:id", cors(), async function (request, response) {
    //recebe o id via parametro
    let idFilme = request.params.id
    let filme = await controllerFilms.excluirFilme(idFilme)
    response.status(filme.status_code)
    response.json(filme)  
})

module.exports = router;