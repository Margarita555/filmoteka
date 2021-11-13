import API from '../API/api-service';
import imageCardsTemplate from '../../handlebars/cardMovie.hbs';
import createCardData from '../data/create-card-data';
import { startSpinner, stopSpinner} from './spinner';
import getRefs from '../refs/get-refs';
const { insertPoint, pageNumbersContainer, nextBtn, prevBtn, firstPageBtn, lastPageBtn, pageEllipsisStart, pageEllipsisFinish, pagesContainer, header } = getRefs();


export default function renderPagination(request, totalPages, searchInputValue) {
pageNumbersContainer.innerHTML = ''
const api = new API();

pageNumbersContainer.addEventListener('click', onPageNumberClick);
nextBtn.addEventListener('click', onNextBtnClick);
prevBtn.addEventListener('click', onPrevBtnClick);
firstPageBtn.addEventListener('click', onFirstPageBtnClick);
lastPageBtn.addEventListener('click', onLastPageBtnClick);
pagesContainer.addEventListener('click', smoothScroll);

function smoothScroll() {
  setTimeout(() => {
    header.scrollIntoView({
        behavior: 'smooth'
    });
  },500)
} 

let pagesInView = 5
const totalPagesArray = [];
  let markupArray = []
  
  function getTotalPages() {
    for (let i = 1; i <= totalPages; i += 1){
    totalPagesArray.push(i)
    }
    const pagesMarkup = totalPagesArray.map(page => {
      return `<div class="page__number page__block">${page}</div>`
    });
    markupArray = pagesMarkup
    const pagesMarkupArray = [...pagesMarkup]
    pagesMarkupArray.splice(5, totalPages - 5)
    pageNumbersContainer.insertAdjacentHTML('beforeend', pagesMarkupArray.join(''));
    pageNumbersContainer.firstElementChild.classList.add('page__number--active');
    if (totalPages < pagesInView) {
      nextBtn.classList.add('page__hidden');
      prevBtn.classList.add('page__hidden');
      lastPageBtn.classList.add('page__hidden');
      pageEllipsisFinish.classList.add('page__hidden');
    }
    return
}
getTotalPages()

function getActivePages() {
  let allPages = document.getElementsByClassName('page__number');
  const currentActivePage = document.querySelector('.page__number--active');
  let allPagesArray = Array.from(allPages);
  return {
    currentActivePage: currentActivePage,
    currentNumber: Number(currentActivePage.innerText),
    allPagesArray: allPagesArray,
  };
}

function onPageNumberClick(e) {
  const { currentActivePage, allPagesArray } = getActivePages(e);
  const pageNumber = Number(e.target.innerText);
  currentActivePage.classList.remove('page__number--active');
  e.target.classList.add('page__number--active');
  
  setEllipsis(Number(allPagesArray[0].innerText), allPagesArray.length);
  console.log(pageNumber)
  fetchAndInsertFilms(pageNumber); 
}

function onNextBtnClick() {
  let { currentActivePage, currentNumber, allPagesArray} = getActivePages();
  if (currentNumber === totalPages) {
      return
  }
  if (currentNumber % pagesInView === 0) {
    const insertionsTotal = currentNumber / pagesInView;

    const pagesMarkupArray = [...markupArray];
    const newPagesMarkupArray = pagesMarkupArray.slice(pagesInView * insertionsTotal, pagesInView + pagesInView * insertionsTotal);

    pageNumbersContainer.innerHTML = '';
    pageNumbersContainer.insertAdjacentHTML('beforeend', newPagesMarkupArray.join(''));

    const newPages = document.querySelectorAll('.page__number');
    currentActivePage.classList.remove('page__number--active');
    newPages[0].classList.add('page__number--active');
    setFirstPageBtn(newPages);
    setEllipsis(Number(newPages[0].innerText), Number(newPages[pagesInView -1].innerText));
    
    if (Number(newPages[pagesInView - 1].innerText) >= totalPages - 20 ) {
      lastPageBtn.classList.add('page__hidden')
    } else {
      lastPageBtn.classList.remove('page__hidden')
      const lastPageMultiplier = Math.floor(Number((newPages[pagesInView - 1].innerText)) / 20)
      if (lastPageMultiplier === 0) {
        lastPageBtn.innerHTML = 20;
      }
      else {
        lastPageBtn.innerHTML = (lastPageMultiplier+1)*20
      }
    }
  }
  for (let i = 0; i < pagesInView; i += 1) {
    if (i === pagesInView - 1) {
      allPagesArray = [...document.getElementsByClassName('page__number')]
   }
    if (allPagesArray[i] == currentActivePage) {
        currentActivePage.classList.remove('page__number--active');
        allPagesArray[i + 1].classList.add('page__number--active');
      }
  }
  let pageNumber = currentNumber + 1
  console.log(pageNumber)
  fetchAndInsertFilms(pageNumber);
}

function onPrevBtnClick() {
  const { currentActivePage, currentNumber, allPagesArray} = getActivePages();
  if (currentNumber === 1) {
      return
    }
    
  if ((currentNumber-1) % pagesInView === 0) {
    const pagesMarkupArray = [...markupArray];
    const newPagesMarkupArray = pagesMarkupArray.slice(currentNumber - 1 - pagesInView, currentNumber-1);
    pageNumbersContainer.innerHTML = '';
    pageNumbersContainer.insertAdjacentHTML('beforeend', newPagesMarkupArray.join(''));

    const newPages = document.querySelectorAll('.page__number');
  
    currentActivePage.classList.remove('page__number--active');
    newPages[pagesInView - 1].classList.add('page__number--active');
    
    setFirstPageBtn(newPages);
    setEllipsis(Number(newPages[0].innerText), Number(newPages[pagesInView -1].innerText));
    if (Number(newPages[0].innerText) >= totalPages - 20 ||Number(newPages[pagesInView-1].innerText) === totalPages - 20) {
     
      lastPageBtn.classList.add('page__hidden')
    } else {
    
      lastPageBtn.classList.remove('page__hidden');
      const lastPageMultiplier = Math.floor(Number((newPages[0].innerText)) / 20)
      if (Number(newPages[pagesInView - 1].innerText) % 20 === 0) {
      
        lastPageBtn.innerHTML = Number(newPages[pagesInView - 1].innerText)+20
      } else if (lastPageMultiplier === 0) {
        lastPageBtn.innerHTML = 20;
      }
      else {
        lastPageBtn.innerHTML = (lastPageMultiplier+1)*20
      }
    }
  }
  for (let i = 1; i < pagesInView; i += 1) {
    if (allPagesArray[i] == currentActivePage) {
        currentActivePage.classList.remove('page__number--active');
        allPagesArray[i -1].classList.add('page__number--active');
      }
  }
  let pageNumber = currentNumber - 1;
  console.log(pageNumber)
  fetchAndInsertFilms(pageNumber);
}

function onLastPageBtnClick(e) {
  const { currentActivePage} = getActivePages();
  
  const lastPageValue = Number(e.target.innerText);
  const newValue = lastPageValue + 20;
  
  const pagesMarkupArray = [...markupArray];
  const newPagesMarkupArray = pagesMarkupArray.slice(lastPageValue, pagesInView + lastPageValue);
  pageNumbersContainer.innerHTML = '';
  pageNumbersContainer.insertAdjacentHTML('beforeend', newPagesMarkupArray.join(''));
  const newPages = document.querySelectorAll('.page__number');
  setFirstPageBtn(newPages);
setEllipsis(Number(newPages[0].innerText), Number(newPages[pagesInView -1].innerText) );
  e.target.innerText = newValue;
  if (newValue === totalPages) {
    e.target.classList.add('page__hidden')
  }
    currentActivePage.classList.remove('page__number--active');
  
    newPages[0].classList.add('page__number--active');
    
     console.log(lastPageValue)
   fetchAndInsertFilms(lastPageValue) 
}

function onFirstPageBtnClick() {
  const { currentActivePage} = getActivePages();
  const pagesMarkupArray = [...markupArray];
    const newPagesMarkupArray = pagesMarkupArray.slice(0, pagesInView);
    pageNumbersContainer.innerHTML = '';
    pageNumbersContainer.insertAdjacentHTML('beforeend', newPagesMarkupArray.join(''));

    const newPages = document.querySelectorAll('.page__number');
    currentActivePage.classList.remove('page__number--active');
    newPages[0].classList.add('page__number--active');
    lastPageBtn.innerHTML = 20;
    setFirstPageBtn(newPages);
    setEllipsis(Number(newPages[0].innerText), Number(newPages[pagesInView -1].innerText));
     fetchAndInsertFilms(1) 
  }

  function setFirstPageBtn(newPages) {
    if (Number(newPages[0].innerText) > 1 ) {
    firstPageBtn.classList.remove('page__hidden');
  }
  else {
    firstPageBtn.classList.add('page__hidden');
  }
}

function setEllipsis(firstEl, allPagesLength) {
  if (firstEl >= 1 && firstEl < totalPages - allPagesLength + 1) {
    pageEllipsisFinish.classList.remove('page__hidden');
  }
  if (firstEl > totalPages - 20) {
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
    api._setPage(totalPages);
    api._setQuery(searchInputValue)
    let data
    if(request == "searchQuery"){
      data = await api.fetchMovieSearchQuery();
    }
    else if (request == "home") {
      data = await api.fetchMovieTrending();
    }
    const result = await data.results;
    insertPoint.innerHTML = '';
    const markup = await createCardData(result);

    insertPoint.insertAdjacentHTML('beforeend', imageCardsTemplate(markup))
    stopSpinner();
  } catch (error) {
    console.error(error);
  }
}

}
