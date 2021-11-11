import API from '../API/api-service';
import imageCardsTemplate from '../../handlebars/cardMovie.hbs';
import createCardData from './create-card-data';
import { startSpinner, stopSpinner} from './spinner';
import getRefs from '../refs/get-refs';
const {insertPoint, pageNumbersContainer, nextBtn, prevBtn, firstPageBtn, lastPageBtn, pageEllipsisStart, pageEllipsisFinish, pagesContainer} = getRefs();

const api = new API();
let totalPages

pageNumbersContainer.addEventListener('click', onPageNumberClick);
nextBtn.addEventListener('click', onNextBtnClick);
prevBtn.addEventListener('click', onPrevBtnClick);
firstPageBtn.addEventListener('click', onFirstPageBtnClick);
lastPageBtn.addEventListener('click', onLastPageBtnClick);
pagesContainer.addEventListener('click', smoothScroll);

async function getTotalPages() {
    await api.fetchMovieTrending().then(data => {
    totalPages = data.total_pages
    })

    return
}
getTotalPages();

function smoothScroll() {
  setTimeout(() => {
    insertPoint.scrollIntoView({
        behavior: 'smooth'
    });
  },500)
} 

function getActivePages() {
  let allPages = document.getElementsByClassName('page__number');
  const currentActivePage = document.querySelector('.page__number--active');
  const allPagesArray = Array.from(allPages);
  return {
    currentActivePage: currentActivePage,
    currentNumber: Number(currentActivePage.innerText),
    allPagesArray: allPagesArray,
    middlePageIndex: Math.floor(allPagesArray.length / 2),
  };
}

function onPageNumberClick(e) {
  const pageNumber = Number(e.target.innerText);

  const { currentActivePage, allPagesArray, middlePageIndex } = getActivePages(e);

  currentActivePage.classList.remove('page__number--active');
  if (pageNumber <= middlePageIndex) {
    e.target.classList.add('page__number--active');
  } else if (pageNumber > middlePageIndex && pageNumber < totalPages - 1) {
    allPagesArray[middlePageIndex].classList.add('page__number--active');
    const middleElemNumber = Number(allPagesArray[middlePageIndex].innerText);

    let pageDifference = pageNumber - middleElemNumber;
    for (let j = 0; j < allPagesArray.length; j += 1) {
      let elemValue = Number(allPagesArray[j].innerText);
      allPagesArray[j].textContent = elemValue + pageDifference;
    }
  } else if (pageNumber >= totalPages - 1) {
    e.target.classList.add('page__number--active');
  }

  setEllipsis(Number(allPagesArray[0].innerText), allPagesArray.length);
  
  fetchAndInsertFilms(pageNumber);
  
}


function onNextBtnClick() {
  const { currentActivePage, currentNumber, allPagesArray, middlePageIndex } = getActivePages();
   if (currentNumber === totalPages) {
      return
    }
  if (allPagesArray[0].innerText == 1000 - (allPagesArray.length - 1)) {
    let index = allPagesArray.indexOf(currentActivePage);
    if (currentNumber !== totalPages) {
      allPagesArray[index].classList.remove('page__number--active');
      allPagesArray[index + 1].classList.add('page__number--active');
    }
  } else {
    for (let i = 0; i < allPagesArray.length; i += 1) {
      if (allPagesArray[i] == currentActivePage && i < middlePageIndex) {
        currentActivePage.classList.remove('page__number--active');
        allPagesArray[i + 1].classList.add('page__number--active');
      } else if (
        allPagesArray.indexOf(currentActivePage) >= middlePageIndex &&
        Number(allPagesArray[allPagesArray.length - 1].innerText) < 1000
      ) {
        allPagesArray[i].textContent++;

        if (currentNumber > totalPages - 3) {
          currentActivePage.classList.remove('page__number--active');
          allPagesArray[i + 1].classList.add('page__number--active');
          return;
        }
      }
    }
  }

  setEllipsis(Number(allPagesArray[0].innerText), allPagesArray.length);

  let pageNumber = currentNumber + 1
  apiService._setPage(pageNumber)
    apiService.fetchMovieTrendingData()
        .then(films => {
    
            insertPoint.innerHTML = '';
            insertPoint.insertAdjacentHTML('beforeend', imageCardsTemplate(films.results));

        })
        .catch(err => {
        console.log(err);
        });
}

function onPrevBtnClick() {
  const { currentActivePage, currentNumber, allPagesArray, middlePageIndex } = getActivePages();
  if (currentNumber === 1) {
      return
    }
    
  if (allPagesArray[0].innerText == 1) {
    let index = allPagesArray.indexOf(currentActivePage);
    allPagesArray[index].classList.remove('page__number--active');
    allPagesArray[index - 1].classList.add('page__number--active');
  } else if (currentNumber <= totalPages && currentNumber > totalPages - middlePageIndex) {
    let index = allPagesArray.indexOf(currentActivePage);
    allPagesArray[index].classList.remove('page__number--active');
    allPagesArray[index - 1].classList.add('page__number--active');
  } else {
    for (let i = 0; i < allPagesArray.length; i += 1) {
      allPagesArray[i].textContent--;
    }
  }
  setEllipsis(Number(allPagesArray[0].innerText), allPagesArray.length);
  
  let pageNumber = currentNumber - 1;
  fetchAndInsertFilms(pageNumber);
    
}

function onFirstPageBtnClick() {
  const { currentActivePage, allPagesArray } = getActivePages();
  currentActivePage.classList.remove('page__number--active');
  allPagesArray[0].classList.add('page__number--active');
  for (let i = 0; i < allPagesArray.length; i += 1) {
    allPagesArray[i].textContent = i + 1;
  }
  setEllipsis(Number(allPagesArray[0].innerText), allPagesArray.length);
  
  fetchAndInsertFilms(1);
    
}

function onLastPageBtnClick() {
  const { currentActivePage, allPagesArray } = getActivePages();

  currentActivePage.classList.remove('page__number--active');
  allPagesArray[allPagesArray.length - 1].classList.add('page__number--active');
  for (let i = 0; i < allPagesArray.length; i += 1) {
    allPagesArray[i].textContent = i + (totalPages - (allPagesArray.length - 1));
  }
    setEllipsis(Number(allPagesArray[0].innerText), allPagesArray.length);
    fetchAndInsertFilms(totalPages)
    
}

function setEllipsis(firstEl, allPagesLength) {
  if (firstEl >= 1 && firstEl < totalPages - allPagesLength + 1) {
    pageEllipsisFinish.classList.remove('page__hidden');
  }
  if (firstEl > totalPages - allPagesLength) {
    pageEllipsisFinish.classList.add('page__hidden');
  }
  if (firstEl > 1) {
    pageEllipsisStart.classList.remove('page__hidden');
  }
  if (firstEl === 1) {
    pageEllipsisStart.classList.add('page__hidden');
  }
}


async function fetchAndInsertFilms(totalPages) {
  startSpinner();
  try {
    insertPoint.innerHTML = '';
    api._setPage(totalPages)
    const data = await api.fetchMovieTrending();
    console.log(data);
    const result = await data.results;
    insertPoint.innerHTML = '';
    const markup = await createCardData(result);

    insertPoint.insertAdjacentHTML('beforeend', imageCardsTemplate(markup))
    stopSpinner();
  } catch (error) {
    console.error(error);
  }
}