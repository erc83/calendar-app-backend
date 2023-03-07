// aqui son las funciones

// funcion anonima
//(req, res) => {
//    console.log("se requiere /")
//    res.json({
//        ok: true,
//        msj: "login" 
//    })
//}

/*
const crearUsuario = (req, res) => {
    res.json({
        ok: true,
        msj: "login" 
    })
}*/

//const express = require('express')
const { response } = require('express')
//const crearUsuario = (req, res = express.response) => {    // detalle barbaro
// const { validationResult } = require('express-validator')     // el error se manejo con el middlewares 


const loginUsuario = (req, res = response) => {    // detalle barbaro
    const { email, password } = req.body
    



    res.status(201).json({
        ok: true,
        msj: "login",
        email,
        password 
    })
}







/*
const crearUsuario = (req, res = response) => {
    const { name, email, password } = req.body
    //console.log( req.body )
    if( name.length < 5 ) {
        return res.status(400).json({    // si no tiene el return se ejecutan el res.json de abajo y hace que se caiga el servidor
            ok: false,
            msj: 'El nombre debe ser de 5 letras minimo'
        })
    }
    res.status(201).json({
        ok: true,
        msg: "registro",
        //user: req.body
        name,
        email,
        password
    })
}*/

// controlando el error
const crearUsuario = (req, res = response) => {
    const { name, email, password } = req.body
    // se traslado al MIDDLEWARES Y SE LLAMO EN EL auth.js de routes
    // manejo de errores 
    //const errors = validationResult( req ); //console.log(errors)
    //if( !errors.isEmpty() ) {
    //    return res.status(400).json({           //este return impide que se ejecute el otro res.status(201).json()
    //        ok: false,
    //        errors: errors.mapped()
    //    })
    //}

    res.status(201).json({
        ok: true,
        msg: "registro",
        //user: req.body
        name,
        email,
        password
    })
}





const revalidarToken = (req, res = response) => {
    res.json({
        ok: true,
        msg: "renovar_jwt"
    })
}

// module.exports = crearUsuario   // seria la exportacion por defecto cuando es uno
module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}   // como son mas se exportan como un objeto

