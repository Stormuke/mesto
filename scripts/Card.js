export default class Card {
  constructor(data, handleClickImage) {
    this._name = data.name
    this._link = data.link
    this._handleClickImage = handleClickImage
  }

  _toggleLikeState(evt) {
    evt.target.classList.toggle('element__like_active')
  }

  _removeCard(evt) {
    evt.target.closest('.element').remove();
  }

  _setEventListeners() {
    this._item.querySelector('.element__delete').addEventListener('click', this._removeCard)
    this._item.querySelector('.element__like').addEventListener('click', this._toggleLikeState)
    this._item.querySelector('.element__image').addEventListener('click', () => this._handleClickImage(this._name, this._link))
  }

  _getTemplateElement() {
    return document.querySelector('.element_template')
      .content.querySelector('.element').cloneNode(true)
  }

  createCard() {
    this._item = this._getTemplateElement()
    this._setEventListeners()

    this._item.querySelector('.element__image').src = this._link
    this._item.querySelector('.element__image').alt = this._name
    this._item.querySelector('.element__title').textContent = this._name

    return this._item
  }
}
