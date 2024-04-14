import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchSearch } from './js/pixabay-api';
import { initalRender, nextButton, renderGallery } from './js/render-functions';
initalRender();
const form = document.querySelector('.search-form');
const input = document.querySelector('.search-input');
const list = document.querySelector('.gallery-list');
const loader = document.querySelector('.loader');
let page;
let total;
form.addEventListener('submit', event => {
  if (input.value.trim() === '') {
    iziToast.show({
      title: 'Error',
      message: 'Invalid value',
      backgroundColor: 'red',
      theme: 'dark',
      color: 'red',
      position: 'topRight',
    });
  }
  loader.classList.add('is-loading');
  event.preventDefault();
  const imageName = input.value.trim();
  list.innerHTML = '';
  input.value = '';
  handleSubmit(imageName);
});

list.addEventListener('click', event => {
  event.preventDefault();
});

const handleSubmit = async imageName => {
  try {
    page = 1;
    const { hits, totalHits } = await fetchSearch(imageName, page);
    total = totalHits;
    console.log(hits);
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
    const lightbox = new SimpleLightbox('.gallery-link', {
      captionDelay: 250,
      captionsData: 'alt',
    });
    lightbox.refresh();

    if (total / 15 > 1) {
      const button = nextButton();

      list.after(button);
    }
  } catch (error) {
    console.log(error);
  }
};

button.addEventListener('click', async event => {
  console.log(page);
  page += 1;
  const { hits } = await fetchSearch(imageName, page);
  const gallery = renderGallery(hits);
  list.append(...gallery);
});
