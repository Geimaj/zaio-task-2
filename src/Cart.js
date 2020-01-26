export default class Cart {
    constructor(){
        this.items = []
        
    }

    addItem(item){
        this.items.push(item)
    }

    getItems(){
        return this.items;
    }

    getTotal(){
        return this.items.map(item => item.price)
            .reduce((prev, current) => prev + current,0)
    }

    reset(){
        this.items = []
    }
}