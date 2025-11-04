const express           = require('express')
const cors              = require('cors')
const bodyParser        = require('body-parser')
const bodyParserJSON    = bodyParser.json()

const controllerPublicador = require(".././controller/publicador/controller_publicador.js")

const router = express.Router()

router.use((request, response, next) =>{
    response.header('Access-Control-Allow-Origin', '*') //IP de Origem
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS') // Metodos (Verbos) do protocolo HTTP
    
    router.use(cors())
    next()// Ler os proximos EndPoints
})


router.get("/publicador", cors(), async function(request, response) {
    let publicador = await controllerPublicador.listarPublicador()
    response.status(publicador.status_code)
    response.json(publicador)
})
router.get("/publicador/:id", cors(), async function(request, response){
    let idPublicador = request.params.id
    let publicador = await controllerPublicador.buscarPublicadorById(idPublicador)
    response.status(publicador.status_code)
    response.json(publicador)
})
router.post("/publicador", cors(), bodyParserJSON, async function(request, response) {
    let dadosBody = request.body
    let contentType = request.headers["content-type"]
    let publicador = await controllerPublicador.inserirPublicador(dadosBody, contentType)
    response.status(publicador.status_code)
    response.json(publicador)
})

router.put("/publicador/:id", cors(), bodyParserJSON, async function(request,response){
    let dadosBody = request.body

    let idPublicador = request.params.id

    let contentType = request.headers['content-type']

    let publicador = await controllerPublicador.atualizarPublicador(dadosBody, idPublicador, contentType)
    response.status(publicador.status_code)
    response.json(publicador)  
})
router.delete("/publicador/:id", cors(), async function(request, response){
    let idPublicador = request.params.id
    let publicador = await controllerPublicador.excluirPublicador(idPublicador)
    response.status(publicador.status_code)
    response.json(publicador)  

})
module.exports = router;