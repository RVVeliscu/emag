const fs = require('fs');
const path = require('path');

let users = [];
let connected = false;
let conus = '';

function serveStatic(req, res) {
    /*
        if (req.method === "POST" && req.url === '/insert') {
            res.statusCode = 200;
            //console.log(req);
            var User = {
                name: req.body.name,
                email: req.body.email,
                username: req.body.username,
                password: req.body.password
            };
    
            mongo.connect(url, function (err, db) {
                assert.equal(null, err);
                db.collection('Users').insertOne(User, function (err, result) {
                    if (err)
                        console.log(err);
                    console.log('User created');
                    db.close();
                });
            });
    
            res.redirect('/');
        }
        console.log(req.url);
    */
    if (req.method === "POST" && req.url === '/insert') {

        res.statusCode = 200;

        let data = '';
        //console.log(JSON.parse(fs.readFileSync('./users.json')));
        users = JSON.parse(fs.readFileSync('./users.json'));
        //console.log("users" + users);
        req.on('data', (chunk) => data += chunk)
        req.on('end', () => {
            users.push(JSON.parse(data));
            //console.log(users);
            console.log(JSON.stringify(users));
            fs.writeFile('users.json', JSON.stringify(users));
            res.end('Ok');
        });
        res.end();
        // console.log(users);
        return;
    }

    if (req.method === "POST" && req.url === '/login') {

        res.statusCode = 200;
        let con = '';
        let data = '';
        //console.log(JSON.parse(fs.readFileSync('./users.json')));
        users = JSON.parse(fs.readFileSync('./users.json'));
        //console.log("users" + users);
        req.on('data', (chunk) => data += chunk)
        req.on('end', () => {
            con = JSON.parse(data);
            //console.log(users);
            for (var i = 0; i < users.length(); ++i) {
                if (con.username == users[i].username && con.password == users[i].password) {
                    connected = true;
                    conus = con.username;
                    res.end('Ok');
                    serveStatic('/index/index.html', res);
                }
            }
            if(connected !== true)
                res.end('not ok');
        });
        res.end();
        // console.log(users);
        return;
    }

    if (req.url == '/')
        req.url = './index/index.html';

    let filePath = path.join(__dirname, '/client', req.url);
    console.log(filePath);

    fs.readFile(filePath, (err, content) => {
        if (err) {
            //console.log(err);

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