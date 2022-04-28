import View from "./View.js";

class ResultsView extends View {
  _parentEl = document.querySelector(".side-nav");
  _errorMessage = "No results for your query";

  _classControl() {
    document.querySelector(".side-nav-container").classList.remove("hidden");
    document.querySelector(".country-page").classList.remove("hidden");
    document.querySelector(".results").innerHTML = "";
    document.querySelector(".results").classList.add("hidden");
  }

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join("");
  }
  _generateMarkupPreview(result) {
    const id = window.location.hash.slice(1);

    return `
      <li class="side-nav-item ${
        result.countryName.replaceAll(" ", "%20") === id
          ? "side-nav-item-active"
          : ""
      }"
       onclick="location.href='#${result.countryName}'">
      <a href="#${result.countryName}" class="side-nav-link">${
      result.countryName
    }</a>
      <img src="${result.image}" class="side-nav-flag" />
    </li>
      `;
  }
}

export default new ResultsView();
