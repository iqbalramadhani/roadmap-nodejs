class Animal {
    constructor(public name: string) {}

    makeSound(): void {
        console.log("Some generic sound...");
    }
}

class Dog extends Animal {
    constructor(name: string, public breed: string) {
        super(name);
    }

    // override method
    makeSound(): void {
        console.log("Woof!");
    }
}

const d1 = new Dog("Buddy", "Golden Retriever");
console.log(d1.name);
d1.makeSound();
console.log(d1.breed);

