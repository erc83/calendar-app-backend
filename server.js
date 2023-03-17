const express = require("express")
require('dotenv').config();
const cors = require('cors')
const { servidoron } = require("./controllers/consoles.Log")


const api_auth = require('./routes/auth.js')
const api_events = require('./routes/events.js')

const { dbConnection } = require('./database/config')

// console.log( process.env )   para ver por consola todas las variables de entorno
// Crear el servidor de express
const app = express();
const PORT = process.env.PORT

// Base de datos
dbConnection();

// CORS
app.use(cors())

// Directorio Publico
app.use(express.static("public"))

// lectura y parseo el body
app.use( express.urlencoded({ extended: true }))
app.use( express.json() );

//Rutas
// TODO: aut // crear, login, renew
// TODO: CRUD: Eventos

//app.use('/api/auth', require('./routes/auth.js') );
app.use('/api/auth', api_auth ); 
app.use('/api/events', api_events);

// Escuchar peticiones
app.get('/', (req, res) => {
    res.send("BLoqueado")
})

app.listen(PORT, 
    servidoron
)

