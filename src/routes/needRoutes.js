const express = require('express');
const {
    getAllNeeds,
    createNeed,
    getNeedById,
    updateNeed,
    deleteNeed
} = require('../controllers/needController');

const router = express.Router();

// Ruta para obtener todas las Needs
router.get('/', getAllNeeds);

// Ruta para crear una nueva Need
router.post('/', createNeed);

// Ruta para obtener una Need por ID
router.get('/:id', getNeedById);

// Ruta para actualizar una Need
router.put('/:id', updateNeed);

// Ruta para eliminar una Need
router.delete('/:id', deleteNeed);

module.exports = router;