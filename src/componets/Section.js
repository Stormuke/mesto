export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._items = items
    this._renderer = renderer
    this._containerSelector = containerSelector
  }

  //отрисовка элемента
  renderItem() {
    this._items.forEach((item) => {
      this._renderer(item)
    })

  }

  //добавление элемента в контейнер
  addItem(element) {
    this._containerSelector.prepend(element);
  }
}
