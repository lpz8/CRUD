const express = require('express');
const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Base de datos simulada (array de usuarios)
let usuarios = [
  { id: 1, nombre: 'Ryu', edad: 33, lugarProcedencia: 'Japón' },
  { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
  { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'EE.UU.' },
  { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
  { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' }
];

// Endpoint para la raíz
app.get('/', (req, res) => {
  res.send('Bienvenido a la API CRUD de Street Fighter - Usa /usuarios para ver la lista');
});

// CRUD Operations
// (Mantén el resto del código igual que antes)

// 1. Obtener la lista de todos los usuarios (GET /usuarios)
app.get('/usuarios', (req, res) => {
  res.json(usuarios);
});

// 2. Obtener un usuario por ID (GET /usuarios/:id)
app.get('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const usuario = usuarios.find(u => u.id === id);
  if (usuario) {
    res.json(usuario);
  } else {
    res.status(404).json({ error: 'Usuario no encontrado' });
  }
});

// 3. Crear un nuevo usuario (POST /usuarios)
app.post('/usuarios', (req, res) => {
  const nuevoUsuario = req.body;
  nuevoUsuario.id = usuarios.length + 1;
  usuarios.push(nuevoUsuario);
  res.status(201).json(nuevoUsuario);
});

// 4. Actualizar un usuario (PUT /usuarios/:id)
app.put('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const indice = usuarios.findIndex(u => u.id === id);
  if (indice !== -1) {
    usuarios[indice] = { ...usuarios[indice], ...req.body };
    res.json(usuarios[indice]);
  } else {
    res.status(404).json({ error: 'Usuario no encontrado' });
  }
});

// 5. Eliminar un usuario (DELETE /usuarios/:id)
app.delete('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const indice = usuarios.findIndex(u => u.id === id);
  if (indice !== -1) {
    usuarios.splice(indice, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Usuario no encontrado' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});