export default class View {
  _data;
  render(data, weatherData) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._weatherData = weatherData;
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  _clear() {
    this._parentEl.innerHTML = "";
  }

  renderError(message = this._errorMessage) {
    const markup = `
    <div class="message">
         <span>${message}</span>
     </div>
  `;
    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
        <ion-icon name="reload-outline"></ion-icon>
      </div>
    `;
    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }
}
