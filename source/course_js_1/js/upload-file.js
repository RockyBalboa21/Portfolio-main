import { showAlert } from './util.js';
import { hideModal } from './form.js';

const uploadFileInput = document.getElementById('upload-file');
const imagePreview = document.getElementById('img-preview');
const effectsPreviews = document.querySelectorAll('.effects__preview');

uploadFileInput.addEventListener('change', (event) => {
  const selectedFile = event.target.files[0];
  if (selectedFile) {
    const imageUrl = URL.createObjectURL(selectedFile);
    imagePreview.src = imageUrl;
    effectsPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url('${imagePreview.src}')`;
    });

    // Проверка на тип файла
    const FILE_TYPES = ['jpg', 'jpeg', 'png'];
    const isValidType = (file) => {
      const fileName = file.name.toLowerCase();
      return FILE_TYPES.some((it) => fileName.endsWith(it));
    };
    // действия при ошибке типа загружаемого файла
    if (!isValidType(selectedFile)) {
      hideModal();
      showAlert('Загрузите изображения в формате JPG, JPEG или PNG.');
    }
  }
});


// Предварительный просмотр изображения
// 1.1.Загрузка нового изображения:

// выбор файла с изображением для загрузки;
// предпросмотр выбранного изображения;
// предпросмотр эффектов к выбранному изображению
