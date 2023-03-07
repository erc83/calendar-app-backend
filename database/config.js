const mongoose = require('mongoose');
require('dotenv').config()

const dbConnection = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.32gi3.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`,

        {
                useNewUrlParser: true, 
                useUnifiedTopology:true,
                //useCreateIndex: true
        });
            console.log('DB online')
        } catch (error) {
            console.log(error);
            //throw Error("Error al inicializar en la BD ")
        }
}


//forma 2 de coneccion a mongo DB
/*const dbConnection = async () => {
    
    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.32gi3.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`;
    return mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology:true,
            //useCreateIndex: true
    })
        .then(()=>console.log('conectado a mongodb'))
        .catch(e => console.log('error de conexión', e))
}*/



module.exports = {
    dbConnection
}