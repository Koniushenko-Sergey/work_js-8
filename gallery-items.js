'use strict'
export default [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

import mydefault from './gallery-items.js';

// Галерея //

const galleryEl = document.querySelector('.js-gallery');
const cardsMarkup = createImgCards(mydefault);

function createImgCards(mydefault) {
  return mydefault.map(({ preview, original, description } = {}, index) => {
    return `<li class="gallery__item">
       <a
         class="gallery__link"
         href=${original}
       >
       <img
         class="gallery__image"
         src=${preview}          
         data-source=${original}
        data-index = ${index}
         alt=${description}
       />
     </a>
   </li>`})
    .join('');
}
galleryEl.innerHTML = cardsMarkup;
  


// переменные, модальное окно, кнопки переключения карточек
const lightboxEl = document.querySelector('.js-lightbox');
const lightboxImgEl = document.querySelector('.lightbox__image');
const closeButtonEl = document.querySelector('[data-action="close-lightbox"]');
const lightboxOverlayEl = document.querySelector('.lightbox__overlay');

galleryEl.addEventListener('click', onCardClick);
lightboxEl.addEventListener('click', onlightboxElClick);
window.addEventListener('keyup', onKeyboardEvent);

function onCardClick(evt) {
  evt.preventDefault();

  const isGalleryImgEl = evt.target.classList.contains('gallery__image');
  if (!isGalleryImgEl) {
    return;
  }
  openModal(evt.target.dataset.source, evt.target.dataset.index);
}

function onlightboxElClick(evt) {
  const iscloseButtonEl = evt.target === closeButtonEl;
  const islightboxOverlayEl = evt.target === lightboxOverlayEl;

  if (!iscloseButtonEl && !islightboxOverlayEl) {
    return;
  }

  closeModal();
}

function onKeyboardEvent(evt) {
  const isEscape = evt.code === 'Escape';
  const isArrowRight = evt.code === 'ArrowRight';
  const isArrowLeft = evt.code === 'ArrowLeft';

  if (isEscape) {
    closeModal(evt);
  }

  if (isArrowRight || isArrowLeft) {
    showNextImg(isArrowRight);
  }
}

function openModal(src, index) {
  lightboxEl.classList.add('is-open');
  lightboxImgEl.setAttribute('data-index', index);
  lightboxImgEl.src = src;
}

function closeModal() {
  lightboxEl.classList.remove('is-open');
  lightboxImgEl.src = '';
}

function showNextImg(toRight) {
  let index;

  index = toRight
    ? Number(lightboxImgEl.dataset.index) + 1
    : Number(lightboxImgEl.dataset.index) - 1;

  if (index < 0) {
    index = mydefault.length + index;
  }

  if (index === mydefault.length) {
    index = 0;
  }

  lightboxImgEl.src = mydefault[index].original;
  lightboxImgEl.dataset.index = index;
}


