const express = require('express');
const {
    getAllEvents,
    createEvent,
    getEventById,
    updateEvent,
    deleteEvent
} = require('../controllers/eventController');

const router = express.Router();

// Ruta para obtener todos los eventos
router.get('/', getAllEvents);

// Ruta para crear un nuevo evento
router.post('/', createEvent);

// Ruta para obtener un evento por ID
router.get('/:id', getEventById);

// Ruta para actualizar un evento
router.put('/:id', updateEvent);

// Ruta para eliminar un evento
router.delete('/:id', deleteEvent);

module.exports = router;