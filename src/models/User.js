const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    item: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, 'El email debe tener un formato válido']
    },
    roleid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',  // Referencia al rol del usuario
        required: true
    },
    verificacion: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        default: 'activo',
    },
    visible: {
        type: Number,
        default: 1,
    },
}, { timestamps: true });

UserSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);