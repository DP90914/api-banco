const express           = require('express')
const cors              = require('cors')
const bodyParser        = require('body-parser')
const bodyParserJSON    = bodyParser.json()

const router = express.Router()

const controllerClassificacao = require(".././controller/classificacao/controller_classificacao.js")

router.use((request, response, next) =>{
    response.header('Access-Control-Allow-Origin', '*') //IP de Origem
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS') // Metodos (Verbos) do protocolo HTTP
    
    router.use(cors())
    next()// Ler os proximos EndPoints
})


router.get("/classificacao", cors(), async function(request, response){
    let classificacao = await controllerClassificacao.listarClassificacao()
    response.status(classificacao.status_code)
    response.json(classificacao)
})
router.get("/classificacao/:id", cors(), async function(request, response){
    let idClassificacao = request.params.id
    let classificacao = await controllerClassificacao.buscarClassificacaoId(idClassificacao)
    response.status(classificacao.status_code)
    response.json(classificacao)
})
router.post("/classificacao", cors(), bodyParserJSON, async function(request,response){
    let dadosBody = request.body
    let contentType = request.headers['content-type']
    let classificacao = await controllerClassificacao.inserirClassificacao(dadosBody, contentType)
    response.status(classificacao.status_code)
    response.json(classificacao)  
})
router.put("/classificacao/:id", cors(), bodyParserJSON, async function(request,response){
    let dadosBody = request.body

    let idClassificacao = request.params.id

    let contentType = request.headers['content-type']

    let classificacao = await controllerClassificacao.atualizarClassificacao(dadosBody, idClassificacao, contentType)
    response.status(classificacao.status_code)
    response.json(classificacao)  

})
router.delete("/classificacao/:id", cors(), async function(request,response){
    let idClassificacao = request.params.id
    
    let classificacao = await controllerClassificacao.excluirClassificacao(idClassificacao)
    response.status(classificacao.status_code)
    response.json(classificacao)  
})
module.exports = router;