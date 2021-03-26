var http = require("http");

http
  .createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello World\n");
  })
  .listen(8081);

console.log("Server running at http://127.0.0.1:8081/");

console.log(__filename);
console.log(__dirname);

function printHello() {
  console.log("Hello, World!");
}

// Now call above function after 2 seconds
setTimeout(printHello, 2000);
setInterval(printHello, 2000);
