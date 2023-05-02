// Esercizio 1
// Sulla base dell'esercizio del giorno:

// Creare un account su https://developers.themoviedb.org/
// Ottenere una API KEY
// creare una pagina web che effettui anche una sola chiamata GET stavolta per renderizzare una lista di serie tv,
// esempio popular o top rated o entrambe, e visaulizzare a schermo con uno stile a piacere.

// Avanzato
// Sulla base dell'immagine mockup avanzato presente in questa repository, creare una pagina (a parte rispetto
// all'esercizio 1) che incorpori una casella input di ricerca e un pulsante che:

// digitato il nome di un film sulla input
// cliccando il pulsante 'Search'
// effettui una chiamata GET al film specifico
// renderizzi il risultato proprio sotto la input, mostrando almeno immagine e titolo del film ricercato

import {
  cE,
  qS,
  qSA,
  GET,
  GET3,
  GETsearch,
  tvCardGenerator,
  modalCreator,
  heroGenerator,
} from "./utils.js";

const hero = qS(".hero");
const containerTv = qS(".tv_shows");
const mostPopular = qS(".most_popular");
const topRated = qS(".top_rated");
const upcoming = qS(".upcoming");
const h1Popular = qS(".h1_popular");
const h1Rated = qS(".h1_rated");
const h1Upcoming = qS(".h1_upcoming");
const modal = qS(".modal");
const overlay = qS(".overlay");
const searchInput = qS(".search_input");
const searchIcon = qS(".search_icon");
const cardsEl = qSA(".card_element");

//CHIAMATE GET CHE CANCELLO PERCHE LE RISOLVO TUTTE INSIEME CON IL PROMISEALL

// GET("popular").then((data) =>
//   data.results.map((show) => mostPopular.append(tvCardGenerator(show)))
// );

// GET("top_rated").then((data) =>
//   data.results.map((show) => topRated.append(tvCardGenerator(show)))
// );

function getRandomShow(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  const randomShow = arr[randomIndex];
  return randomShow;
}

function deleteCardsAndHero() {
  const cardsEl = qSA(".card_element");
  cardsEl.forEach((card) => card.remove());

  hero.remove();
  topRated.remove();
  upcoming.remove();
  h1Popular.remove();
  h1Rated.remove();
  h1Upcoming.remove();

  const h1Results = cE("h2");
  h1Results.className = "h1_results";
  mostPopular;
}

// CHIAMATA PER SHOW RANDOM PER LA HERO
GET("tv", "popular").then((data) =>
  hero.append(heroGenerator(getRandomShow(data.results)))
);

// MI CHIAMO ALLO STESSO MOMENTO I TRE GET
Promise.all([
  GET("tv", "popular"),
  GET("tv", "top_rated"),
  GET("movie", "upcoming"),
])
  .then((data) => {
    data[0].results.map((show) => mostPopular.append(tvCardGenerator(show)));
    data[1].results.map((show) => topRated.append(tvCardGenerator(show)));
    data[2].results.map((show) => upcoming.append(tvCardGenerator(show)));
  })
  .then(() => {
    // QUI MI PESCO TUTTE LE CARD CREATE DINAMICAMENTE, DENTRO IL THEN ASINCRONO
    const cardsEl = qSA(".card_element");

    //  SU TUTTE LE CARD APPLICO UN EVENTO CHE MI FA UNA CHIAMATA CHE MI EVOCA L'ID DEL FILM CLICCATO
    cardsEl.forEach((tvCardEl) =>
      tvCardEl.addEventListener("click", () =>
        GET3("tv", tvCardEl.id).then((selectedShow) => {
          modal.appendChild(modalCreator(selectedShow));
          modal.style.display = "flex";
        })
      )
    );
  });

overlay.addEventListener("click", () => {
  const showModal = qS(".modal_container");
  showModal.remove();
  modal.style.display = "none";
});

let inputWord = "";

searchInput.addEventListener("input", (event) => {
  console.log(event.target.value);
  inputWord = event.target.value;
  deleteCardsAndHero();

  GETsearch(`${inputWord}`).then((data) => {
    console.log(data);
    data.results.forEach((show) => mostPopular.append(tvCardGenerator(show)));
  });
});

// if (data.results.name.includes(inputWord))
//   bodyEl.appendChild(modalCreator(show));
// console.log(data);

// data.results.filter((show) => show.name === inputWord);

// const arrayElementiFiltrati = arrayFilm.filter(
//   (item) => item.name === inputSearch.value
// );
// console.log(arrayElementiFiltrati);
