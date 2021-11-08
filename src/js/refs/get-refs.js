export default function getRefs() {
  return {
    searchInputRef: document.querySelector('.header__search-form-input'),
    searchBtnRef: document.querySelector('.header__form-btn'),
    insertPoint: document.querySelector('.hero__list'),
    homeLink: document.querySelector('#home-link'),
  };
}
