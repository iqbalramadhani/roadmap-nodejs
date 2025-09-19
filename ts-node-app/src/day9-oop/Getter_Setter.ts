class Product {
    private _price: number = 0;

    get price(): number {
        return this._price;
    }

    set price(value: number){
        if(value < 0){
            throw new Error("Price cannot be negative!");
        }

        this._price = value;
    }
}

const p  = new Product();
p.price = 500;
console.log(p.price);
