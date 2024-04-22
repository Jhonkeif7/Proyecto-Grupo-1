const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware para analizar cuerpos de solicitud en formato JSON
app.use(bodyParser.json());

// Datos simulados
let users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];

// Ruta para obtener todos los usuarios
app.get('/api/users', (req, res) => {
    res.json(users);
});

// Ruta para obtener un usuario por su ID
app.get('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(user => user.id === userId);
    if (!user) {
        res.status(404).json({ error: 'Usuario no encontrado' });
    } else {
        res.json(user);
    }
});

// Ruta para crear un nuevo usuario
app.post('/api/users', (req, res) => {
    const newUser = req.body;
    users.push(newUser);
    res.status(201).json(newUser);
});

// Ruta para actualizar un usuario existente
app.put('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const updateUser = req.body;
    users = users.map(user => {
        if (user.id === userId) {
            return { ...user, ...updateUser };
        }
        return user;
    });
    res.json(users.find(user => user.id === userId));
});

// Ruta para eliminar un usuario
app.delete('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    users = users.filter(user => user.id !== userId);
    res.status(204).send();
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor API funcionando en http://localhost:${PORT}`);
});