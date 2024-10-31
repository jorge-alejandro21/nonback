const Need = require('../models/Need');

// Obtener todas las Needs
const getAllNeeds = async (req, res) => {
    try {
        const needs = await Need.find().populate('foundationId');
        res.status(200).json(needs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear una nueva Need
const createNeed = async (req, res) => {
    try {
        const { description, priority, requestDate, status, foundationId } = req.body;
        const need = new Need({ description, priority, requestDate, status, foundationId });
        await need.save();
        res.status(201).json(need);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener una Need por ID
const getNeedById = async (req, res) => {
    try {
        const need = await Need.findById(req.params.id).populate('foundationId');
        if (!need) {
            return res.status(404).json({ message: 'Need no encontrada' });
        }
        res.status(200).json(need);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar una Need
const updateNeed = async (req, res) => {
    try {
        const { description, priority, requestDate, status, statusDelete, foundationId } = req.body;
        const need = await Need.findByIdAndUpdate(
            req.params.id,
            { description, priority, requestDate, status, statusDelete, foundationId },
            { new: true }
        );
        if (!need) {
            return res.status(404).json({ message: 'Need no encontrada' });
        }
        res.status(200).json(need);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar una Need
const deleteNeed = async (req, res) => {
    try {
        const need = await Need.findByIdAndDelete(req.params.id);
        if (!need) {
            return res.status(404).json({ message: 'Need no encontrada' });
        }
        res.status(200).json({ message: 'Need eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllNeeds,
    createNeed,
    getNeedById,
    updateNeed,
    deleteNeed
};