export default class Section {
  constructor({renderer}, containerSelector) {
    this._renderer = renderer
    this._containerSelector = containerSelector
  }

  //отрисовка элемента
  renderItem(data) {
    data.reverse().forEach((item) => {
      this._renderer(item)
    })
  }

  //добавление элемента в контейнер
  addItem(element) {
    this._containerSelector.prepend(element);
  }
}
