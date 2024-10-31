const Event = require('../models/Event');

// Obtener todos los eventos
const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find().populate('foundationId');
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo evento
const createEvent = async (req, res) => {
    try {
        const { name, description, date, location, eventType, foundationId } = req.body;
        const event = new Event({ name, description, date, location, eventType, foundationId });
        await event.save();
        res.status(201).json(event);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener un evento por ID
const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id).populate('foundationId');
        if (!event) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un evento
const updateEvent = async (req, res) => {
    try {
        const { name, description, date, location, statusDelete, eventType, foundationId } = req.body;
        const event = await Event.findByIdAndUpdate(
            req.params.id,
            { name, description, date, location, statusDelete, eventType, foundationId },
            { new: true }
        );
        if (!event) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un evento
const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }
        res.status(200).json({ message: 'Evento eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllEvents,
    createEvent,
    getEventById,
    updateEvent,
    deleteEvent
};