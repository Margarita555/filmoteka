import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

import API from '../API/api-service';

const api = new API();

async function getTrailer(id) {
  const trailerBtn = document.querySelector('[data-trailer=js-trailer-btn]');

  api._setId(id);
  const trailers = await api.fetchMovieTrailer();

  const trailer = trailers.find(trailer => {
    const officialTrailer = 'trailer';

    if (officialTrailer === trailer.type.toLowerCase()) {
      return trailer;
    }
  });

  trailerBtn.addEventListener('click', event => {
    event.preventDefault();
    if (!event.currentTarget.dataset.trailer) return;

    const popUp = basicLightbox.create(
      `<iframe width="560" height="315" src='https://www.youtube.com/embed/${trailer.key}'frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
    );
    popUp.show();
  });
}

export default getTrailer;
