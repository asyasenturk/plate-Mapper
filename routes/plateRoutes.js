const express = require('express');
const router = express.Router();
const PlateService = require('../services/plateService');

// GET: Tüm plakaları getir
router.get('/plates', async (req, res) => {
  try {
    const plates = await PlateService.getAllPlates();
    res.json(plates);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET: Belirli bir plakayı ID ile getir
router.get('/plates/:id', async (req, res) => {
  try {
    const plate = await PlateService.getPlateById(req.params.id);
    res.json(plate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// POST: Yeni plaka ekle
router.post('/plates', async (req, res) => {
  try {
    const newPlate = await PlateService.addPlate(req.body);
    res.status(201).json(newPlate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT: Bir plakayı güncelle
router.put('/plates/:id', async (req, res) => {
  try {
    const updatedPlate = await PlateService.updatePlate(
      req.params.id,
      req.body
    );
    res.json(updatedPlate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE: Bir plakayı sil
router.delete('/plates/:id', async (req, res) => {
  try {
    const deletedPlate = await PlateService.deletePlate(req.params.id);
    res.json(deletedPlate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
