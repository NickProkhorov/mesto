import { profileName, profileJob, inputName, inputJob } from '../utils/constants.js';

export default class UserInfo {
    constructor({name, job}){
        this._name = name;
        this._job = job;
        this._inputName = inputName;
        this._inputJob = inputJob;
    }
    
    getUserInfo(){ 
        this._inputName.value = this._name.textContent.trim();
        this._inputJob.value = this._job.textContent.trim();
    }

    setUserInfo(){ 
        profileName.textContent = this._inputName.value;
        profileJob.textContent = this._inputJob.value;
    }
}