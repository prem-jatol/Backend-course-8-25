// npm init -y
const http = require("http");
const fs = require("fs"); // file system
const url = require("url");

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

// const server = http.createServer((req, res) => {
//   //   console.log(req.url, req.method);
//   const parsUrl = url.parse(req.url, true);
//   const pathname = parsUrl.pathname;
//   const method = req.method;

//   if (method === "GET" && pathname === "/about") {
//     const data = fs.readFileSync(file_path, 'utf-8');
//     return res.end(data);
//   }else if(method === "GET" && pathname === "/contact-us"){
//     // const data = fs.readFileSync('./public/contact-us.html');
//     return res.end("Contact us page");
//   }else if(method === "GET" && pathname === "/services"){
//     const data = fs.readFileSync('./public/service.html');
//     return res.end(data)
//   }
//   res.end("Route not found");
// });

const file_path = "./public/data.json";

const readData = () => {
  if (!fs.existsSync(file_path)) {
    fs.writeFileSync(file_path, JSON.stringify([]))
  }
  const data = fs.readFileSync(file_path);
  return JSON.parse(data);
}

const writeData = (data) => {
  fs.writeFileSync(file_path, JSON.stringify(data, null, 2));
}

const server = http.createServer(
  (req, res) => {
  const parsUrl = url.parse(req.url, true);
  const pathname = parsUrl.pathname;
  const method = req.method;
  res.setHeader("Content-Type", "application/json")

  if (method === "GET" && pathname === '/items') {
    const data = readData();
    res.writeHead(200);
    res.end(JSON.stringify(data))
  }

  else if (method === "POST" && pathname === '/items') {
    let body = "";
    req.on('data', (chunk) => {
      // body += chunk;
      body = body + chunk;
    });


    req.on('end', () => {
      let items = readData();
      const data = JSON.parse(body);
      data.id = Date.now();
      // const newData = items.push(data)
      // true -> 1; false-> 0
      items.push(data);
      // console.log("data:", data, items, newData);

      res.writeHead(201);
      writeData(items)
      res.end(JSON.stringify({ msg: "item added", }))
    })
  }

  else if (method === "PUT" && pathname.startsWith("/items/")) {
    const array = pathname.split("/");
    const idStr = array[2];
    const id = parseInt(idStr);

    let body = "";
    req.on('data', (chunk) => {
      body += chunk;
    })

    req.on("end", ()=>{
      const dataForUpdate = JSON.parse(body);
      const items = readData();
      const index = items.findIndex((item)=> item.id === id)
      const oldData = items[index];
      items[index] = {
        ...oldData,
        ...dataForUpdate
      }
      // console.log("ol data:", oldData);
      writeData(items)
      res.writeHead(200);
      res.end(JSON.stringify({msg: "item updated", dataForUpdate}))
    })
  }

  else if(method === "DELETE" && pathname.startsWith("/items/")){
    const array = pathname.split("/");
    const idStr = array[2];
    const id = parseInt(idStr);
    
    const items = readData();
    const newArr = items.filter(
      (item)=>{
        if(item.id !== id) {
          return item;
        }
      }
    )
    writeData(newArr)
    
    res.end("item deleted")
  }

  else {
    res.end("route not found")
  }
})


server.listen(5000, (err) => {
  if (err) {
    console.log("error coming:", err.message);
  } else {
    console.log("server started on port 5000");
  }
});

// Contact us
// Services
// switch (pathname){
// case : "/about"
// break res.end(data)
// finally return res.end("route not found")
// }

// GET, POST, PUT, PATCH, DELETE

// {
//   name: "watch2",
//   price: 2000,
//   name: "Speaker",
//   price: 8000
// }