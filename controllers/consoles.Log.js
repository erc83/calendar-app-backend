require('dotenv').config();

const PORT = process.env.PORT

const servidoron = () => {
    console.log("Servidor corriendo en puerto:", PORT)
}

module.exports = {
    servidoron
}
