const Donation = require('../models/Donation');

// Obtener todas las donaciones
const getAllDonations = async (req, res) => {
    try {
        const donations = await Donation.find().populate('donorId foundationId');
        res.status(200).json(donations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear una nueva donación
const createDonation = async (req, res) => {
    try {
        const { amount, type, status, date, donorId, foundationId } = req.body;
        const donation = new Donation({ amount, type, status, date, donorId, foundationId });
        await donation.save();
        res.status(201).json(donation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener una donación por ID
const getDonationById = async (req, res) => {
    try {
        const donation = await Donation.findById(req.params.id).populate('donorId foundationId');
        if (!donation) {
            return res.status(404).json({ message: 'Donación no encontrada' });
        }
        res.status(200).json(donation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar una donación
const updateDonation = async (req, res) => {
    try {
        const { amount, type, status, date, statusDelete, donorId, foundationId } = req.body;
        const donation = await Donation.findByIdAndUpdate(
            req.params.id,
            { amount, type, status, date, statusDelete, donorId, foundationId },
            { new: true }
        );
        if (!donation) {
            return res.status(404).json({ message: 'Donación no encontrada' });
        }
        res.status(200).json(donation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar una donación
const deleteDonation = async (req, res) => {
    try {
        const donation = await Donation.findByIdAndDelete(req.params.id);
        if (!donation) {
            return res.status(404).json({ message: 'Donación no encontrada' });
        }
        res.status(200).json({ message: 'Donación eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllDonations,
    createDonation,
    getDonationById,
    updateDonation,
    deleteDonation
};