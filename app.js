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
const bodyParserJSON    = bodyParser.json()
//criar um objeto especialisa no formato JSON para receber os dados do body (POST & PUT)

const filmeRoutes = require("./routes/filmeRoutes.js")
const generoRoutes = require("./routes/generoRoutes.js")
const classificacaoRoutes = require("./routes/classificacaoRoutes.js")
const atorRoutes = require("./routes/atorRoutes.js")
const diretorRoutes = require("./routes/diretorRoutes.js")
const publicadorRoutes = require("./routes/publicadorRoutes.js")


//defini a porta padrão da API, se for em um servidor de nuvem não temos acesso a porta em execução local podemos definir uma porta
const PORT= process.PORT || 8080

//Instacia na classe do express
const app = express()
app.use(express.json())

// Configurações do CORS
app.use((request, response, next) =>{
    response.header('Access-Control-Allow-Origin', '*') //IP de Origem
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS') // Metodos (Verbos) do protocolo HTTP
    
    app.use(cors())
    next()// Ler os proximos EndPoints
})

app.use("/v1/locadora", filmeRoutes )
app.use("/v1/locadora", generoRoutes )
app.use("/v1/locadora", classificacaoRoutes )
app.use("/v1/locadora", atorRoutes )
app.use("/v1/locadora", diretorRoutes )
app.use("/v1/locadora", publicadorRoutes )


// Endpoint para o CRUD de Filmes

app.listen(PORT, function(){
    console.log("API Aguardando requisições")
})
