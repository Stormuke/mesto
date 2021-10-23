export default class UserInfo {
  constructor({userName, userInfo}) {
    this._userName = document.querySelector(userName)
    this._userInfo = document.querySelector(userInfo)
  }

  //получение данных пользователя
  getUserInfo() {
    const userData = {
      name: this._userName.textContent,
      about: this._userInfo.textContent
    }
    return userData
  }

  //установка новых данных в профиль
  setUserInfo(data) {
    this._userName.textContent = data.name
    this._userInfo.textContent = data.about
  }
}
