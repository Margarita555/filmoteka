import getRefs from '../refs/get-refs';
import createModalFilm from '../data/create-modal-film-data';
import modal from '../../handlebars/modal.hbs';

const { insertPoint, modalСardRef, overlayBackgroundRef, overlayRef, clsBtnRef, themeSwitch } = getRefs();
let movieID;

insertPoint.addEventListener('click', onClickOnCard);
//Вешаем слушатели на кнопки
modalСardRef.addEventListener('click', onModalBtnClick);

async function onClickOnCard(e) {
  if (e.target.nodeName !== 'UL') {
    e.preventDefault();
    
    //Получаем ID фильма из data-атрибута, делаем запрос по ID на API-сервис
    const imgRef = e.target.parentNode.querySelector('img');
    const result = await createModalFilm(imgRef.dataset.src);
    movieID = result.id;
    //Получаем разметку модального окна по шаблону
    modalСardRef.insertAdjacentHTML('beforeend', modal(result));
    //Добавляем данные фильма в LS для возможного добавления карточки в библиотеку
    addItemToLocalStorage(result);
    //Показываем фоновый постер с оверлеем
    overlayBackgroundRef.classList.add('is-open');
    overlayRef.classList.add('is-open');
    themeSwitch.classList.add('disabled')
    overlayBackgroundRef.style.backgroundImage = `linear-gradient(rgb(255, 255, 255, 0.1), rgb(255, 255, 255, 0.1)), url("${result.backdrop}")`;
    //Проверяем, есть ли текущий фильм в библиотеке, если да - делаем активными соотв. кнопки
    setButtonView(movieID, modalСardRef.querySelector('#btn-add-watched'));
    setButtonView(movieID, modalСardRef.querySelector('#btn-add-to-queue'));
    //Варианты закрытия модального окна: кнопка закрытия, клик по оверлею, ESC
    clsBtnRef.addEventListener('click', closeModal);
    overlayRef.addEventListener('click', e => {
      if (e.target === overlayRef) closeModal();
    });
    window.addEventListener('keydown', e => {
      if (e.code === 'Escape') closeModal();
    });
  }
}

function onModalBtnClick(e) {
  if (e.target.nodeName === 'BUTTON') {
    if (e.target.classList.contains('btn--active'))
      deleteItemFromLibrary(e.target.dataset.lib, movieID);
    else addItemToLibrary(e.target.dataset.lib);
    setButtonView(movieID, e.target);
  }
}

function addItemToLocalStorage(res) {
  localStorage.setItem('ky', JSON.stringify(res));
}

function addItemToLibrary(collection) {
  let arrLib = JSON.parse(localStorage.getItem(collection));
  if (!arrLib) arrLib = [];
  arrLib.push(JSON.parse(localStorage.getItem('ky')));
  localStorage.setItem(collection, JSON.stringify(arrLib));
}

function deleteItemFromLibrary(collection, id) {
  let arrLib = JSON.parse(localStorage.getItem(collection));
  let arrRes = JSON.stringify(arrLib.filter(el => el.id !== id));
  localStorage.setItem(collection, arrRes);
}

function setButtonView(movieID, btnRef) {
  let arrFromLS = JSON.parse(localStorage.getItem(btnRef.dataset.lib));
  if (!arrFromLS) arrFromLS = [];

  if (arrFromLS.some(el => el.id === movieID)) {
    btnRef.classList.add('btn--active');
    btnRef.textContent = btnRef.dataset.textlib;
    return;
  }
  btnRef.classList.remove('btn--active');
  btnRef.textContent = btnRef.dataset.textcont;
}

function closeModal() {
  modalСardRef.innerHTML = '';
  themeSwitch.classList.remove('disabled')
  overlayBackgroundRef.classList.remove('is-open');
  overlayRef.classList.remove('is-open');
  clsBtnRef.removeEventListener('click', closeModal);
  overlayRef.removeEventListener('click', closeModal);
  window.removeEventListener('keydown', closeModal);
  localStorage.removeItem('ky');
}
