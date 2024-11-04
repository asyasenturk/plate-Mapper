const express = require('express');
const connectDB = require('./config/db'); // db.js dosyasını içe aktar
const plateRoutes = require('./routes/plateRoutes');

const app = express();
app.use(express.json());

// MongoDB bağlantısını kuruyoruz
connectDB(); // MongoDB'ye bağlan

// Tüm plaka rotalarını yükle
app.use('/api', plateRoutes);
app.use(express.static('public')); // HTML dosyanız 'public' adlı bir klasörde olmalı

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
