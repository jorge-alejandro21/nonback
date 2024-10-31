const VolunteerEvent = require('../models/VolunteerEvent');

// Obtener todos los VolunteerEvents
const getAllVolunteerEvents = async (req, res) => {
    try {
        const volunteerEvents = await VolunteerEvent.find().populate('volunteerId').populate('eventId');
        res.status(200).json(volunteerEvents);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo VolunteerEvent
const createVolunteerEvent = async (req, res) => {
    try {
        const { role, hours, volunteerId, eventId } = req.body;
        const volunteerEvent = new VolunteerEvent({ role, hours, volunteerId, eventId });
        await volunteerEvent.save();
        res.status(201).json(volunteerEvent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener un VolunteerEvent por ID
const getVolunteerEventById = async (req, res) => {
    try {
        const volunteerEvent = await VolunteerEvent.findById(req.params.id).populate('volunteerId').populate('eventId');
        if (!volunteerEvent) {
            return res.status(404).json({ message: 'VolunteerEvent no encontrado' });
        }
        res.status(200).json(volunteerEvent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un VolunteerEvent
const updateVolunteerEvent = async (req, res) => {
    try {
        const { role, hours, statusDelete, volunteerId, eventId } = req.body;
        const volunteerEvent = await VolunteerEvent.findByIdAndUpdate(
            req.params.id,
            { role, hours, statusDelete, volunteerId, eventId },
            { new: true }
        );
        if (!volunteerEvent) {
            return res.status(404).json({ message: 'VolunteerEvent no encontrado' });
        }
        res.status(200).json(volunteerEvent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un VolunteerEvent
const deleteVolunteerEvent = async (req, res) => {
    try {
        const volunteerEvent = await VolunteerEvent.findByIdAndDelete(req.params.id);
        if (!volunteerEvent) {
            return res.status(404).json({ message: 'VolunteerEvent no encontrado' });
        }
        res.status(200).json({ message: 'VolunteerEvent eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllVolunteerEvents,
    createVolunteerEvent,
    getVolunteerEventById,
    updateVolunteerEvent,
    deleteVolunteerEvent
};