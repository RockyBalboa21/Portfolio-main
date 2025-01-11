// При клике на бургер отображается навигация главного меню, а при нажатии на крестик она скрывается
const navElement = document.querySelector('.page-header__nav');
const buttonElement = document.querySelector('.page-header__toggler');

navElement.classList.add('page-header__nav--closed');

buttonElement.addEventListener('click', () => {
  if (navElement.classList.contains('page-header__nav--closed')) {
    navElement.classList.add('page-header__nav--opened');
    navElement.classList.remove('page-header__nav--closed');
  } else {
    navElement.classList.add('page-header__nav--closed');
    navElement.classList.remove('page-header__nav--opened');
  }
});

// Имеется переключатель с классом switch с двумя состояниями - было (switch--before) и стало (switch--after). По умолчанию переключатель с классом switch-toggler находится в положении - было (класс switch--before) и этому положению переключателя соответствует одно изображение с классами example__image example__image--before example__image--active, это изображение видно по умолчанию.  А изображение соответствующее положению - стало (класс switch--after) имеет классы example__image example__image--after и по умолчанию не отображается на странице. Нужно написать код, чтобы при клике на переключатель с классом switch-toggler изменять положение с - было на - стало, и при последующем клике изменить положение с - стало на - было. При этом также должны изменяться изображения соответствующие состоянию переключателя.

// Находим переключатель и изображения
const switchToggler = document.querySelector('.switch');
const beforeImage = document.querySelector('.example__image--before');
const afterImage = document.querySelector('.example__image--after');

// Отслеживаем клик на переключателе
switchToggler.addEventListener('click', function() {
  // Проверяем текущее положение переключателя
  if (switchToggler.classList.contains('switch--before')) {
    // Изменяем положение на "стало"
    switchToggler.classList.remove('switch--before');
    switchToggler.classList.add('switch--after');
    // Показываем изображение для положения "стало"
    afterImage.style.display = 'block';
    beforeImage.style.display = 'none';
  } else {
    // Изменяем положение на "было"
    switchToggler.classList.remove('switch--after');
    switchToggler.classList.add('switch--before');
    // Показываем изображение для положения "было"
    beforeImage.style.display = 'block';
    afterImage.style.display = 'none';
  }
});
