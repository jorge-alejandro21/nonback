// src/core/auth/authController.js
const User = require('../../models/User'); // Asegúrate de que esta ruta sea correcta
const jwt = require('jsonwebtoken');

// Función para iniciar sesión
const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Faltan credenciales.' });
    }

    try {
        // Busca el usuario por correo
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Usuario no encontrado.' });
        }

        // Verifica la contraseña (suponiendo que usas bcrypt para hashear las contraseñas)
        const isMatch = await user.comparePassword(password); // Asegúrate de tener este método en tu modelo User
        if (!isMatch) {
            return res.status(401).json({ message: 'Contraseña incorrecta.' });
        }

        // Genera un token JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '5h' });

        // Envía el token y el ID del usuario como respuesta
        res.status(200).json({ token, userId: user._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor.' });
    }
};

module.exports = { login };