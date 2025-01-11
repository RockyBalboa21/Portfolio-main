// Блок для отражения ошибок и время показа сообщения об ошибке
const ALERT_SHOW_TIME = 5000;

const showAlert = (message) => {
  const alert = document.createElement('div');
  alert.style.position = 'absolute';
  alert.style.zIndex = '100';
  alert.style.left = '0';
  alert.style.top = '0';
  alert.style.right = '0';
  alert.style.padding = '10px 3px';
  alert.style.fontSize = '30px';
  alert.style.textAlign = 'center';
  alert.style.backgroundColor = 'red';
  alert.textContent = message;
  document.body.append(alert);

  setTimeout(() => {
    alert.remove();
  }, ALERT_SHOW_TIME);
};

//Функция, возвращающая случайное целое число из переданного диапазона включительно, параметры только положительные числа и 0.
function getRandomInteger(min, max = 1) {
  // Проверка на ввод аргументов, чтобы функция не вызывалась без ввода аргументов
  if (min === undefined) {
    throw new Error('Первый параметр должен быть число.');
  }

  // Проверка на то, что min и max являются положительными числами, включая ноль
  if (min < 0 || max < 0) {
    return 'Ошибка: диапазон может быть только положительный, включая ноль.';
  }

  // Проверка на то, что min и max являются числами
  if (typeof min !== 'number' || typeof max !== 'number') {
    return 'Ошибка: передали строку, но аргументы должны быть только числами.';
  }

  // Math.random() генерирует случайное число от 0 (включительно) до 1 (не включая 1)
  // Метод Math.ceil() - округление вверх. Округляет аргумент до ближайшего большего целого.
  // Math.floor() округляет число до ближайшего меньшего целого
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

getRandomInteger(0, 30);

// Функция, возвращающая случайное целое число в качестве праметров может принимать строку(длину массива).

const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

getRandomPositiveInteger(0, 25);

// Получаем случайный элемент из массива
const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];


//Функция для проверки максимальной длины строки
function checkStringLength(string, maxLength) {
  if (string.length <= maxLength) {
    return true;
  } else {
    return false;
  }
}

checkStringLength('', 120);


// Функция для устранения дребезга
const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {
  getRandomInteger,
  getRandomPositiveInteger,
  checkStringLength,
  getRandomArrayElement,
  showAlert,
  debounce,
};
