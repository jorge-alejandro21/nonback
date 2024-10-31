const Transport = require('../models/Transport');

// Obtener todos los Transports
const getAllTransports = async (req, res) => {
    try {
        const transports = await Transport.find().populate('donationId');
        res.status(200).json(transports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo Transport
const createTransport = async (req, res) => {
    try {
        const { type, shippingDate, status, cost, donationId } = req.body;
        const transport = new Transport({ type, shippingDate, status, cost, donationId });
        await transport.save();
        res.status(201).json(transport);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener un Transport por ID
const getTransportById = async (req, res) => {
    try {
        const transport = await Transport.findById(req.params.id).populate('donationId');
        if (!transport) {
            return res.status(404).json({ message: 'Transport no encontrado' });
        }
        res.status(200).json(transport);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un Transport
const updateTransport = async (req, res) => {
    try {
        const { type, shippingDate, status, cost, statusDelete, donationId } = req.body;
        const transport = await Transport.findByIdAndUpdate(
            req.params.id,
            { type, shippingDate, status, cost, statusDelete, donationId },
            { new: true }
        );
        if (!transport) {
            return res.status(404).json({ message: 'Transport no encontrado' });
        }
        res.status(200).json(transport);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un Transport
const deleteTransport = async (req, res) => {
    try {
        const transport = await Transport.findByIdAndDelete(req.params.id);
        if (!transport) {
            return res.status(404).json({ message: 'Transport no encontrado' });
        }
        res.status(200).json({ message: 'Transport eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllTransports,
    createTransport,
    getTransportById,
    updateTransport,
    deleteTransport
};
