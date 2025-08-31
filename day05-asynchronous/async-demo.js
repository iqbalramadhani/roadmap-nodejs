const fs = require("fs");
const util = require("util");

// ubah fs.radFile yang pakai callback jadi pakai promise
const readFile = util.promisify(fs.readFile);

// 1. Callback
fs.readFile("data.txt", "utf-8", (err, data) => {
    if(err){
        console.error("Error pakai callback", err);
    }else{
        console.log("Callback result:", data);
        
    }
});

// 2. Promise
readFile("data.txt", "utf-8")
    .then(data => {
        console.log("Promise result:", data);
    })
    .catch(err => {
        console.error("Promise error:", err);
    });

// 3. Await
(async () => {
    try {
        const data = await readFile("data.txt", "utf-8");
        console.log("Await result:", data);
    } catch (err) {
        console.error("Await error:", err);
    }
})();