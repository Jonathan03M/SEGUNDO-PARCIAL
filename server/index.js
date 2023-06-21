import express from 'express';
import mariadb from 'mariadb';
import mongoose from 'mongoose';

const app = express();


app.get('/',  (req, res) => {
    res.send('Conexión exitosa');
})

// Endpoint de verificación de conexión a MariaDB
app.get('/check-mariadb-connection', async (req, res) => {
  try {
    const connection = await mariadb.createConnection({
        host: 'database',
        user: 'root',
        password: 'password',
        database: 'examen',
      });
      
    await connection.end();
    console.log('Conexion exitosa a MariaDB')
    res.send('Conexión exitosa a MariaDB');
  } catch (error) {
    console.error('Error de conexión a MariaDB:', error);
    res.status(500).send('Error de conexión a MariaDB');
  }
});

// Endpoint de verificación de conexión a MongoDB
app.get('/check-mongodb-connection', (req, res) => {
  mongoose
    .connect('mongodb+srv://root:jonathan03@cluster0.xc3jmrd.mongodb.net/', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Conexión exitosa a MongoDB');
      res.send('Conexión exitosa a MongoDB');
    })
    .catch((error) => {
      console.error('Error de conexión a MongoDB:', error);
      res.status(500).send('Error de conexión a MongoDB');
    });
});

// Inicia el servidor
app.listen(3000, () => {
  console.log('Servidor en línea en el puerto 3000');
});
