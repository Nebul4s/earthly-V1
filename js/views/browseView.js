import View from "./View.js";

class BrowseView extends View {
  _parentEl = document.querySelector(".results");
  _btn = document.querySelector(".btn-browse");
  _clickState = false;

  addHandlerBrowse(handler) {
    this._btn.addEventListener("click", function () {
      handler();
    });
  }

  classControl() {
    document.querySelector(".side-nav-container").classList.toggle("hidden");
    document.querySelector(".country-page").classList.toggle("hidden");
    this._parentEl.classList.toggle("hidden");
  }

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join("");
  }
  _generateMarkupPreview(result) {
    return `
    <a href="#${result.countryName}" class="country__card--link">
    <div class="country-card">
    <div class="country-card--image">
       <img src="${result.image}" class="flag-img" />
    </div>
    <div class="preview-info-container">
      <ul class="preview-info">
        <li class="preview-info-item">
          <ion-icon name="flag-outline" class="preview-icon icon-color"></ion-icon
          ><span>${result.countryName}</span>
        </li>
        <li class="preview-info-item">
          <ion-icon name="home-outline" class="preview-icon icon-color"></ion-icon>
          <span>${result.capital}</span>
        </li>
        <li class="preview-info-item">
          <ion-icon
            name="accessibility-outline"
            class="preview-icon icon-color"
          ></ion-icon
          ><span>${result.population}</span>
        </li>
      </ul>
    </div>
  </div>
  </a>
      `;
  }
}

export default new BrowseView();
