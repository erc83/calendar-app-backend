const { response } = require('express')
const { validationResult } = require('express-validator')

const validarCampos = (req, res = response, next) => {

    const errors = validationResult( req )
    if ( !errors.isEmpty() ) {
        return res.status(400).json({   // si entra en el return no entra el next
            ok: false,
            errors: errors.mapped()
        })
    }
    next();    
}

module.exports = { validarCampos }  
