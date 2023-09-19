import express from 'express';
import User from '../models/users.js';
const router = express.Router();

// Ruta para el registro de usuarios
router.post('/usuarios', async (req, res) => {
  try {
    const { titulo, url } = req.body;
    const newUser = new User({ titulo, url });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
});


export default router;
