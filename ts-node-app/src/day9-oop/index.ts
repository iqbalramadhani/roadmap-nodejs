class User {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    sayHello(): string {
        return `Hi, my name is ${this.name} and I'm ${this.age} years old.`;
    }
}

const u1 = new User("Iqbal", 25);
console.log(u1.sayHello());




