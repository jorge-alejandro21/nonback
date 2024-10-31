const mongoose = require('mongoose');

const NeedSchema = new mongoose.Schema({
    description: {
        type: String,  // Descripción de la necesidad
        required: true
    },
    priority: {
        type: String,  // Prioridad (ejemplo: "alta", "media", "baja")
        required: true
    },
    requestDate: {
        type: Date,  // Fecha en que se solicitó
        default: Date.now  // Valor por defecto: fecha actual
    },
    status: {
        type: String,  // Estado de la necesidad (ejemplo: "pendiente", "completado")
        required: true
    },
    statusDelete: {
        type: Boolean,
        default: false
    },
    foundationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Foundation',  // Referencia a la colección de fundaciones
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Need', NeedSchema);