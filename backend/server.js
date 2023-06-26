const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname));

// Base de datos simulada
const users = [];

// Esquema de validación para el registro de usuarios
const registerSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

// Ruta POST para el registro de usuarios
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  // Validar los datos del registro utilizando el esquema
  const { error } = registerSchema.validate({ username, email, password });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // Validar si el usuario ya existe
  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.status(409).json({ message: 'El usuario ya existe' });
  }

  // Crear nuevo usuario
  const newUser = { username, email, password };
  users.push(newUser);

  res.json({ message: 'Registro exitoso' });
});

// Ruta POST para el inicio de sesión
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Verificar si el usuario existe y las credenciales son válidas
  const user = users.find(user => user.username === username && user.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Error en la autenticación' });
  }

  // Generar token de acceso
  const token = jwt.sign({ username }, 'secret-key');
  res.json({ token });
});

// Ruta GET para obtener información de los usuarios
app.get('/users', (req, res) => {
  res.json(users);
});

// Iniciar el servidor
app.listen(33000, () => {
  console.log('Servidor backend iniciado en el puerto 33000');
});
