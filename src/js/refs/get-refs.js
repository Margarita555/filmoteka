export default function getRefs() {
  return {
    searchInputRef: document.querySelector('.header__search-form-input'),
    searchBtnRef: document.querySelector('.header__form-btn'),
    insertPoint: document.querySelector('.hero__list'),
    homeLink: document.querySelector('#home-link'),
    modalСardRef: document.querySelector('.modal-form__card'),
    overlayRef: document.querySelector('.overlay'),
    lightboxRef: document.querySelector('.lightbox'),
    clsBtnRef: document.querySelector('.modal-form__close-btn'),
  };
}
