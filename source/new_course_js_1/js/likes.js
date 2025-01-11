const likesNumber = document.querySelector('.likes-count');

likesNumber.onclick = function () {
  if (likesNumber.classList.contains('added')) {
    likesNumber.textContent--;
  } else {
    likesNumber.textContent++;
  }
  likesNumber.classList.toggle('added');
};

// Добавляет лайк при просмотре фото в модальном окне, при этом не реализовано дабавление лайка на миниатюре при клике в модальном окне(отсутствует привязка)
