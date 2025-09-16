// OBJECT
let user : { name: string, age: number, isActive: boolean } = {
    name: "Iqbal",
    age: 25,
    isActive: true
};

console.log("User: ", user);

// function dengan tipe parameter & return
function greet(name:string):string{
    return `Hello ${name}!`;
}

console.log(greet("Iqbal"));

// function dengan parameter optiopnal
function multiply(a:number, b?:number):number{
    return b ? a * b : a * a;
}

console.log("Multiply (5): ", multiply(2));
console.log("Multiply (5,3): ", multiply(2, 3));


// FUNCTION expression dengan arrow function
const add = (x:number, y:number):number => x + y;
console.log("Add (5,3): ", add(5, 3));

