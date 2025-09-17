let userId: string | number;

userId = 101;      // valid
userId = "abc123"; // valid
// userId = true;  // ❌ erro

function printId(id:string | number){
    console.log(`Your ID is ${id}`);
}

printId(101);
printId("abc123");

// Literal Types -> Literal membatasi nilai agar hanya bisa beberapa pilihan saja
type Direction = "up" | "down" | "left" | "right";

function move(dir: Direction) {
    console.log(`Moving ${dir}`);
}

move("up");
move("left");
move("down");
move("right");
// move("back"); ❌ error

// Nullable Types -> Type yang bisa bernilai null
let username : string | null = null;

console.log("Username: ", username);


function greet(name: string | null) {
    if(name === null){
        console.log("Hello guest!");
    }else{
        console.log(`Hello ${name}!`);
    }
}

greet("Iqbal");
greet(null);

// Optional Types -> Type yang bisa bernilai undefined
interface User {
    id: number;
    name: string;
    age?: number;
}

const u1: User = { id: 1, name: "Iqbal" };
const u2: User = { id: 2, name: "Iqbal", age: 25 };

console.log("User 1: ", u1);
console.log("User 2: ", u2);

// pada function bisa menggunakan optional type
function sayHello(name?: string) {
    if(name){
        console.log(`Hello ${name}!`);
    }else{
        console.log("Hello guest!");
    }
}

sayHello("Iqbal");
sayHello();



