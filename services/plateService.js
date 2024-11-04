const AddedPlate = require('../models/addedPlateModel');
const countryCityData = require('../data/ulke_sehir.json'); // JSON'dan şehir/ülke verilerini alıyoruz

// Tüm plakaları getir
const getAllPlates = async () => {
  return await AddedPlate.find();
};

// Belirli bir plakayı getir
const getPlateById = async id => {
  return await AddedPlate.findById(id);
};

// Yeni plaka ekle
const addPlate = async plateData => {
  try {
    const [countryCode, cityCode] = plateData.licensePlate.split(' '); // Plakadan ülke ve şehir kodunu ayır

    const country = countryCityData.find(
      country => country.countryCode === countryCode
    ); // Ülke verisini bul

    if (!country) {
      throw new Error('Geçersiz ülke kodu');
    }

    const city = country.city.find(city => city.cityCode === cityCode); // Şehir verisini bul

    if (!city) {
      throw new Error('Geçersiz şehir kodu');
    }

    // Doğru verilerle yeni plaka kaydı oluştur
    const newPlate = new AddedPlate({
      ...plateData,
      countryCode: countryCode,
      countryName: country.countryName,
      cityCode: city.cityCode,
      cityName: city.cityName,
    });

    const savedPlate = await newPlate.save();
    return savedPlate;
  } catch (error) {
    console.error('Plaka eklenirken hata oluştu:', error.message);
    throw error; // Hata fırlat
  }
};

// Plaka güncelle
const updatePlate = async (id, plateData) => {
  try {
    const updatedPlate = await AddedPlate.findByIdAndUpdate(id, plateData, {
      new: true,
    });
    if (!updatedPlate) {
      throw new Error('Plaka bulunamadı');
    }
    return updatedPlate;
  } catch (error) {
    console.error('Plaka güncellenirken hata oluştu:', error.message);
    throw error;
  }
};

// Plaka sil
const deletePlate = async id => {
  return await AddedPlate.findByIdAndDelete(id);
};

module.exports = {
  getAllPlates,
  getPlateById,
  addPlate,
  updatePlate,
  deletePlate,
};
