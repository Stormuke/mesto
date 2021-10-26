export default class Card {
  constructor({data, handleClickImage, handleDeleteCard}, templateSelector, api) {
    this._name = data.name
    this._link = data.link
    this._handleClickImage = handleClickImage
    this._teplateSelector = templateSelector
    this._likes = data.likes
    this._api = api
    this._id = data._id
    this._owner = data.owner
    this._handleDeleteCard = handleDeleteCard
  }

  //метод переключающий кнопку лайк
  _toggleLikeState() {
    if (!this._likeButton.classList.contains('element__like_active')) {
      this._api.addCardLike(this._id)
        .then((data) => {
          this._likeButton.classList.add('element__like_active')
          this._likeCounter.textContent = `${data.likes.length}`
        })
    } else {
      this._api.deleteCardLike(this._id)
        .then((data) => {
          this._likeButton.classList.remove('element__like_active')
          this._likeCounter.textContent = `${data.likes.length}`
        })
    }
  }

  //метод удаления карточки
  removeCard() {
    this._item.remove();
  }

  //установка слушателей на карточку
  _setEventListeners() {
    this._item.querySelector('.element__delete').addEventListener('click', () => this._handleDeleteCard(this))
    this._item.querySelector('.element__like').addEventListener('click', () => this._toggleLikeState(this))
    this._item.querySelector('.element__image').addEventListener('click', () => this._handleClickImage(this._name, this._link))
  }

  //получение темплейта и клонирование
  _getTemplateElement() {
    return document.querySelector(this._teplateSelector).content.querySelector('.element').cloneNode(true)
  }

  //создание карточки
  createCard() {
    this._item = this._getTemplateElement()
    this._likeButton = this._item.querySelector('.element__like')
    this._likeCounter = this._item.querySelector('.element__like-count')
    const image = this._item.querySelector('.element__image')
    this._setEventListeners()

    image.src = this._link
    image.alt = this._name
    this._likeCounter.textContent = this._likes.length
    this._item.querySelector('.element__title').textContent = this._name

    this._api.getUserInfo()
      .then((res) => {
        if (res._id !== this._owner._id) {
          this._item.querySelector('.element__delete').style.display = 'none'
        }

        if (this._likes.find((like) => like._id === res._id)) {
          this._likeButton.classList.add('element__like_active');
        }
      })
    
    return this._item
  }
}
