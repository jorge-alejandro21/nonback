const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
    amount: {
        type: Number,  // Cantidad donada
        required: true
    },
    type: {
        type: String,  // Tipo de donación (por ejemplo, "Monetaria", "En especie")
        required: true
    },
    status: {
        type: String,  // Estado de la donación (ejemplo: "Completado", "Pendiente")
        default: 'Pendiente'
    },
    date: {
        type: Date,  // Fecha de la donación
        default: Date.now
    },
    statusDelete: {
        type: Boolean,  // Estado de eliminación lógica
        default: false
    },
    donorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Donor',  // Referencia al donante
        required: true
    },
    foundationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Foundation',  // Referencia a la fundación
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Donation', DonationSchema);