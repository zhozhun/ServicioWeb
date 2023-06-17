const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.send('Bienvenido al servidor backend');
});

// Endpoint para el registro de usuarios
app.post('/register', (req, res) => {
  // Aquí se guarda el usuario y la contraseña en la base de datos
  const { username, password } = req.body;
  // Lógica de almacenamiento en la base de datos
  
  res.json({ message: 'Registro exitoso' });
});

// Endpoint para el inicio de sesión
app.post('/login', (req, res) => {
  // Aquí puedes realizar la lógica de autenticación
  const { username, password } = req.body;
  // Lógica de autenticación
  
  if (username === 'usuario' && password === 'contrasena') {
    res.json({ message: 'Autenticación exitosa' });
  } else {
    res.status(401).json({ message: 'Error en la autenticación' });
  }
});

// Iniciar el servidor
app.listen(33000, () => {
  console.log('Servidor backend iniciado en el puerto 33000');
});
