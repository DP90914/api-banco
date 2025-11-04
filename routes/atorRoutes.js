const express           = require('express')
const cors              = require('cors')
const bodyParser        = require('body-parser')
const bodyParserJSON    = bodyParser.json()

const controllerAtor = require(".././controller/ator/controller_ator.js")
const router = express.Router()

router.use((request, response, next) =>{
    response.header('Access-Control-Allow-Origin', '*') //IP de Origem
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS') // Metodos (Verbos) do protocolo HTTP
    
    router.use(cors())
    next()// Ler os proximos EndPoints
})

router.get("/ator", cors(), async function(request, response){
    let ator = await controllerAtor.listarAtor()
    response.status(ator.status_code)
    response.json(ator)
})
router.get("/ator/:id", cors(), async function(request, response){
    let idAtor = request.params.id
    let ator = await controllerAtor.buscarAtorById(idAtor)
    response.status(ator.status_code)
    response.json(ator)
})
router.post("/ator", cors(), bodyParserJSON, async function(request, response) {
    let dadosBody = request.body
    let contentType = request.headers["content-type"]
    let ator = await controllerAtor.inserirAtor(dadosBody, contentType)
    response.status(ator.status_code)
    response.json(ator)
})
router.put("/ator/:id", cors(), bodyParserJSON, async function(request,response){
    let dadosBody = request.body

    let idAtor = request.params.id

    let contentType = request.headers['content-type']

    let ator = await controllerAtor.atualizarAtor(dadosBody, idAtor, contentType)
    response.status(ator.status_code)
    response.json(ator)  

})
router.delete("/ator/:id", cors(), async function(request, response){
    let idAtor = request.params.id
    let ator = await controllerAtor.excluirAtor(idAtor)
    response.status(ator.status_code)
    response.json(ator)  

})

module.exports = router;