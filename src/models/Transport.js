const mongoose = require('mongoose');

const TransportSchema = new mongoose.Schema({
    type: {
        type: String,  // Tipo de transporte
        required: true
    },
    shippingDate: {
        type: Date,  // Fecha de envío
        required: false
    },
    status: {
        type: String,  // Estado del transporte (ejemplo: "pendiente", "en camino", "entregado")
        required: true
    },
    cost: {
        type: Number,  // Costo del transporte
        required: false
    },
    statusDelete: {
        type: Boolean,
        default: false
    },
    donationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Donation',  // Referencia a la colección de donaciones
        required: true
    }
}, { timestamps: true });  // Agrega campos 'createdAt' y 'updatedAt'

module.exports = mongoose.model('Transport', TransportSchema);
