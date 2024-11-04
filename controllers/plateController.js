const PlateService = require('../services/plateService');

exports.addPlate = async (req, res) => {
  try {
    const { licensePlate, firstName, lastName } = req.body;
    const result = await PlateService.addPlate({
      licensePlate,
      firstName,
      lastName,
    });
    return res.status(201).json(result);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.updatePlate = async (req, res) => {
  try {
    const result = await PlateService.updatePlate(req.params.id, req.body);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.deletePlate = async (req, res) => {
  try {
    const result = await PlateService.deletePlate(req.params.id);
    return res.status(204).json(result);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.getAllPlates = async (req, res) => {
  try {
    const result = await PlateService.getAllPlates();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.getPlateById = async (req, res) => {
  try {
    const result = await PlateService.getPlateById(req.params.id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
