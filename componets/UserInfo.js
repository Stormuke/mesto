export default class UserInfo {
  constructor({userName, userInfo}) {
    this._userName = userName
    this._userInfo = userInfo
  }

  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userInfo: this._userInfo.textContent
    }
  }

  setUserInfo(data) {
    this._userName.textContent = data.name
    this._userInfo.textContent = data.info
  }
}
