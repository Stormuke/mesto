export default class UserInfo {
  constructor({userName, userInfo, userAvatar}) {
    this._userName = document.querySelector(userName)
    this._userInfo = document.querySelector(userInfo)
    this._userAvatar = document.querySelector(userAvatar)
  }

  //получение данных пользователя
  getUserInfo() {
    return {
      name: this._userName.textContent,
      about: this._userInfo.textContent
    }
  }

  //установка новых данных в профиль
  setUserInfo(data) {
    this._userName.textContent = data.name
    this._userInfo.textContent = data.about
  }

  setUserAvatar(data) {
    this._userAvatar.src = data.avatar
  }
}
