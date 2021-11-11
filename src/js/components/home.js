import API from '../API/api-service';
import getRefs from '../refs/get-refs';
import card from '../../handlebars/cardMovie.hbs';
import createCardData from './create-card-data';

const { insertPoint, homeLink, libraryLink, headerForm, headerButton } = getRefs();

const api = new API();

async function createMarkup() {
  try {
    const markup = await createCardData();

    insertPoint.insertAdjacentHTML('beforeend', card(markup));

    homeLink.classList.add('active');
    libraryLink.classList.remove('active');
    headerForm.classList.remove('disabled');
    headerButton.classList.add('disabled');
  } catch (error) {
    console.error(error);
  }
}

createMarkup();
