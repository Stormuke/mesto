export default class Section {
  constructor({renderer}, containerSelector, api) {
    this._api = api
    this._renderer = renderer
    this._containerSelector = containerSelector
  }

  //отрисовка элемента
  renderItem() {
    this._api.getInitialCards()
      .then((res) => {
        res.reverse().forEach((item) => {
          this._renderer(item)
        })
      })
  }

  //добавление элемента в контейнер
  addItem(element) {
    this._containerSelector.prepend(element);
  }
}
