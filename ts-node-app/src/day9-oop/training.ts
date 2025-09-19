import { log } from "console";

class Person {
    name: string
    age:number

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    instuction(): string {
        return `Hi, my name is ${this.name} and I'm ${this.age} years old.`;
    }
}

class Employee extends Person {
    private salary: number;

    constructor(name: string, age: number, salary: number) {
        super(name, age);
        this.salary = salary;
    }

    getSalary(): string {
        return `${this.name} get salary ${this.salary}`;
    }
}

const person1 = new Person("Iqbal", 25);
console.log(person1.instuction());

const employee1 = new Employee("Sakinah", 25, 1000);
console.log(employee1.instuction());

console.log(employee1.getSalary());

