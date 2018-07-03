const fs = require('fs');
const path = require('path');

function serveStatic(req, res) {
    console.log(req.url);
    /*
      if (req.method === "GET" && req.url === '/client/NotFound.html') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        return res.end();
      }
    */
    if (req.url == '/') req.url = '/index.html';
    let filePath = path.join(__dirname, req.url);
    console.log(filePath);
    fs.readFile(filePath, (err, content) => {
        if (err) {
            console.log(err);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            req.url = './client/404/NotFound.html';
            fs.readFile('./client/404/NotFound.html', (error, cont) => {
                if (error) {
                    console.log(error);
                    res.end('<h1>Ups.. Wrong path! </h1>');
                    return;
                }
                else {
                    console.log('okish');
                    res.end(cont);
                    return;
                }
            });
        }
         else {
            res.statusCode = 200;
            res.setHeader('Content-Type', getType(req.url));
            res.end(content);
        }
    });
}

function getType(fileName) {
    if (/.html/i.test(fileName))
        return 'text/html';
    if (/.css/i.test(fileName))
        return 'text/css';
    if (/.js/i.test(fileName))
        return 'application/javascript';

    return 'text/plain';
}

module.exports = serveStatic;
