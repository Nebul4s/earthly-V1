import View from "./View.js";

class PaginationView extends View {
  _parentEl = document.querySelector(".pagination-container");

  addHandlerClick(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const btn = e.target.closest(".pag-btn");
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    //page 1 and more pages
    if (curPage === 1 && numPages > 1) {
      return `
        <span class="pagination-page">${curPage} / ${numPages}</span>
        <button data-goto="${curPage + 1}" class="pagination-forward pag-btn">
            <ion-icon
            class="pag-icon"
            name="chevron-forward-outline"
            ></ion-icon>
        </button>
      `;
    }
    //last page
    if (curPage === numPages && numPages > 1) {
      return `
        <button data-goto="${curPage - 1}" class="pagination-back pag-btn">
            <ion-icon class="pag-icon" name="chevron-back-outline"></ion-icon>
        </button>
        <span class="pagination-page">${curPage} / ${numPages}</span>
      `;
    }
    //other page
    if (curPage < numPages || curPage !== 1)
      return `
        <button data-goto="${curPage - 1}" class="pagination-back pag-btn">
            <ion-icon class="pag-icon" name="chevron-back-outline"></ion-icon>
        </button>
        <span class="pagination-page">${curPage} / ${numPages}</span>
        <button data-goto="${curPage + 1}" class="pagination-forward pag-btn">
            <ion-icon
            class="pag-icon"
            name="chevron-forward-outline"
            ></ion-icon>
        </button>
        `;
    //page 1 no other pages
    return `
    <span class="pagination-page">${curPage} / ${numPages}</span>
    `;
  }
}
export default new PaginationView();
