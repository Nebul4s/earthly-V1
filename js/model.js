import { getJSON } from "./helpers.js";
import {
  API_URL_ALL,
  API_URL_NAME,
  API_URL_REGION,
  RES_PER_PAGE,
} from "./config.js";

export const state = {
  country: {},
  weather: {},
  search: {
    query: "",
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
};

export const loadCountry = async function (id) {
  try {
    const data = await getJSON(`${API_URL_NAME}${id}`);
    let country = data[0];

    let newLanguage = [];
    for (const [_, value] of Object.entries(country.languages)) {
      newLanguage.push(value);
    }

    let newCurrency;
    const currencies = Object.entries(country.currencies);
    for (const [_, { name, symbol }] of currencies) {
      newCurrency = `${name} ${symbol}`;
    }

    state.country = {
      image: country.flags.png,
      countryName: country.name.common,
      capital: country.capital[0],
      population: country.population.toLocaleString(),
      currencies: newCurrency,
      languages: newLanguage,
      coords: country.capitalInfo.latlng,
    };

    const weatherData = await getJSON(
      `https://api.open-meteo.com/v1/forecast?latitude=${state.country.coords[0]}&longitude=${state.country.coords[1]}&daily=weathercode,temperature_2m_max&timezone=Europe%2FBerlin`
    );

    state.weather = {
      dailyTime: weatherData.daily.time,
      dailyTempMax: weatherData.daily.temperature_2m_max,
      tempUnit: weatherData.daily_units.temperature_2m_max,
      weathercode: weatherData.daily.weathercode,
    };
  } catch (err) {
    throw err;
  }
};

const loadData = function (data) {
  state.search.results = data.map((item) => {
    return {
      image: item.flags.png,
      countryName: item.name.common,
      capital: item.capital,
      population: item.population.toLocaleString(),
    };
  });
};

export const loadSearchResults = async function (query) {
  try {
    query.toLowerCase();
    state.search.query = query;

    let data;
    if (
      query === "europe" ||
      query === "africa" ||
      query === "north america" ||
      query === "south america" ||
      query === "oceania" ||
      query === "asia"
    ) {
      data = await getJSON(`${API_URL_REGION}${query}`);
    } else {
      data = await getJSON(`${API_URL_NAME}${query}`);
    }

    loadData(data);
  } catch (err) {
    throw err;
  }
};

export const loadAll = async function () {
  try {
    const data = await getJSON(`${API_URL_ALL}`);

    loadData(data);
  } catch (err) {
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};
