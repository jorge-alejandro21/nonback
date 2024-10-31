const User = require('../models/User');

// Obtener todos los usuarios
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().populate('roleid');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo usuario
const createUser = async (req, res) => {
    try {
        const { item, password, roleId, firstName, lastName, phoneNumber } = req.body;
        const user = new User({ item, password, roleId, firstName, lastName, phoneNumber });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener un usuario por ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('roleId');
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un usuario
const updateUser = async (req, res) => {
    try {
        const { item, password, roleId, firstName, lastName, phoneNumber } = req.body;
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { item, password, roleId, firstName, lastName, phoneNumber },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un usuario
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser
};