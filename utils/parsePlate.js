// Plakadan ülke ve şehir kodlarını ayıran yardımcı fonksiyon
exports.parsePlate = (licensePlate) => {
    // Plakanın ilk iki karakteri ülke kodu, sonraki iki karakter şehir kodu
    const countryCode = licensePlate.substring(0, 2).toUpperCase();  // Ülke kodunu büyük harfe çeviriyoruz
    const cityCode = licensePlate.substring(2, 4);  // Şehir kodunu ayırıyoruz

    return { countryCode, cityCode };
};
