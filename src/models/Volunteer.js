const mongoose = require('mongoose');

const VolunteerSchema = new mongoose.Schema({
    skills: {
        type: [String],  // Lista de habilidades
        required: true
    },
    availability: {
        type: String,  // Disponibilidad (ejemplo: "full-time", "part-time")
        required: true
    },
    interests: {
        type: [String],  // Lista de intereses
        required: true
    },
    statusDelete: {
        type: Boolean,
        default: false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Referencia a la colección de usuarios
        required: true
    }
}, { timestamps: true });  // Agrega campos 'createdAt' y 'updatedAt'

module.exports = mongoose.model('Volunteer', VolunteerSchema);
