const mongoose = require('mongoose');
const config = require( './keys' );

  //Conectamos a MongoDB; en producción creamos la variable de entorno con la cadena de conexión en producción, que incluye la password (asi no se verá publicamente al estar publicado en GIT) y en desarrollo usará la BD local.
  const MONGO_URI = process.env.MONGO_URI || config.MongoDBLocal;

  console.log('Intentado conectar a MongoBD: ' + MONGO_URI);

  require('dns').lookup(require('os').hostname(), function (err, add, fam) {
    console.log('Desde el servidor con IP: '+add);
  })

  mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
   .then(()=>console.log('Conectado con éxito a MongoDB'))