export default class Card {
  constructor({data, handleClickImage, handleDeleteCard, handleLikeCard}, templateSelector, userId) {
    this._name = data.name
    this._link = data.link
    this._likes = data.likes
    this._id = data._id
    this._owner = data.owner
    this._userId = userId
    this._handleClickImage = handleClickImage
    this._handleDeleteCard = handleDeleteCard
    this._handleLikeCard = handleLikeCard
    this._teplateSelector = templateSelector
  }


  getCardId() {
    return this._id
  }

  //метод удаления карточки
  removeCard() {
    this._item.remove()
    this._item = null
  }

  //установка слушателей на карточку
  _setEventListeners() {
    this._item.querySelector('.element__delete').addEventListener('click', () => this._handleDeleteCard(this))
    this._item.querySelector('.element__like').addEventListener('click', () => this._handleLikeCard(this))
    this._item.querySelector('.element__image').addEventListener('click', () => this._handleClickImage(this._name, this._link))
  }

  //получение темплейта и клонирование
  _getTemplateElement() {
    return document.querySelector(this._teplateSelector).content.querySelector('.element').cloneNode(true)
  }

  //переключение видимости корзины
  _toggleTrashButton() {
    if (this._userId !== this._owner._id) {
      this._item.querySelector('.element__delete').style.display = 'none'
    }
  }

  //переключение лайков
  _toggleLikeState() {
    if (this._checkUserLike()) {
      this.setLike()
    } else {
      this.unsetLike()
    }
  }

  //создание карточки
  createCard() {
    this._item = this._getTemplateElement()
    this._likeButton = this._item.querySelector('.element__like')
    this._likeCounter = this._item.querySelector('.element__like-count')
    const image = this._item.querySelector('.element__image')
    this._setEventListeners()
    this._toggleTrashButton()
    this._toggleLikeState()

    this._likeCounter.textContent = this._likes.length
    image.src = this._link
    image.alt = this._name
    this._item.querySelector('.element__title').textContent = this._name

    return this._item
  }


  setLike() {
    this._likeButton.classList.add('element__like_active')
    this.isLiked = true
  }

  unsetLike() {
    this._likeButton.classList.remove('element__like_active')
    this.isLiked = false
  }

  updateLikes(data) {
    this._likeCounter.textContent = data.length
  }

  _checkUserLike() {
    return this._likes.some((item) => item._id === this._userId)
  }

}
