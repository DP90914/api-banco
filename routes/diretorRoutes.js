const express           = require('express')
const cors              = require('cors')
const bodyParser        = require('body-parser')
const bodyParserJSON    = bodyParser.json()


const controllerDiretor = require(".././controller/diretor/controller_diretor.js")

const router = express.Router()

router.use((request, response, next) =>{
    response.header('Access-Control-Allow-Origin', '*') //IP de Origem
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS') // Metodos (Verbos) do protocolo HTTP
    
    router.use(cors())
    next()// Ler os proximos EndPoints
})

router.get("/diretor", cors(), async function(request, response) {
    let diretor = await controllerDiretor.listarDiretor()
    response.status(diretor.status_code)
    response.json(diretor)
})

router.get("/diretor/:id", cors(), async function(request, response){
    let idDiretor = request.params.id
    let diretor = await controllerDiretor.listarDiretorById(idDiretor)
    response.status(diretor.status_code)
    response.json(diretor)
})

router.post("/diretor", cors(), bodyParserJSON, async function(request, response) {
    let dadosBody = request.body
    let contentType = request.headers["content-type"]
    let ator = await controllerDiretor.inserirDiretor(dadosBody, contentType)
    response.status(ator.status_code)
    response.json(ator)
})

router.put("/diretor/:id", cors(), bodyParserJSON, async function(request,response){
    let dadosBody = request.body

    let idDiretor = request.params.id

    let contentType = request.headers['content-type']

    let diretor = await controllerDiretor.atualizarDiretor(dadosBody, idDiretor, contentType)
    response.status(diretor.status_code)
    response.json(diretor)  
})
router.delete("/diretor/:id", cors(), async function(request, response){
    let idDiretor = request.params.id
    let diretor = await controllerDiretor.excluirDiretor(idDiretor)
    response.status(diretor.status_code)
    response.json(diretor)  

})
module.exports = router;