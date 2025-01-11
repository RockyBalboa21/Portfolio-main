const smallerButton = document.querySelector('.scale__control--smaller');
const biggerButton = document.querySelector('.scale__control--bigger');
const scaleInput = document.querySelector('.scale__control--value');
const image = document.querySelector('.img-upload__preview img');

const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const scaleImage = (value = DEFAULT_SCALE) => {
  image.style.transform = `scale(${value / 100})`;
  scaleInput.value = `${value}%`;
};

const onSmallerButtonClick = () => {
  const currentValue = parseInt(scaleInput.value, 10);
  let newValue = currentValue - SCALE_STEP;
  if (newValue < MIN_SCALE) {
    newValue = MIN_SCALE;
  }
  scaleImage(newValue);
};

const onBiggerButtonClick = () => {
  const currentValue = parseInt(scaleInput.value, 10);
  let newValue = currentValue + SCALE_STEP;
  if (newValue > MAX_SCALE) {
    newValue = MAX_SCALE;
  }
  scaleImage(newValue);
};

const resetScale = () => {
  scaleImage();
};

smallerButton.addEventListener('click', onSmallerButtonClick);
biggerButton.addEventListener('click', onBiggerButtonClick);

export { resetScale };

// 2.1.Масштаб:
// 1.1. - изменение масштаба изображения;
// При нажатии на кнопки.scale__control--smaller и.scale__control--bigger должно изменяться значение поля.scale__control--value;
// Значение должно изменяться с шагом в 25. Например, если значение поля установлено в 50 %, после нажатия на «+», значение должно стать равным 75 %.Максимальное значение — 100 %, минимальное — 25 %.Значение по умолчанию — 100 %;
// При изменении значения поля.scale__control--value изображению внутри.img - upload__preview должен добавляться соответствующий стиль CSS, который с помощью трансформации scale задаёт масштаб.Например, если в поле стоит значение 75 %, то в стиле изображения должно быть написано transform: scale(0.75).
