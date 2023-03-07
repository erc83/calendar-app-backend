const { response } = require('express')
const bcrypt = require('bcryptjs')
const Usuario = require('../models/Usuario-model')
const { generarJWT } = require('../helpers/jwt') 



const loginUsuario = async (req, res = response) => { 
    const { email, password } = req.body
    try {
        const usuario = await Usuario.findOne({ email })  // no se renombrara la constante
        if( !usuario ) {     // si no existe el usuario se manda el error
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            })
        }
        // confirmar los pasword
        const validPassword = bcrypt.compareSync( password, usuario.password );
        if ( !validPassword ){
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            })
        }
        // Genera nuestro JWT  se vera en el próximo
        const token = await generarJWT( usuario.id, usuario.name);

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })    

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msj: 'Por favor hable con el administrador'
        })
    }
}




const crearUsuario = async(req, res = response) => {
    const { name, email, password } = req.body
    try {
        let usuario = await Usuario.findOne({ email })
        if( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario existe con ese correo'
            })
        }
        usuario = new Usuario( { name, email, password } );   // como viene de una let se reutiliza        
        // encryptar contraseña
        const salt = bcrypt.genSaltSync()      // queda con el valor de 10 por defecto
        usuario.password = bcrypt.hashSync( password, salt );

        await usuario.save()
        
        // Generar token
        const token = await generarJWT( usuario.id, usuario.name);  //almacena el token aca

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token                   // aqui el token va a ser igual al token
        })    
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msj: 'Por favor hable con el administrador'
        })
    }
}

const revalidarToken = async (req, res = response) => {
    //const uid = req.uid;    // ya viene se agrego en el middleware de verificación
    //const name = req.name
    const { uid, name } = req

    // generar un nuevo JWT y retornarlo en esta peticion
    const token = await generarJWT( uid, name);

    res.json({
        ok: true,
        //        msg: "renovar_jwt"
        //uid: uid,     //ambos son iguales 
        //name,
        token         //esta es la manera de revalidar el token
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}   

