import { debounce } from './util.js';

const PICTURES_COUNT = 10;
const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
  POPULAR: 'filter-popular',
};

const filtersElement = document.querySelector('.img-filters');

let currentFilter = '';
let pictures = [];

const randomSort = () => Math.random() - 0.5;

const discussedSort = (pictureA, pictureB) =>
  pictureB.comments.length - pictureA.comments.length;

const popularSort = (pictureA, pictureB) =>
  pictureB.likes - pictureA.likes;

const filterPictures = () => {
  switch (currentFilter) {
    case Filter.RANDOM:
      return [...pictures].sort(randomSort).slice(0, PICTURES_COUNT);
    case Filter.DISCUSSED:
      return [...pictures].sort(discussedSort);
    case Filter.POPULAR:
      return [...pictures].sort(popularSort);
    default:
      return [...pictures];
  }
};

const turnFilterOn = (loadedPictures) => {
  filtersElement.classList.remove('img-filters--inactive');
  pictures = [...loadedPictures];
  currentFilter = Filter.DEFAULT;
};

const setOnFilterClick = (cb) => {
  const debouncedCallback = debounce(cb);

  filtersElement.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }

    const clickedButton = evt.target;
    if (clickedButton.id === currentFilter) {
      return;
    }

    filtersElement
      .querySelector('.img-filters__button--active')
      .classList.remove('img-filters__button--active');

    clickedButton.classList.add('img-filters__button--active');
    currentFilter = clickedButton.id;
    debouncedCallback(filterPictures());
  });
};

export { setOnFilterClick, turnFilterOn, filterPictures };
