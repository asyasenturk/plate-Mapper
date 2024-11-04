const mongoose = require('mongoose');

const addedPlateSchema = new mongoose.Schema({
    licensePlate: String,
    firstName: String,
    lastName: String,
    countryCode: String,
    countryName: String,
    cityCode: String,
    cityName: String
});

module.exports = mongoose.model('AddedPlate', addedPlateSchema);
