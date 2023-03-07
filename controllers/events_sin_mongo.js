const { response } = require('express')

const getEventos = (req, res = response) => {
    res.json({
        ok: true,
        msg: "get events"
    })
}

const crearEvento = (req, res = response) => {

    res.json({
        ok: true,
        msg: "post events"
    })
}

const updateEvento = (req, res = response) => {
    const { id } = req.params
     

    res.json({
        ok: true,
        msg: "put events",
        id
    })
}

const deleteEvento = (req, res = response) => {
    const { id } = req.params

    res.json({
        ok: true,
        msg: "delete events",
        id
    })
}

module.exports = {
    getEventos,
    crearEvento,
    updateEvento,
    deleteEvento
}