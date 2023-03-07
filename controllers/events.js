const { response } = require('express')
const Evento = require('../models/Evento-model')

const getEventos = async(req, res = response) => {

    const eventos = await Evento.find()  // se pueden agregar filtros igual
                                //.populate('user')   //llama a toda la informacion del usuario
                                .populate('user', 'name')   //con un parametro y el id viene tambien
                                //.populate('user', 'name email')   //con mas de un parametro
    res.json({
        ok: true,
        eventos
    })
}




const crearEvento = async(req, res = response) => {
    //const evento = new Evento( req.body );
    const {title, notes, start, end, user} = req.body

    const evento = new Evento( { title, notes, start, end, user } )
    
    try {  
        evento.user = req.uid
        
        const eventoGuardado = await evento.save()
        
        res.json({
            ok: true,
            evento: eventoGuardado
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        })
    }
}

const updateEvento = async(req, res = response) => {  
    const eventoId  = req.params.id
    const uid = req.uid

    try {
        const evento = await Evento.findById( eventoId );
        
        if( !evento ) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            })
        } 

        // logica para revisar que es evento
        if ( evento.user.toString() !== uid ) {      // se agrega toString() para obtener el valor de id y comparar
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            })
        }

        // si llega aqui es porque es el usuario y puede actualizar    se agrega el uid a user para mantener el usuario
        const nuevoEvento = { ...req.body, user: uid }

        //const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento );    // se pueden agregar mas configuraciones pero es para ver que pasa
        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, { new: true } ); //para retornar el evento actualizado como respuesta  

        res.status(201).json({
            ok: true,
            evento: eventoActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const deleteEvento = async (req, res = response) => {
    const eventoId  = req.params.id
    const uid = req.uid
    try {
        const evento = await Evento.findById( eventoId );
        if( !evento ) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            })
        }
        // logica para revisar que es evento
        if ( evento.user.toString() !== uid ) {      // se agrega toString() para obtener el valor de id y comparar
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            })
        }

        const eventoEliminado = await Evento.findByIdAndRemove( eventoId )

        res.status(201).json({
            ok: true,
            msg: `Evento Eliminado con exito ${eventoEliminado.title}`,
            evento: eventoEliminado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

module.exports = {
    getEventos,
    crearEvento,
    updateEvento,
    deleteEvento
}