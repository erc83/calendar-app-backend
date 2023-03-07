/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/
const express = require('express');
const router = express.Router()
// const { Router } = require('express')   destructuring
// const router = Router();                se necesita ejecutar la función

const { check } = require('express-validator');

const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');

const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt') // para validar JWt

router.post("/", 
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    loginUsuario)





    
http://localhost:3000/api/auth/registro  

router.post('/registro',
    [ //middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ], 
    crearUsuario)


router.get('/renovar', validarJWT, revalidarToken) // como solo es un middleware se pasa almedio

module.exports = router;
