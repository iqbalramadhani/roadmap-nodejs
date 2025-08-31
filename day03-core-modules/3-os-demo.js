// 3. Module os → Info Sistem

const os = require('os');

console.log("Platfrom :", os.platform());
console.log("CPU:",os.cpus().length,"core(s)");
console.log("Ram",(os.totalmem() / 1024 / 1024 / 1024).toFixed(2),"GB");
console.log("Disk",(os.freemem() / 1024 / 1024 / 1024).toFixed(2),"GB");



