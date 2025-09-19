// optional param
function greet(name: string, age?: number): string {
  if (age) {
    return `Hello ${name}, you are ${age} years old.`;
  }
  return `Hello ${name}`;
}

console.log(greet("Iqbal"));       // Hello Iqbal
console.log(greet("Iqbal", 27));   // Hello Iqbal, you are 27 years old.

// default param
function multiply(a: number, b: number = 2): number {
  return a * b;
}

console.log(multiply(5));    // 10
console.log(multiply(5, 3)); // 15

// Rest Parameters -> Parameter rest adalah parameter yang bisa menerima beberapa nilai. Parameter ini bisa digunakan untuk menerima beberapa nilai dari sebuah fungsi.
function sumAll(...numbers: number[]): number {
  return numbers.reduce((acc, curr) => acc + curr, 0);
}

console.log(sumAll(1, 2, 3, 4, 5)); // 15

// Function Overloading -> Function Overloading adalah cara untuk mendefinisikan beberapa fungsi dengan nama yang sama, tetapi dengan parameter yang berbeda.
function getLength(value: string): number;
function getLength(value: any[]): number;
function getLength(value: any): number {
  return value.length;
}

console.log(getLength("Hello"));     // 5
console.log(getLength([1, 2, 3]));   // 3


// Function overloading
function calculate(a: number, b: number): number;
function calculate(a: string, b: string): string;
function calculate(...args: number[]): number;
function calculate(...args: any[]): any {
  if (typeof args[0] === "number" && typeof args[1] === "number" && args.length === 2) {
    // 2 angka → jumlahkan
    return args[0] + args[1];
  } else if (typeof args[0] === "string" && typeof args[1] === "string" && args.length === 2) {
    // 2 string → gabung
    return args[0] + args[1];
  } else if (typeof args[0] === "number" && args.length > 2) {
    // lebih dari 2 angka → total
    return args.reduce((acc, curr) => acc + curr, 0);
  }
  throw new Error("Invalid arguments");
}

// ✅ Testing
console.log(calculate(5, 10));             // 15
console.log(calculate("Hello ", "World")); // "Hello World"
console.log(calculate(1, 2, 3, 4, 5));     // 15
