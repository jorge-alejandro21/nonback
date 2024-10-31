const express = require('express');
const {
    getAllVolunteerEvents,
    createVolunteerEvent,
    getVolunteerEventById,
    updateVolunteerEvent,
    deleteVolunteerEvent
} = require('../controllers/volunteerEventController');

const router = express.Router();

// Ruta para obtener todos los VolunteerEvents
router.get('/', getAllVolunteerEvents);

// Ruta para crear un nuevo VolunteerEvent
router.post('/', createVolunteerEvent);

// Ruta para obtener un VolunteerEvent por ID
router.get('/:id', getVolunteerEventById);

// Ruta para actualizar un VolunteerEvent
router.put('/:id', updateVolunteerEvent);

// Ruta para eliminar un VolunteerEvent
router.delete('/:id', deleteVolunteerEvent);

module.exports = router;