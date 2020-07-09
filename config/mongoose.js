const mongoose = require('mongoose');

  //Conectamos a MongoDB; en producción creamos la variable de entorno con la cadena de conexión en producción, que incluye la password (asi no se verá publicamente al estar publicado en GIT) y en desarrollo usará la BD local.
  const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/pruebas'; //'mongodb+srv://sa:TKVg6qgR14D5c6my@clusterxtv.qfdke.azure.mongodb.net/pruebas?retryWrites=true&w=majority'

  console.log('Intentado conectar a MongoBD: ' + MONGO_URI);

  require('dns').lookup(require('os').hostname(), function (err, add, fam) {
    console.log('Desde el servidor con IP: '+add);
  })

  mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
   .then(()=>console.log('Conectado con éxito a MongoDB'))
   .catch(console.error);