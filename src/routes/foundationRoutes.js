const express = require('express');
const {
    getAllFoundations,
    createFoundation,
    getFoundationById,
    updateFoundation,
    deleteFoundation
} = require('../controllers/foundationController');

const router = express.Router();

// Ruta para obtener todas las fundaciones
router.get('/', getAllFoundations);

// Ruta para crear una nueva fundación
router.post('/', createFoundation);

// Ruta para obtener una fundación por ID
router.get('/:id', getFoundationById);

// Ruta para actualizar una fundación
router.put('/:id', updateFoundation);

// Ruta para eliminar una fundación
router.delete('/:id', deleteFoundation);

module.exports = router;