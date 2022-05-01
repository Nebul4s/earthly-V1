import { API_URL_NAME, API_URL_REGION } from "./config.js";
import { getJSON } from "./helpers.js";
import * as model from "./model.js";
import countryView from "./views/countryView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import browseView from "./views/browseView.js";
import paginationView from "./views/paginationView.js";

const reload = document.querySelector(".title-container");
reload.addEventListener("click", function () {
  window.location.hash = "";
  location.reload();
});

const controlCountries = async function () {
  try {
    countryView._classControl();

    const id = window.location.hash.slice(1);
    if (!id) return;

    //hides browseview whenever a country is loaded
    browseView._clickState = false;

    //1. Loading
    countryView.renderSpinner();
    await model.loadCountry(id);
    if (!model.state.country) return;

    //renders the active class for side-nav list elements every time selected country is changed
    resultsView.render(model.getSearchResultsPage());

    //2. Rendering
    countryView.render(model.state.country, model.state.weather);
    countryView._loadMap(model.state.country);
  } catch (err) {
    countryView.renderError(err);
  }
};

const controlLoadAll = async function () {
  try {
    browseView.classControl();

    if (browseView._clickState === false) {
      browseView.renderSpinner();
      await model.loadAll();

      browseView.render(model.state.search.results);
      browseView._clickState = true;
    } else {
      browseView._clear();
      browseView._clickState = false;
      return;
    }
  } catch (err) {
    countryView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) return;

    resultsView._classControl();
    await model.loadSearchResults(query);

    //renders pagination for the side-nav
    resultsView.render(model.getSearchResultsPage(1));
    paginationView.render(model.state.search);
  } catch (err) {
    resultsView.renderError();
  }
};

const controlPagination = function (goToPage) {
  //updates pagination for the side-nav when page is switched
  resultsView.render(model.getSearchResultsPage(goToPage));
  paginationView.render(model.state.search);
};

const init = function () {
  countryView.addHandlerRender(controlCountries);
  searchView.addHandlerSearch(controlSearchResults);
  browseView.addHandlerBrowse(controlLoadAll);
  paginationView.addHandlerClick(controlPagination);
};
init();
