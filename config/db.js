require('dotenv').config(); // .env dosyasını yükle
const mongoose = require('mongoose');

// MongoDB bağlantısını oluştur
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {});
    console.log('MongoDB bağlantısı başarılı!');
  } catch (err) {
    console.error('MongoDB bağlantısı başarısız:', err);
    process.exit(1); // Hata durumunda uygulamayı kapat
  }
};

module.exports = connectDB; // connectDB fonksiyonunu dışa aktar
