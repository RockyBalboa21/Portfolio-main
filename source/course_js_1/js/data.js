import { getRandomInteger, getRandomPositiveInteger, getRandomArrayElement } from './util.js';

const NAMES = [
  'Александр',
  'Лёша',
  'Влад',
  'Дмитрий',
  'Егор',
  'Юра',
  'Юзик',
  'Донжуан',
  'Игорь',
  'Сергей'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const DESCRIPTIONS = [
  'Закрытый пляж для клиентов приятного отеля, с лежаками для загара. #тай #отдых #лето #чил #travel #travelgram #summergram #chill',
  'Прикольный указатель направления движения на пляж. #camera #test #new #newcameratest #pic #photo #instaphoto',
  'Открытый пляж для местных жителей и всех желающих заняться сёрфингом или погрузится с аквалонгом. #laptevsea #north #northeastpassage',
  'Девушка с фотоаппаратом на пляже. #test #new',
  'Местное очень знаменитое блюдо от шефа - смайлы в супе. #food #foodgram #instafood #delicious #yummy',
  'Очень красивый и дорогой чёрный спортивный автомобиль. #wow #car #carwow #drive',
  'Время для десерта - клубника. #food #foodgram #instafood',
  'Время для прохладительных напитков - стаканы с напитками #food #foodgram #instafood',
  'Досточно близко со мной пролетел самолёт во время купания на пляже. #wow',
  'Интересный способ хранения уличной обуви #test #new',
  'Возможности благоустройства, вид забора от дизайнера) #wow',
  'Белая спортивная Audi RS Coupe #wow #car #carwow #drive',
  'Вариант вегетарианского обеда #food #foodgram #instafood',
  'Просто котейка) с бантиком #fun #party #cool #young',
  'Весёлые надувные домашние тапочки #fun #party #cool #young',
  'Так летает самолёт над облаками #fun #party #cool #young',
  'Концерт, на сцене хор совместно с солисткой #chill #relax #group #photo',
  'Антиквариат в красном цвете - американское авто #wow #car #carwow #drive',
  'Прикольные тапочки со встроенными фонариками - самое время для прогулок в темноте по дому #wow',
  'Обзор отеля в сумерках #wow',
  'Лёгкий ужин в ресторане #food #foodgram #instafood',
  'Вид на закате солнца с пляжа в океан #chill #relax #group #photo',
  'Крабы бывают разные, даже такие глазастые) #fun #party #cool #young',
  'Во время концерта люди поднимают руки вверх #chill #relax #group #photo #fun #party #cool #young',
  'Во время поездки на авто появился бегемот #chill #relax #group #photo',
];

// Функция createMessage, которая создает строку, состоящую из одного или двух элементов массива MESSAGES, выбранных случайным образом
const createMessage = () =>
  Array.from({ length: getRandomPositiveInteger(1, 2) }, () =>
    getRandomArrayElement(MESSAGES)
  ).join(' ');

// Функция createComment, создаёт объект комментарий с известными ключами и значениями сгенериванными случайным образом - целые числами, строку состоящую из 1-2 строк массива MESSAGES и случайного элемента из массива NAMES - строка.
const createComment = (index) => ({
  id: index,
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES),
});

// Функция createPicture, которая создает объект, представляющий фотографию, с описанием, лайками и коментариями.
const createPicture = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(15, 200),
  comments: Array.from(
    { length: getRandomInteger(1, 16) },
    (_, commentIndex) => createComment(commentIndex + 1)
  ),
});

// Функция createPhotoDescription, которая создает массив из 25 объектов, созданных функцией createPicture, представляющих описание фотографии, каждого объекта.
const createPhotoDescription = () =>
  Array.from({ length: 25 }, (_, pictureIndex) =>
    createPicture(pictureIndex + 1)
  );

export { createPhotoDescription };
