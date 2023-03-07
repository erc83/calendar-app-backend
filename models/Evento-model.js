const { Schema, model } = require('mongoose')

const EventoSchema = Schema({
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,  // con se puede saber quien creo el evento
        ref: 'Usuario',                  // referencia al Schema usuario
        required: true                 // este required es distinto a los otros
    }
})

// para aplicar como quiero que se vea cuando guardo el archivo ||  en la base de datos se mantiene el _id y el __v
EventoSchema.method('toJSON', function() {
    const { __v, _id, ...object} = this.toObject();
    object.id = _id;
    return object; 
})

module.exports = model ('Evento', EventoSchema)