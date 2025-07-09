const http = require('http');
const fs = require('fs'); // file system
const url = require('url'); // url

// ES module, CommonJs (import export system)

// Create, Read, Update, Delete
// nodemon -> package npm (old=> node index.js, advance=> nodemon index)
// 1. cmd (run as administrate) (window key -> search(cmd), 2. npm install -g nodemon )

// File where data will be stored
const DATA_FILE = './data.json';

// js -> Asynchronus / Synchronus
// writeFile => await fs.writeFile(fath_name, data, (err)=> {if(err) console.log(err)})
// writeFileSync => fs.writeFileSync(fath_name, data)

// Helper: Read Data
function readData() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]));
  }
  const data = fs.readFileSync(DATA_FILE);
  return JSON.parse(data);
}

// Helper: Write Data
function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// Server
const server = http.createServer((req, res) => {
  // http://localhost:5000/admin/user_password?id=34234&email=name@email.com
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;

  // Set common headers
  res.setHeader('Content-Type', 'application/json');

  // Route: Get All Data
  if (method === 'GET' && path === '/items') {
    const items = readData();
    res.writeHead(200);
    res.end(JSON.stringify(items));
  }

  // Route: Create New Item
  // button.eventListner('click', ()=>{})
  else if (method === 'POST' && path === '/items') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });    

    req.on('end', () => {
      const newItem = JSON.parse(body);
      const items = readData();
      newItem.id = Date.now(); // Unique ID using timestamp
      items.push(newItem);
      writeData(items);
      res.writeHead(201);
      res.end(JSON.stringify({ message: 'Item Created', item: newItem }));
    });
  }

  // Route: Update Item by ID
  else if (method === 'PUT' && path.startsWith('/items/')) {
    const id = parseInt(path.split('/')[2]);
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', () => {
      const updatedItem = JSON.parse(body);
      const items = readData();
      const index = items.findIndex(item => item.id === id);

      if (index !== -1) {
        items[index] = { ...items[index], ...updatedItem };
        writeData(items);
        res.writeHead(200);
        res.end(JSON.stringify({ message: 'Item Updated', item: items[index] }));
      } else {
        res.writeHead(404);
        res.end(JSON.stringify({ message: 'Item Not Found' }));
      }
    });
  }

  // Route: Delete Item by ID
  else if (method === 'DELETE' && path.startsWith('/items/')) {
    const id = parseInt(path.split('/')[2]);
    const items = readData();
    const newItems = items.filter(item => item.id !== id);

    if (items.length === newItems.length) {
      res.writeHead(404);
      res.end(JSON.stringify({ message: 'Item Not Found' }));
    } else {
      writeData(newItems);
      res.writeHead(200);
      res.end(JSON.stringify({ message: 'Item Deleted' }));
    }
  }

  // Route: Invalid
  else {
    res.writeHead(404);
    res.end(JSON.stringify({ message: 'Route Not Found' }));
  }
});

// Listen on port 5000
server.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
