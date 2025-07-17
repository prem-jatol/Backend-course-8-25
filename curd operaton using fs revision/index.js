const http = require("http");
const fs = require("fs"); // file system
const url = require("url");
const file_path = "./public/about.html";

// const data = fs.readFileSync(file_path, 'utf-8')

// fs.readFileSync()

// fs.unlink
// fs.mkdir

// const dataSync = fs.writeFileSync(file_path, JSON.stringify([]));

// fs.writeFile(file_path, JSON.stringify([{name: "amrit", email: "amrit@email.com"}]), (err)=>{})

// console.log(JSON.parse(data));

// console.log("hello this is calling first");

// fs.writeFileSync()

// const readFile = ()=>{

// }

// const writeFile = (data)=>{

// }

const server = http.createServer((req, res) => {
  //   console.log(req.url, req.method);
  const parsUrl = url.parse(req.url, true);
  const pathname = parsUrl.pathname;
  const method = req.method;

  if (method === "GET" && pathname === "/about") {
    const data = fs.readFileSync(file_path, 'utf-8');
    return res.end(data);
  }
  res.end("Route not found");
});

server.listen(5000, (err) => {
  if (err) {
    console.log("error coming:", err.message);
  } else {
    console.log("server started on port 5000");
  }
});
