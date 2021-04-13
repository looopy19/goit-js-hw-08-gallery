

import galleryArray from './gallery-items.js';

// Ссылки на дом узлы
const refs = {
  gallery: document.querySelector('.js-gallery'),
  lightbox: document.querySelector('.js-lightbox'),
  lightboxImg: document.querySelector('.lightbox__image'),
  lightboxOverlay: document.querySelector('.lightbox__overlay'),
  lightboxCloseBtn: document.querySelector(
    'button[data-action="close-lightbox"]',
  ),
};

//Создание и рендер разметки по массиву данных и предоставленному шаблону.

const galleryMarkup = createGalleryMarkup(galleryArray);
refs.gallery.insertAdjacentHTML('afterbegin', galleryMarkup);

function createGalleryMarkup(galleryArray) {
  return galleryArray.map(({ preview, original, description}) => {
    return `<li class="gallery__item">
    <a
    class="gallery__link"
    href='${original}'>
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
    </a>
    </li>
     `;
  }).join('');
 
  
};

//Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
//Слушатели событий
refs.gallery.addEventListener('click', onModalOpen);
refs.lightboxCloseBtn.addEventListener('click', onModalClose);
refs.lightboxOverlay.addEventListener('click', onOverlay);

// Функция открытия модалки
function onModalOpen(e) {
  e.preventDefault();
  document.body.style.overflow = 'hidden'; //Блокировка скролла при открытой модалке
  if (e.target.tagName !== 'IMG') {
    return;
  }
  refs.lightbox.classList.add('is-open');
  refs.lightboxImg.src = e.target.dataset.source;
  refs.lightboxImg.alt = e.target.alt;

  window.addEventListener('keydown', onEscKey);
  window.addEventListener('keydown', onArrowKey);
}

// Функция закрытия модалки
function onModalClose(e) {
  refs.lightbox.classList.remove('is-open');
  refs.lightboxImg.src = '';
  refs.lightboxImg.alt = '';

  //Убираем слушателей событий с закрытием модалки
  document.body.removeAttribute('Style');
    window.removeEventListener('keydown', onEscKey);
    window.removeEventListener('keydown', onArrowKey);

}

// Функция закрытия модалки по клику на Esc
function onEscKey(e) {
    if (e.code === 'Escape') {
      onModalClose();
     }
  }

  // Функция закрытия модалки по клику на Overlay
function onOverlay(e) {
  if (e.currentTarget === e.target) {
    onModalClose();
  }
}

// Функция прокрутки изображений вправо/влево по клику на стрелки клавиатуры
function onArrowKey(e) {
  const isRightArrowPressed = e.code === 'ArrowRight';
  const isLeftArrowPressed = e.code === 'ArrowLeft';

  const imgSrcArray = galleryArray.map(item => item.original);
  const currentImgIndex = imgSrcArray.indexOf(refs.lightboxImg.src);

  if (isRightArrowPressed) {
    if (currentImgIndex < imgSrcArray.length - 1)
      refs.lightboxImg.src = imgSrcArray[Number(currentImgIndex) +1]
  }

  if (isLeftArrowPressed) {
    if (currentImgIndex > 0)
      refs.lightboxImg.src = imgSrcArray[Number(currentImgIndex) -1]
  }
 
}


