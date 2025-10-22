/************************************************************************************************************************************************
 * Objetivo: arquivo responsavel pelas requisições 
 * Data: 07/10/2025
 * Autor: Gustavo de Paula Silva
 * Versão: 1.0
 *                                                  
 * Observasções: instalar dependencias para criar a API
 *                  express      - npm install express --save       Instala as dependencias para criar uma API
 *                  cors         - npm install cors --save          Instala as dependencias para configurar as permissões de uma API
 *                  body-parser  - npm install body-parser --save   Instala as dependencias para receber os tipos de dados via POST o PUT
 *                               - npm i
 * 
 *                  Request     -> Recebe os dados
 *                  Response    -> Envia os dados na API
************************************************************************************************************************************************/
//import das dependencias 
const express           = require('express')
const cors              = require('cors')
const bodyParser        = require('body-parser')
//criar um objeto especialisa no formato JSON para receber os dados do body (POST & PUT)
const bodyParserJSON    = bodyParser.json()



//defini a porta padrão da API, se for em um servidor de nuvem não temos acesso a porta em execução local podemos definir uma porta
const PORT= process.PORT || 8080

//Instacia na classe do express
const app = express()

// Configurações do CORS
app.use((request, response, next) =>{
    response.header('Access-Control-Allow-Origin', '*') //IP de Origem
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS') // Metodos (Verbos) do protocolo HTTP
    
    app.use(cors())
    next()// Ler os proximos EndPoints
})
//import dos controller
const controllerFilms = require("./controller/filme/controller_filme.js")
const controllerGeneros = require("./controller/genero/controller_genero.js")
const controllerClassificacao = require("./controller/classificacao/controller_classificacao.js")
const controllerAtor = require("./controller/ator/controller_ator.js")


// Endpoint para o CRUD de Filmes

//retorna a lista de filmes
app.get("/v1/locadora/filme", cors(), async function (request, response) {
   let filme = await controllerFilms.listarFilmes()
   response.status(filme.status_code)
   response.json(filme)  
})
// retorna um filme pelo id
app.get("/v1/locadora/filme/:id", cors(), async function (request, response) {
    //recebe o id via parametro
    let idFilme = request.params.id
    let filme = await controllerFilms.buscarFilmeId(idFilme)
    response.status(filme.status_code)
    response.json(filme)  
})
//Insere um novo filme no DB
app.post('/v1/locadora/filme', cors(), bodyParserJSON, async function(request, response) {
  // Recebe o objeto JSON pelo body da requisição
    let dadosBody = request.body
    // Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    // chama a função da controller para inserir o filme, enviamos os dados do body e o content-text
    let filme = await controllerFilms.inserirFilme(dadosBody, contentType)
    response.status(filme.status_code)
    response.json(filme)
})
app.put('/v1/locadora/filme/:id',cors(), bodyParserJSON, async function(request, response) {
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
app.delete("/v1/locadora/filme/:id", cors(), async function (request, response) {
    //recebe o id via parametro
    let idFilme = request.params.id
    let filme = await controllerFilms.excluirFilme(idFilme)
    response.status(filme.status_code)
    response.json(filme)  
})
// crud generos
app.get("/v1/locadora/genero", cors(), async function (request, response) {
    let genero = await controllerGeneros.listarGeneros()
    response.status(genero.status_code)
    response.json(genero)  
})
app.get("/v1/locadora/genero/:id", cors(), async function (request, response) {
    let idGenero = request.params.id
    let genero = await controllerGeneros.buscarGeneroId(idGenero)
    response.status(genero.status_code)
    response.json(genero)  
})
app.post("/v1/locadora/genero", cors(), bodyParserJSON, async function (request, response) {
    let dadosBody = request.body
    // Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    let genero = await controllerGeneros.inserirGenero(dadosBody, contentType)
    response.status(genero.status_code)
    response.json(genero)  
})
app.put("/v1/locadora/genero/:id", cors(), bodyParserJSON, async function(request, response){
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
app.delete("/v1/locadora/genero/:id", cors(), async function(request, response){
    let idGenero = request.params.id
    let genero = await controllerGeneros.excluirGenero(idGenero)
    response.status(genero.status_code)
    response.json(genero)  

})
//crud classificação
app.get("/v1/locadora/classificacao", cors(), async function(request, response){
    let classificacao = await controllerClassificacao.listarClassificacao()
    response.status(classificacao.status_code)
    response.json(classificacao)
})
app.get("/v1/locadora/classificacao/:id", cors(), async function(request, response){
    let idClassificacao = request.params.id
    let classificacao = await controllerClassificacao.buscarClassificacaoId(idClassificacao)
    response.status(classificacao.status_code)
    response.json(classificacao)
})
app.post("/v1/locadora/classificacao", cors(), bodyParserJSON, async function(request,response){
    let dadosBody = request.body
    let contentType = request.headers['content-type']
    let classificacao = await controllerClassificacao.inserirClassificacao(dadosBody, contentType)
    response.status(classificacao.status_code)
    response.json(classificacao)  
})
app.put("/v1/locadora/classificacao/:id", cors(), bodyParserJSON, async function(request,response){
    let dadosBody = request.body

    let idClassificacao = request.params.id

    let contentType = request.headers['content-type']

    let classificacao = await controllerClassificacao.atualizarClassificacao(dadosBody, idClassificacao, contentType)
    response.status(classificacao.status_code)
    response.json(classificacao)  

})
app.delete("/v1/locadora/classificacao/:id", cors(), async function(request,response){
    let idClassificacao = request.params.id
    
    let classificacao = await controllerClassificacao.excluirClassificacao(idClassificacao)
    response.status(classificacao.status_code)
    response.json(classificacao)  
})
app.get("/v1/locadora/ator", cors(), async function(request, response){
    let ator = await controllerAtor.listarAtor()
    response.status(ator.status_code)
    response.json(ator)
})
app.get("/v1/locadora/ator/:id", cors(), async function(request, response){
    let idAtor = request.params.id
    let ator = await controllerAtor.buscarAtorById(idAtor)
    response.status(ator.status_code)
    response.json(ator)
})
app.listen(PORT, function(){
    console.log("API Aguardando requisições")
})
