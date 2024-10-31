const Foundation = require('../models/Foundation');

// Obtener todas las fundaciones
const getAllFoundations = async (req, res) => {
    try {
        const foundations = await Foundation.find().populate('adminId');
        res.status(200).json(foundations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear una nueva fundación
const createFoundation = async (req, res) => {
    try {
        const { name, address, email, mission, vision, bankAccount, adminId } = req.body;
        const foundation = new Foundation({ name, address, email, mission, vision, bankAccount, adminId });
        await foundation.save();
        res.status(201).json(foundation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener una fundación por ID
const getFoundationById = async (req, res) => {
    try {
        const foundation = await Foundation.findById(req.params.id).populate('adminId');
        if (!foundation) {
            return res.status(404).json({ message: 'Fundación no encontrada' });
        }
        res.status(200).json(foundation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar una fundación
const updateFoundation = async (req, res) => {
    try {
        const { name, address, email, mission, vision, bankAccount, statusDelete, adminId } = req.body;
        const foundation = await Foundation.findByIdAndUpdate(
            req.params.id,
            { name, address, email, mission, vision, bankAccount, statusDelete, adminId },
            { new: true }
        );
        if (!foundation) {
            return res.status(404).json({ message: 'Fundación no encontrada' });
        }
        res.status(200).json(foundation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar una fundación
const deleteFoundation = async (req, res) => {
    try {
        const foundation = await Foundation.findByIdAndDelete(req.params.id);
        if (!foundation) {
            return res.status(404).json({ message: 'Fundación no encontrada' });
        }
        res.status(200).json({ message: 'Fundación eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllFoundations,
    createFoundation,
    getFoundationById,
    updateFoundation,
    deleteFoundation
};