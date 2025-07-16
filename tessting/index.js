const http = require('http');
// import http from 'http'

// module
// instans
// import -> commonJs, ESType statement
// obj.myFunction()

const server = http.createServer(
    (req, res)=>{
        // console.log("req data:", req.url, req.method)
        if(req.method === "GET" && req.url === '/'){
            res.end("this is home page")
        }else{
            res.end("Route not found")
        }
    }
);

// PORT number
// localhost:5000
server.listen(5000, (err)=>{
    if(err){
        console.log("something went wrong to start server");
    }else{
        console.log("server started on port number:", 5000)
    }
})

