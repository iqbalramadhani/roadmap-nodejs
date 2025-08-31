const http = require("http");

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello ini server node js pertaama saya 🚀\n");
});

server.listen(3000,() => {
    console.log("Server running dii http://localhost:3000");
})