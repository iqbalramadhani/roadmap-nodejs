const axios = require("axios");
const _ = require("lodash");

// 1. promise
axios.get('https://jsonplaceholder.typicode.com/posts/1')
    .then((res) => {
        console.log("Promise result:", res.data);
    })
    .catch((err) => {
        console.error("Promise error:", err.message);
    });

// 2. async await
(async () => {
    try {
        const res = await axios.get('https://jsonplaceholder.typicode.com/users/1');
        console.log("Await result:", res.data);
    } catch (err) {
        console.error("Await error:", err.message);
    }
})();

// latihan
(async () => {
    try {
        const res = await axios.get('https://jsonplaceholder.typicode.com/posts');

        console.log("=======Latihan: Ambil data posts dari userId 1 dan tampilkan judulnya saja======");

        // Filter hanya userId = 1
        const filtered = _.filter(res.data, (post) => post.userId === 1);

        console.log("Jumlah post userId=1:", filtered.length);
        console.log("Daftar judul:");

        // Loop judul aja
        filtered.forEach((post, i) => {
            console.log(`${i + 1}. ${post.title}`);
        });
    } catch (err) {
        console.error("Await error:", err.message);
    }
})();