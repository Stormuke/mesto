export default class UserInfo {
  constructor({userName, userInfo}) {
    this._userName = document.querySelector(userName)
    this._userInfo = document.querySelector(userInfo)
  }

  //получение данных пользователя
  getUserInfo() {
    const userData = {}
    userData.userName = this._userName.textContent
    userData.userInfo = this._userInfo.textContent
    return userData
  }

  //установка новых данных в профиль
  setUserInfo(data) {
    this._userName.textContent = data.profile_name
    this._userInfo.textContent = data.profile_job
  }
}
