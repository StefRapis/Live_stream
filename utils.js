const cE = (type) => document.createElement(type);
const qS = (element) => document.querySelector(element);
const qSA = (type) => document.querySelectorAll(type);

const BASE_URL_SEARCH = "https://api.themoviedb.org/3/search/movie?";
const BASE_URL2 = "https://api.themoviedb.org/3/";
const API_KEY = "api_key=f443bcf0af8c5783ab55f098ca24c218";

// esempio richiesta API: https://api.themoviedb.org/3/movie/550?api_key=f443bcf0af8c5783ab55f098ca24c218
// esempio tv : // https://api.themoviedb.org/3/tv/popular?api_key=<<api_key>>&language=en-US&page=1

// https://api.themoviedb.org/3/tv/{tv_id}?api_key=<<api_key>>&language=en-US
// type = movie o tv

export {
  cE,
  qS,
  qSA,
  GET,
  GET3,
  GETsearch,
  tvCardGenerator,
  modalCreator,
  heroGenerator,
};

const GET = async (movieortv, type = "popular") => {
  const res = await fetch(BASE_URL2 + movieortv + "/" + type + "?" + API_KEY);
  const data = await res.json();
  return data;
};

const GET3 = async (type, id) => {
  const res = await fetch(BASE_URL2 + type + "/" + id + "?" + API_KEY);
  const data = await res.json();
  return data;
};

const GETsearch = async (query) => {
  const res = await fetch(
    BASE_URL_SEARCH +
      API_KEY +
      "&language=en-US&query=" +
      query +
      "&include_adult=false"
  );
  const data = await res.json();
  // console.log(data);
  return data;
};

const heroGenerator = (data) => {
  const heroContainer = cE("div");
  const heroImg = cE("img");
  const heroOverlay = cE("div");
  const textContainer = cE("div");
  const heroTitle = cE("h1");
  const heroDescription = cE("h5");
  const btnContainer = cE("div");
  const heroBtnPlay = cE("button");
  const heroBtnTrailer = cE("button");

  heroContainer.className = "hero_container";
  heroImg.className = "hero_image";
  heroImg.setAttribute(
    "src",
    `https://image.tmdb.org/t/p/original/${data.backdrop_path}`
  );
  heroImg.setAttribute("alt", data.title);
  heroOverlay.className = "hero_overlay";
  textContainer.className = "text_container";
  heroTitle.className = "hero_title";
  heroTitle.textContent = data.name;
  heroDescription.className = "hero_description";
  heroDescription.textContent = data.overview;
  btnContainer.className = "btn_container";
  heroBtnPlay.className = "btn_play";
  heroBtnPlay.textContent = "Play";
  heroBtnTrailer.className = "btn_trailer";
  heroBtnTrailer.textContent = "Trailer";

  heroContainer.append(heroImg, heroOverlay, textContainer);
  textContainer.append(heroTitle, heroDescription, btnContainer);
  btnContainer.append(heroBtnPlay, heroBtnTrailer);

  return heroContainer;
};

const tvCardGenerator = (data) => {
  const tvCardEl = cE("div");
  const tvImage = cE("img");

  tvCardEl.className = "card_element";
  tvCardEl.setAttribute("id", data.id);
  tvImage.className = "tv_image";

  if (data.poster_path) {
    tvImage.setAttribute(
      "src",
      `https://image.tmdb.org/t/p/w500/${data.poster_path}`
    );
  }

  tvImage.setAttribute("alt", data.title);

  tvCardEl.appendChild(tvImage);
  return tvCardEl;
};

const modalCreator = (data) => {
  const modalContainer = cE("div");
  const modalImage = cE("img");
  const wrapperTextEl = cE("div");
  const modalTitle = cE("h2");
  const modalEpisodes = cE("p");
  const modalSeasons = cE("p");
  const modalOverview = cE("p");

  modalContainer.className = "modal_container";
  wrapperTextEl.className = "modal_wrapper";
  modalTitle.className = "modal_title";

  modalImage.className = "modal_image";
  modalImage.setAttribute(
    "src",
    `https://image.tmdb.org/t/p/w500/${data.poster_path}`
  );
  modalTitle.textContent = data.name;
  modalEpisodes.textContent = "Number of episodes: " + data.number_of_episodes;
  modalSeasons.textContent = "Number of seasons: " + data.number_of_seasons;
  modalOverview.textContent = data.overview;

  wrapperTextEl.append(modalTitle, modalEpisodes, modalSeasons, modalOverview);
  modalContainer.append(modalImage, wrapperTextEl);

  return modalContainer;
};
