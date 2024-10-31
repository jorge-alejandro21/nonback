require('dotenv').config(); // Cargar variables de entorno desde .env
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./src/config/db'); // Importar la función de conexión

const userRoutes = require('./src/routes/userRoutes');
const donationRoutes = require('./src/routes/donationRoutes');
const foundationRoutes = require('./src/routes/foundationRoutes');
const roleRoutes = require('./src/routes/roleRoutes');
const transportRoutes = require('./src/routes/transportRoutes');
const volunteerRoutes = require('./src/routes/volunteerRoutes');
const volunteerEventRoutes = require('./src/routes/volunteerEventRoutes');
const needRoutes = require('./src/routes/needRoutes');
const eventRoutes = require('./src/routes/eventRoutes');
const authRoutes = require('./src/core/auth/authRoutes');

// Crear la aplicación Express
const app = express();
const PORT = process.env.PORT || 3000;

// Conectar a MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/foundations', foundationRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/transports', transportRoutes);
app.use('/api/volunteers', volunteerRoutes);
app.use('/api/volunteer-events', volunteerEventRoutes);
app.use('/api/needs', needRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/auth', authRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('API está en funcionamiento.');
});

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Algo salió mal en el servidor!',
        error: process.env.NODE_ENV === 'production' ? {} : err.stack
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});