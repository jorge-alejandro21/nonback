const Volunteer = require('../models/Volunteer');

// Obtener todos los Volunteers
const getAllVolunteers = async (req, res) => {
    try {
        const volunteers = await Volunteer.find().populate('userId');
        res.status(200).json(volunteers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo Volunteer
const createVolunteer = async (req, res) => {
    try {
        const { skills, availability, interests, userId } = req.body;
        const volunteer = new Volunteer({ skills, availability, interests, userId });
        await volunteer.save();
        res.status(201).json(volunteer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener un Volunteer por ID
const getVolunteerById = async (req, res) => {
    try {
        const volunteer = await Volunteer.findById(req.params.id).populate('userId');
        if (!volunteer) {
            return res.status(404).json({ message: 'Volunteer no encontrado' });
        }
        res.status(200).json(volunteer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un Volunteer
const updateVolunteer = async (req, res) => {
    try {
        const { skills, availability, interests, statusDelete, userId } = req.body;
        const volunteer = await Volunteer.findByIdAndUpdate(
            req.params.id,
            { skills, availability, interests, statusDelete, userId },
            { new: true }
        );
        if (!volunteer) {
            return res.status(404).json({ message: 'Volunteer no encontrado' });
        }
        res.status(200).json(volunteer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un Volunteer
const deleteVolunteer = async (req, res) => {
    try {
        const volunteer = await Volunteer.findByIdAndDelete(req.params.id);
        if (!volunteer) {
            return res.status(404).json({ message: 'Volunteer no encontrado' });
        }
        res.status(200).json({ message: 'Volunteer eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllVolunteers,
    createVolunteer,
    getVolunteerById,
    updateVolunteer,
    deleteVolunteer
};