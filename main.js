//just adding some stuff
const http = require('http');
const fs = require('fs');

var routes = require('./router.js');


//setting the route to the server 
const hostname = '127.0.0.1';
const port = 3000;

//adding the piece that redirects us to f=different pages
const router = require('./router');
const server = http.createServer(router);

//bringing it to life
server.listen(port, hostname, () => {
  console.log(`You can acces our website at http://${hostname}:${port}/`);
});
