const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');  // Importa el modelo de usuario

const JWT_SECRET = 'your_jwt_secret_key';  // Cambia esto a una clave secreta segura
const TOKEN_EXPIRATION = '1h';  // Configura el tiempo de expiración del token

// Registrar nuevo usuario
exports.register = async (req, res) => {
    const { username, email, password, firstName, lastName, phoneNumber, roleId } = req.body;

    try {
        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear un nuevo usuario
        const user = new User({
            username,
            email,
            password: hashedPassword,
            firstName,
            lastName,
            phoneNumber,
            roleId
        });

        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Iniciar sesión
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar al usuario por el email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Verificar la contraseña ingresada contra la contraseña encriptada
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Crear el token JWT
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            JWT_SECRET,
            { expiresIn: TOKEN_EXPIRATION }
        );

        // Responder con el token
        res.json({ token });
    } catch (error) {
        console.error('Error en el login:', error); // Imprimir el error en la consola para depuración
        res.status(500).json({ message: 'Server error', error });
    }
};

// Obtener perfil de usuario
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Renovar el token
exports.renewToken = (req, res) => {
    const newToken = jwt.sign({ userId: req.user.userId, email: req.user.email }, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });
    res.json({ token: newToken });
};

// Verificar tiempo restante del token
exports.tokenTime = (req, res) => {
    const tokenExpiration = jwt.decode(req.token).exp;
    const currentTime = Math.floor(Date.now() / 1000);
    const remainingTime = tokenExpiration - currentTime;

    res.json({ remainingTime });
};