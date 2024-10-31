const express = require('express');
const {
    getAllDonations,
    createDonation,
    getDonationById,
    updateDonation,
    deleteDonation
} = require('../controllers/donationController');

const router = express.Router();

// Ruta para obtener todas las donaciones
router.get('/', getAllDonations);

// Ruta para crear una nueva donación
router.post('/', createDonation);

// Ruta para obtener una donación por ID
router.get('/:id', getDonationById);

// Ruta para actualizar una donación
router.put('/:id', updateDonation);

// Ruta para eliminar una donación
router.delete('/:id', deleteDonation);

module.exports = router;