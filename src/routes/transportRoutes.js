const express = require('express');
const {
    getAllTransports,
    createTransport,
    getTransportById,
    updateTransport,
    deleteTransport
} = require('../controllers/transportController');

const router = express.Router();

// Ruta para obtener todos los Transports
router.get('/', getAllTransports);

// Ruta para crear un nuevo Transport
router.post('/', createTransport);

// Ruta para obtener un Transport por ID
router.get('/:id', getTransportById);

// Ruta para actualizar un Transport
router.put('/:id', updateTransport);

// Ruta para eliminar un Transport
router.delete('/:id', deleteTransport);

module.exports = router;
