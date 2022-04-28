import View from "./View.js";

class CountryView extends View {
  _parentEl = document.querySelector(".country-page");
  _errorMessage = "No results for your query";

  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
  }

  _classControl() {
    document.querySelector(".side-nav-container").classList.remove("hidden");
    document.querySelector(".results").innerHTML = "";
    document.querySelector(".results").classList.add("hidden");
    this._parentEl.classList.remove("hidden");
  }

  _loadMap(data) {
    this._data = data;
    let map = L.map("map").setView(this._data.coords, 7);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker(this._data.coords)
      .addTo(map)
      .bindPopup(`${this._data.capital}, ${this._data.countryName}`)
      .openPopup();
  }

  _generateMarkup() {
    return `
        <div class="flag">
            <div class="flag-div">
                <img src="${this._data.image}" class="flag-fullsize" />
                <div class="flag-name">
                    <span class="flag-countryname">${
                      this._data.countryName
                    }</span>
                </div>
            </div>
        </div>
        <div class="info-list-container">

            <ul class="info-list">
            <li class="info-full">
                <ion-icon
                name="home-outline"
                class="preview-icon icon-color"
                ></ion-icon>
                <span class="subheading">Capital</span>
                <span class="info-content">${this._data.capital}</span>
            </li>
            <li class="info-full">
                <ion-icon
                name="accessibility-outline"
                class="preview-icon icon-color"
                ></ion-icon>
                <span class="subheading">Population</span>
                <span class="info-content">${this._data.population}</span>
            </li>
            <li class="info-full">
                <ion-icon
                name="cash-outline"
                class="preview-icon icon-color"
                ></ion-icon>
                <span class="subheading">Currencies</span>
                <span class="info-content">${this._data.currencies}</span>
            </li>
            <li class="info-full">
                <ion-icon
                name="chatbubble-outline"
                class="preview-icon icon-color"
                ></ion-icon>
                <span class="subheading">Languages</span>
                <span class="info-content">${this._data.languages}</span>
            </li>
            </ul>
        </div>
        <div id="map"></div>
        <div class="weather-information">
            <span class="forecast-heading">
                Weekly forecast for 
                ${this._data.capital},
                ${this._data.countryName}
             </span>
            <ul class="weather-list">
            ${this._weatherData.dailyTempMax
              .map((day, index) => {
                return `
                <li class="weather-item">
                        <i class="wi wi-wmo4680-${this._weatherData.weathercode[index]}"></i>
                        <span class="temp-unit">${day}${this._weatherData.tempUnit}</span>
                    <span class="daily-time">${this._weatherData.dailyTime[index]}</span>
                </li>
                `;
              })
              .join("")}
            </ul>
        </div>
    `;
  }
}
export default new CountryView();
