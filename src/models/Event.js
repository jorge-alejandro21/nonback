const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    name: {
        type: String,  // Nombre del evento
        required: true
    },
    description: {
        type: String,  // Descripción del evento
        default: ''
    },
    date: {
        type: Date,  // Fecha del evento
        required: true
    },
    location: {
        type: String,  // Ubicación del evento
        default: ''
    },
    statusDelete: {
        type: Boolean,  // Estado de eliminación lógica
        default: false
    },
    eventType: {
        type: String,  // Tipo de evento (ejemplo: "Conferencia", "Taller")
        required: true
    },
    foundationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Foundation',  // Referencia a la fundación
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Event', EventSchema);