const mongoose = require('mongoose');

const FoundationSchema = new mongoose.Schema({
    name: {
        type: String,  // Nombre de la fundación
        required: true
    },
    address: {
        type: String,  // Dirección de la fundación
    },
    email: {
        type: String,  // Correo electrónico de la fundación
        required: true,
        unique: true
    },
    mission: {
        type: String,  // Misión de la fundación
    },
    vision: {
        type: String,  // Visión de la fundación
    },
    bankAccount: {
        type: String,  // Número de cuenta bancaria
    },
    statusDelete: {
        type: Boolean,  // Estado de eliminación lógica
        default: false
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Referencia al administrador de la fundación
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Foundation', FoundationSchema);
