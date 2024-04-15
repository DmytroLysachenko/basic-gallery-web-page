import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchSearch } from './js/pixabay-api';
import { initalRender, renderGallery } from './js/render-functions';
initalRender();
const form = document.querySelector('.search-form');
const input = document.querySelector('.search-input');
const list = document.querySelector('.gallery-list');
const loader = document.querySelector('.loader');
const nextButton = document.querySelector('.next-button');
let globalImageName;
let globalTotalHits;
let page;

form.addEventListener('submit', async event => {
  try {
    list.innerHTML = '';
    nextButton.classList.add('is-hidden');
    page = 1;
    event.preventDefault();
    globalImageName = input.value.trim();
    event.target.reset();
    if (globalImageName === '') {
      iziToast.show({
        title: 'Error',
        message: 'Invalid search request value',
        backgroundColor: 'red',
        theme: 'dark',
        color: 'red',
        position: 'topRight',
      });
      return;
    }
    loader.classList.add('is-loading');

    const { hits, totalHits } = await fetchSearch(globalImageName, page);
    globalTotalHits = totalHits;

    if (hits.length === 0) {
      iziToast.show({
        title: 'Error',
        message: 'Unfortunately no pictures found by your request :(',
        backgroundColor: 'red',
        theme: 'dark',
        color: 'red',
        position: 'topRight',
      });
      loader.classList.remove('is-loading');
      return;
    }

    const gallery = renderGallery(hits);
    list.append(...gallery);

    loader.classList.remove('is-loading');
    if (globalTotalHits / 15 > 1) {
      nextButton.classList.remove('is-hidden');
    }
    const lightbox = new SimpleLightbox('.gallery-link', {
      captionDelay: 250,
      captionsData: 'alt',
    });
    lightbox.refresh();
  } catch (error) {
    console.log(error);
  }
});

const onClickNextButton = async event => {
  try {
    nextButton.classList.add('is-hidden');
    loader.classList.add('is-loading');
    page += 1;
    const { hits } = await fetchSearch(globalImageName, page);
    const gallery = renderGallery(hits);
    list.append(...gallery);
    if (page < Math.ceil(globalTotalHits / 15)) {
      nextButton.classList.remove('is-hidden');
    }
    loader.classList.remove('is-loading');
    const lightbox = new SimpleLightbox('.gallery-link', {
      captionDelay: 250,
      captionsData: 'alt',
    });
    lightbox.refresh();
    if (page === Math.ceil(globalTotalHits / 15)) {
      nextButton.removeEventListener('click', onClickNextButton);
    }
  } catch (error) {
    console.log(error);
  }
};
nextButton.addEventListener('click', onClickNextButton);

list.addEventListener('click', event => {
  event.preventDefault();
});
