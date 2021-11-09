export default function getRefs() {
  return {
    searchInputRef: document.querySelector('.header__search-form-input'),
    searchBtnRef: document.querySelector('.header__form-btn'),
    textError: document.querySelector('.header__search-error'),
    insertPoint: document.querySelector('.hero__list'),
    header: document.querySelector('#header'),
    homeLink: document.querySelector('#home-link'),
    libraryLink: document.querySelector('#library-link'),
    modalСardRef: document.querySelector('.modal-form__card'),
    overlayRef: document.querySelector('.overlay'),
    lightboxRef: document.querySelector('.lightbox'),
    clsBtnRef: document.querySelector('.modal-form__close-btn'),
    btnWatched: document.querySelector('#btn-watched'),
    btnQueue: document.querySelector('#btn-queue'),
    headerForm: document.querySelector('.header__form'),
    headerButton: document.querySelector('.header__button'),
  };
}
