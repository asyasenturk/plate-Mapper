let editingPlateId = null; // Düzenlenen plakanın ID'sini saklayacak değişken

// Verileri sunucudan almak için fonksiyon
async function fetchPlates() {
  try {
    const response = await fetch('/api/plates');
    if (!response.ok) {
      throw new Error('Ağ yanıtı düzgün değil');
    }
    const plates = await response.json();
    populateTable(plates);
  } catch (error) {
    console.error('Plakalar alınırken hata:', error);
  }
}

// Alınan verilerle tabloyu doldurma fonksiyonu
function populateTable(plates) {
  const tableBody = document.querySelector('#platesTable tbody');
  tableBody.innerHTML = ''; // Mevcut içeriği temizle

  plates.forEach(plate => {
    const row = document.createElement('tr');
    row.setAttribute('data-id', plate._id); // ID'yi satırın data attribute'u olarak ekleyin
    row.innerHTML = `
                    <td>${plate.licensePlate}</td>
                    <td>${plate.firstName}</td>
                    <td>${plate.lastName}</td>
                    <td>${plate.countryCode}</td>
                    <td>${plate.countryName}</td>
                    <td>${plate.cityCode}</td>  <!-- Şehir Kodu -->
                    <td>${plate.cityName}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editPlate('${plate._id}')">Düzenle</button>
                        <button class="btn btn-danger btn-sm" onclick="deletePlate('${plate._id}')">Sil</button>
                    </td>
                `;
    tableBody.appendChild(row);
  });
}

// Yeni plaka eklemek veya mevcut plakayı güncellemek için formun gönderilmesini dinle
document
  .getElementById('plateForm')
  .addEventListener('submit', async function (event) {
    event.preventDefault(); // Sayfanın yeniden yüklenmesini engelle

    // Kullanıcıdan alınan bilgileri al ve plaka formatına dönüştür
    const fullPlate = document
      .getElementById('fullPlate')
      .value.trim()
      .toUpperCase(); // Tek inputtan veri alıyoruz
    const plateParts = fullPlate.split(' '); // Plakayı parçala: ["TR", "34", "ABC", "123"]

    const countryCode = plateParts[0];
    const cityCode = plateParts[1];
    const plateSeries = plateParts.slice(2).join(' '); // ABC 123 kısmını birleştir

    const plateData = {
      licensePlate: fullPlate, // Plaka artık formatlanmış şekilde tek bir string
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      countryCode: countryCode, // Ülke kodu
      cityCode: cityCode, // Şehir kodunu da ekleyin
    };

    if (editingPlateId) {
      // Düzenleme modundaysa, PUT isteği yap
      try {
        const response = await fetch(`/api/plates/${editingPlateId}`);
        if (!response.ok) {
          throw new Error('Plaka alınırken hata oluştu');
        }
        const existingPlate = await response.json();

        // Eski plaka verilerini güncelle
        const updatedPlate = await fetch(`/api/plates/${editingPlateId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...existingPlate,
            countryCode: plateData.countryCode,
            cityCode: plateData.cityCode,
            licensePlate: plateData.licensePlate,
            firstName: plateData.firstName,
            lastName: plateData.lastName,
          }),
        });

        if (!updatedPlate.ok) {
          throw new Error('Plaka güncellenirken bir hata oluştu');
        }

        editingPlateId = null;
        document.getElementById('plateForm').reset();
        document.getElementById('cancelEdit').style.display = 'none';
        document.getElementById('submitButton').innerText = 'Ekle';
        document.getElementById('submitButton').classList.remove('btn-warning');
        fetchPlates();
      } catch (error) {
        console.error('Plaka güncellenirken hata:', error);
      }
    } else {
      // Yeni plaka ekleme işlemi
      try {
        const response = await fetch('/api/plates', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(plateData),
        });

        if (!response.ok) {
          throw new Error('Plaka eklenirken bir hata oluştu');
        }

        document.getElementById('plateForm').reset();
        fetchPlates();
      } catch (error) {
        console.error('Plaka eklenirken hata:', error);
      }
    }
  });

// Plaka silme işlemi
async function deletePlate(id) {
  if (confirm('Bu plakayı silmek istediğinizden emin misiniz?')) {
    try {
      const response = await fetch(`/api/plates/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Plaka silinirken bir hata oluştu');
      }

      fetchPlates();
    } catch (error) {
      console.error('Plaka silinirken hata:', error);
    }
  }
}

// Düzenleme moduna geçme işlemi
async function editPlate(id) {
  try {
    const response = await fetch(`/api/plates/${id}`);
    if (!response.ok) {
      throw new Error('Plaka alınırken hata oluştu');
    }
    const plate = await response.json();

    // Verileri ilgili alanlara doldur
    document.getElementById('fullPlate').value = plate.licensePlate;
    document.getElementById('firstName').value = plate.firstName;
    document.getElementById('lastName').value = plate.lastName;

    editingPlateId = id; // Düzenlenen plakayı takip et
    document.getElementById('submitButton').innerText = 'Güncelle';
    document.getElementById('submitButton').classList.add('btn-warning');
    document.getElementById('cancelEdit').style.display = 'inline';
  } catch (error) {
    console.error('Plaka alınırken hata:', error);
  }
}

// Düzenlemeyi iptal etme işlemi
document.getElementById('cancelEdit').addEventListener('click', function () {
  editingPlateId = null;
  document.getElementById('plateForm').reset();
  document.getElementById('cancelEdit').style.display = 'none';
  document.getElementById('submitButton').innerText = 'Ekle';
  document.getElementById('submitButton').classList.remove('btn-warning');
});

// Sayfa yüklendiğinde plakaları getir
window.onload = fetchPlates;
