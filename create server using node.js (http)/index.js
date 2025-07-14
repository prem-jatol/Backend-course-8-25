const http = require('http');

// http -> Module
// ES type -> const http = require('https)
// CommonJS -> import axios from 'axios'
// Express.js -> node package-> req-res cycle
// req.body -> data

const server = http.createServer((req, res)=> {
    console.log("req url:", req.url)
    res.end("hello world")
});

// const server = http.createServer(
//     (req, res) => {
//         if(req.url === '/' && req.method === 'GET'){
//             res.end("this is home page")
//         }else if(req.url === '/edit-user' && req.method === 'POST'){
//             res.end("user eddited")
//         }else if(req.url === '/edit-user' && req.method === 'GET'){
//             res.end("user eddited from get method")
//         }
//     }
// )

server.listen(5000, (err)=> {
    if(err){
        console.log("Error coming..." + err.message);
    }else{
        console.log("server started");
    }
})