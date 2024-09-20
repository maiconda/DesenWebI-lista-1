let dataId = 1;
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const captureBtn = document.getElementById('captureBtn');
const uploadBtn = document.getElementById('uploadBtn');
const fileInput = document.getElementById('fileInput');
const photoPreview = document.getElementById('photoPreview');
const locationBtn = document.getElementById('locationBtn');
const mapDiv = document.getElementById('map');
const latitudeInput = document.getElementById('latitude');
const longitudeInput = document.getElementById('longitude');
const setManualLocationBtn = document.getElementById('setManualLocationBtn');
const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const saveBtn = document.getElementById('saveBtn');
const dataTable = document.getElementById('dataTable').querySelector('tbody');

const editModal = document.getElementById('editModal');
const closeModal = editModal.querySelector('.close');
const editTitleInput = document.getElementById('editTitle');
const editDescriptionInput = document.getElementById('editDescription');
const updateBtn = document.getElementById('updateBtn');

const imageModal = document.getElementById('imageModal');
const closeImageModal = imageModal.querySelector('.close');
const modalImage = document.getElementById('modalImage');

let photoDataUrl = '';
let currentLat = '';
let currentLon = '';
let editingId = null;

navigator.mediaDevices.getUserMedia({ video: true })
  .then((stream) => {
    video.srcObject = stream;
  })
  .catch(() => {
    alert('Câmera indisponível. Use upload.');
    video.style.display = 'none';
  });

captureBtn.addEventListener('click', () => {
  if (video.style.display !== 'none') {
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    photoDataUrl = canvas.toDataURL('image/png');
    photoPreview.src = photoDataUrl;
    photoPreview.style.display = 'block';
  } else {
    alert('Câmera não disponível.');
  }
});

uploadBtn.addEventListener('click', () => {
  fileInput.click();
});

fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      photoDataUrl = e.target.result;
      photoPreview.src = photoDataUrl;
      photoPreview.style.display = 'block';
    };
    reader.readAsDataURL(file);
  }
});

locationBtn.addEventListener('click', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, () => {
      alert('Localização automática indisponível.');
    });
  } else {
    alert('Geolocalização não suportada.');
  }
});

function showPosition(position) {
  currentLat = position.coords.latitude;
  currentLon = position.coords.longitude;
  displayMap(currentLat, currentLon);
}

setManualLocationBtn.addEventListener('click', () => {
  const lat = parseFloat(latitudeInput.value);
  const lon = parseFloat(longitudeInput.value);

  if (!isNaN(lat) && !isNaN(lon)) {
    currentLat = lat;
    currentLon = lon;
    displayMap(lat, lon);
  } else {
    alert('Por favor, insira valores válidos para latitude e longitude.');
  }
});

function displayMap(lat, lon) {
  const mapUrl = `https://maps.google.com/maps?q=${lat},${lon}&output=embed`;
  mapDiv.innerHTML = `<iframe width="100%" height="300" src="${mapUrl}" frameborder="0" style="border:0" allowfullscreen></iframe>`;
}

saveBtn.addEventListener('click', () => {
  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();

  if (!title || !photoDataUrl || !currentLat || !currentLon) {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  const photoData = {
    id: dataId++,
    title,
    description,
    photo: photoDataUrl,
    latitude: currentLat,
    longitude: currentLon,
  };

  addRowToTable(photoData);
  saveToLocalStorage(photoData);
  clearFields();
});

function addRowToTable(data) {
  const newRow = document.createElement('tr');
  newRow.innerHTML = `
    <td>${data.id}</td>
    <td>${data.title}</td>
    <td>${data.description}</td>
    <td><img src="${data.photo}" alt="Foto" style="width: 50px; cursor: pointer;"></td>
    <td>${data.latitude}</td>
    <td>${data.longitude}</td>
    <td>
      <button class="editBtn">Editar</button>
      <button class="deleteBtn">Excluir</button>
      <button class="mapBtn">Ver Mapa</button>
    </td>
  `;
  dataTable.appendChild(newRow);

  newRow.querySelector('img').addEventListener('click', () => {
    modalImage.src = data.photo;
    imageModal.style.display = 'block';
  });

  newRow.querySelector('.editBtn').addEventListener('click', () => {
    openEditModal(data);
  });

  newRow.querySelector('.deleteBtn').addEventListener('click', () => {
    newRow.remove();
    removeFromLocalStorage(data.id);
  });

  newRow.querySelector('.mapBtn').addEventListener('click', () => {
    displayMap(data.latitude, data.longitude);
  });
}

function saveToLocalStorage(data) {
  const storedData = JSON.parse(localStorage.getItem('photos')) || [];
  storedData.push(data);
  localStorage.setItem('photos', JSON.stringify(storedData));
}

function loadFromLocalStorage() {
  const storedData = JSON.parse(localStorage.getItem('photos')) || [];
  storedData.forEach(data => {
    dataId = Math.max(dataId, data.id + 1);
    addRowToTable(data);
  });
}

function removeFromLocalStorage(id) {
  const storedData = JSON.parse(localStorage.getItem('photos')) || [];
  const updatedData = storedData.filter(data => data.id !== id);
  localStorage.setItem('photos', JSON.stringify(updatedData));
}

function openEditModal(data) {
  editTitleInput.value = data.title;
  editDescriptionInput.value = data.description;
  editingId = data.id;
  editModal.style.display = 'block';
}

updateBtn.addEventListener('click', () => {
  const updatedTitle = editTitleInput.value.trim();
  const updatedDescription = editDescriptionInput.value.trim();

  if (!updatedTitle) {
    alert('O título é obrigatório.');
    return;
  }

  const updatedData = {
    id: editingId,
    title: updatedTitle,
    description: updatedDescription,
    photo: photoDataUrl
  };

  updateRowInTable(updatedData);
  updateLocalStorage(updatedData);
  closeModal();
});

function updateRowInTable(data) {
  const rows = dataTable.querySelectorAll('tr');
  rows.forEach(row => {
    const rowDataId = row.cells[0].innerText;
    if (rowDataId == data.id) {
      row.cells[1].innerText = data.title;
      row.cells[2].innerText = data.description;
    }
  });
}

function updateLocalStorage(data) {
  const storedData = JSON.parse(localStorage.getItem('photos')) || [];
  const updatedData = storedData.map(item => item.id === data.id ? data : item);
  localStorage.setItem('photos', JSON.stringify(updatedData));
}

closeModal.addEventListener('click', () => {
  editModal.style.display = 'none';
});

closeImageModal.addEventListener('click', () => {
  imageModal.style.display = 'none';
});

function clearFields() {
  titleInput.value = '';
  descriptionInput.value = '';
  photoPreview.src = '';
  photoPreview.style.display = 'none';
  photoDataUrl = '';
  currentLat = '';
  currentLon = '';
  latitudeInput.value = '';
  longitudeInput.value = '';
  editingId = null;
}

window.onload = loadFromLocalStorage;
