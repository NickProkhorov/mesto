export default class Section {
    constructor({renderer},containerSelector) {
        
        this._renderer = renderer;
        this._containerSelector = containerSelector;
    }
    addItem(element){
        this._containerSelector.prepend(element); 
    }

    clear(){
        this._containerSelector.innerHTML = ''; 
      }
    
    renderItems(items){ 
        this.clear();

        items.forEach((item) => { 
            this._renderer(item);
        });
    }
}