const express           = require('express')
const cors              = require('cors')
const bodyParser        = require('body-parser')
const bodyParserJSON    = bodyParser.json()

const controllerGeneros = require(".././controller/genero/controller_genero.js")
const router = express.Router()

router.use((request, response, next) =>{
    response.header('Access-Control-Allow-Origin', '*') //IP de Origem
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS') // Metodos (Verbos) do protocolo HTTP
    
    router.use(cors())
    next()// Ler os proximos EndPoints
})


router.get("/genero", cors(), async function (request, response) {
    let genero = await controllerGeneros.listarGeneros()
    response.status(genero.status_code)
    response.json(genero)  
})
router.get("/genero/:id", cors(), async function (request, response) {
    let idGenero = request.params.id
    let genero = await controllerGeneros.buscarGeneroId(idGenero)
    response.status(genero.status_code)
    response.json(genero)  
})
router.post("/genero", cors(), bodyParserJSON, async function (request, response) {
    let dadosBody = request.body
    // Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    let genero = await controllerGeneros.inserirGenero(dadosBody, contentType)
    response.status(genero.status_code)
    response.json(genero)  
})
router.put("/genero/:id", cors(), bodyParserJSON, async function(request, response){
    //recebe dados do body
    let dadosBody = request.body

    //recebe o id pela url
    let idGenero = request.params.id

    //recebe o content-type
    let contentType = request.headers['content-type']

    let genero = await controllerGeneros.atualizarGenero(dadosBody, idGenero, contentType)
    response.status(genero.status_code)
    response.json(genero)  
})
router.delete("/genero/:id", cors(), async function(request, response){
    let idGenero = request.params.id
    let genero = await controllerGeneros.excluirGenero(idGenero)
    response.status(genero.status_code)
    response.json(genero)  

})
module.exports = router;