const express = require('express');
const {
    getAllVolunteers,
    createVolunteer,
    getVolunteerById,
    updateVolunteer,
    deleteVolunteer
} = require('../controllers/volunteerController');

const router = express.Router();

// Ruta para obtener todos los Volunteers
router.get('/', getAllVolunteers);

// Ruta para crear un nuevo Volunteer
router.post('/', createVolunteer);

// Ruta para obtener un Volunteer por ID
router.get('/:id', getVolunteerById);

// Ruta para actualizar un Volunteer
router.put('/:id', updateVolunteer);

// Ruta para eliminar un Volunteer
router.delete('/:id', deleteVolunteer);

module.exports = router;
