var http= require("node:http");
const port = 3000;
const server = http.createServer((req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.end('Hello World from Node.js Web Server!\n');
});
server.listen(port);