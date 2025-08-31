// 1. Module fs → Baca & Tulis File

const fs = require('fs');

// Tulis file
fs.writeFileSync("hello.txt","Halo dari Nodejs");

// Baca file
const data = fs.readFileSync("hello.txt","utf-8");

console.log("Isi file:", data);
