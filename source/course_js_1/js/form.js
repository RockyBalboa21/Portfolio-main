import { resetScale } from './scale.js';
import { resetEffects } from './effects.js';

const form = document.querySelector('.img-upload__form');
const overlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const cancelButton = document.querySelector('#upload-cancel');
const fileField = document.querySelector('#upload-file');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const commentLabel = document.querySelector('.comment-label');
const charCounter = document.querySelector('.char-counter');
const submitButton = document.querySelector('.img-upload__submit');
const originalCommentLabelText = 'Напишите тут Ваш комментарий';

const MAX_HASHTAG_COUNT = 5;
const MIN_HASHTAG_LENGTH = 2;
const MAX_HASHTAG_LENGTH = 20;
const UNVALID_SYMBOLS = /[^a-zA-Z0-9а-яА-ЯёЁ]/g;
const MAX_LENGTH_COMMENT = 140;

const pristine = new Pristine(form, {
  classTo: 'img-upload__element',
  errorTextParent: 'img-upload__element',
  errorTextClass: 'img-upload__error',
});

// Открытие и закрытие формы
const showModal = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeyDown);
};

const hideModal = () => {
  form.reset();
  resetScale();
  resetEffects();
  charCounter.textContent = 0;
  commentLabel.textContent = originalCommentLabelText;
  form.classList.remove('warning');
  form.classList.remove('good');
  submitButton.disabled = false;
  pristine.reset();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeyDown);
};

// Действия при нажатии на Escape
// если фокус находится в поле ввода хэш - тега, нажатие на Esc не должно приводить к закрытию формы редактирования изображения.
// если фокус находится в поле ввода комментария, нажатие на Esc не должно приводить к закрытию формы редактирования изображения.
const isTextFieldFocused = () =>
  document.activeElement === hashtagField ||
  document.activeElement === commentField;

function onEscKeyDown(evt) {
  if (evt.key === 'Escape' && isTextFieldFocused()) {
    evt.preventDefault();
    showModal();
  } else if (evt.key === 'Escape'){
    hideModal();
  }
}

const onCancelButtonClick = () => {
  hideModal();
};

const onFileInputChange = () => {
  showModal();
};

// Добавление хэштега и проверка на валидность
// 1.1.Загрузка нового изображения:
// добавление хэш-тегов.
// 2.3. Хэш-теги:
// хэш - тег начинается с символа #(решётка);
// строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы(#, @, $ и т.п.), символы пунктуации(тире, дефис, запятая и т.п.), эмодзи и т.д.;
// хеш - тег не может состоять только из одной решётки;
// максимальная длина одного хэш - тега 20 символов, включая решётку;
// хэш - теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом;
// хэш - теги разделяются пробелами;
// один и тот же хэш - тег не может быть использован дважды;
// нельзя указать больше пяти хэш - тегов;
// хэш - теги необязательны;
// если фокус находится в поле ввода хэш - тега, нажатие на Esc не должно приводить к закрытию формы редактирования изображения.

const startsWithHash = (string) => string[0] === '#';

const hasValidLength = (string) =>
  string.length >= MIN_HASHTAG_LENGTH && string.length <= MAX_HASHTAG_LENGTH;

const hasValidSymbols = (string) => !UNVALID_SYMBOLS.test(string.slice(1));

const isValidTag = (tag) =>
  startsWithHash(tag) && hasValidLength(tag) && hasValidSymbols(tag);

const hasValidCount = (tags) => tags.length <= MAX_HASHTAG_COUNT;

const hasUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateTags = (value) => {
  const tags = value
    .trim()
    .split(' ')
    .filter((tag) => tag.trim().length);
  return hasValidCount(tags) && hasUniqueTags(tags) && tags.every(isValidTag);
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

pristine.addValidator(
  hashtagField,
  validateTags,
  'Неправильно заполнены хэштеги'
);
// 1.1. Загрузка нового изображения:
// добавление текстового комментария
// 2.4.Комментарий:
// комментарий не обязателен;
// длина комментария не может составлять больше 140 символов;
// если фокус находится в поле ввода комментария, нажатие на Esc не должно приводить к закрытию формы редактирования изображения.

//Функция для проверки максимальной длины коментария
const checkCommentLength = (value) => value.trim().length <= MAX_LENGTH_COMMENT;

pristine.addValidator(
  commentField,
  checkCommentLength,
  `Длина комментария превышает ${  MAX_LENGTH_COMMENT  } символов.`
);

commentField.oninput = function () {
  charCounter.textContent = commentField.value.length;

  if (commentField.value.length === MAX_LENGTH_COMMENT) {
    commentLabel.textContent = 'Можно отправить!';
    form.classList.remove('warning');
    form.classList.add('good');
    submitButton.disabled = false;
  } else if (commentField.value.length > MAX_LENGTH_COMMENT) {
    commentLabel.textContent = 'Измените свой комментарий!';
    form.classList.add('warning');
    form.classList.remove('good');
    submitButton.disabled = true;
  } else {
    commentLabel.textContent = 'Напишите тут Ваш комментарий';
    form.classList.remove('warning');
    form.classList.remove('good');
    submitButton.disabled = false;
  }
};

const setOnFormSubmit = (cb) => {
  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitButton();
      await cb(new FormData(form));
      unblockSubmitButton();
    }
  });
};

fileField.addEventListener('change', onFileInputChange);
cancelButton.addEventListener('click', onCancelButtonClick);

export { setOnFormSubmit, hideModal };
