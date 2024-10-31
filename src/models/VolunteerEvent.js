const mongoose = require('mongoose');

const VolunteerEventSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true
    },
    hours: {
        type: Number,
        required: true
    },
    statusDelete: {
        type: Boolean,
        default: false
    },
    volunteerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Volunteer',  // Referencia a la colección de voluntarios
        required: true
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',  // Referencia a la colección de eventos
        required: true
    }
}, { timestamps: true });  // Agrega campos de 'createdAt' y 'updatedAt' automáticamente

module.exports = mongoose.model('VolunteerEvent', VolunteerEventSchema);