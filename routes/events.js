/*
    Events Routes
    /api/events
*/
const { Router } = require('express')
const router = Router()

const { check } = require('express-validator');

const { isDate } = require('../helpers/isDate')

const { validarJWT } = require('../middlewares/validar-jwt');  // para validar las rutas
const { getEventos, crearEvento, updateEvento, deleteEvento} = require('../controllers/events');
const { validarCampos } = require('../middlewares/validar-campos');


//router.get('/', validarJWT ,getEventos)
//router.post('/evento', validarJWT , postEvento)
//router.put('/evento/:id', validarJWT , updateEvento)
//router.delete('/evento/:id', validarJWT , deleteEvento)
router.use( validarJWT );      // con esto le digo que cualquier ruta de abajo necesita el middleware

router.get('/', getEventos)
//router.use( validarJWT );      // si se coloca aqui deja protegida las 3 de abajo y la ruta get queda publica

router.post(
    '/evento', 
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom( isDate ),   // helpers/isDate.js se crea el custom
        check('end', 'Fecha de finalización es obligatoria').custom( isDate ),   // helpers/isDate.js se crea el custom
        validarCampos
    ],
    crearEvento
)


router.put(
    '/evento/:id', 
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom( isDate ),   // helpers/isDate.js se crea el custom
        check('end', 'Fecha de finalización es obligatoria').custom( isDate ),   // helpers/isDate.js se crea el custom
        validarCampos
    ],
    updateEvento
)


router.delete('/evento/:id' , deleteEvento)

module.exports = router; 