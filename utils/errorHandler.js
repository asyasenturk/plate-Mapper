// Hata yönetimi fonksiyonu
exports.handleError = (error, res) => {
  res.status(400).json({
    message: error.message || 'Bir hata oluştu',
  });
};
