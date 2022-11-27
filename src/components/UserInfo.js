export default class UserInfo {
    constructor(user){
        this._name = user.name;
        this._about = user.about;
    }
    
    getUserInfo(){
        const userProfile = {};
        userProfile.name = this._name.textContent.trim();
        userProfile.about = this._about.textContent.trim();

        return userProfile;
    }

    setUserInfo(newUser){ 
        this._name.textContent = newUser.name;
        this._about.textContent = newUser.about;
    }
}