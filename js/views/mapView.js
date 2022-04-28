import View from "./View.js";

class MapView extends View {
  _parentEl = document.querySelector(".map-container");

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
            <div id="map"></div>
        `;
  }
}

export default new MapView();
