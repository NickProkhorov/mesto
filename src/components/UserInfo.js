export default class UserInfo {
    constructor(user){
        this._name = user.name;
        this._about = user.about;
        this._avatar = document.querySelector('.profile__avatar');
    }
    
    getUserInfo(){
        return {
            name: this._name.textContent.trim(),
            about: this._about.textContent.trim()
        };
    }

    setUserInfo(newUserData) { 
        this._name.textContent = newUserData.name;
        this._about.textContent = newUserData.about;
        this._avatar.src = newUserData.avatar;
    }
}