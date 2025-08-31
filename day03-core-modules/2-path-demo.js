// 2. Module path → Kelola Path File

const path = require('path');

const filePath = "/user/docs/roadmap-nodejs/server.js";

console.log("Folder :",path.dirname(filePath));
console.log("Extensi :",path.extname(filePath));
console.log("Nama file :",path.basename(filePath));


