// const PI=3.14
// let r=10;
// let area = r*PI*PI;
// console.log('area:', area);
// console.log(area);


// const mo = require('./modules/math');
// console.log(mo.area(2));


const http = require('http');
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Hello World!');
}).listen(8080);

console.log('Server started on http://localhost:8080');



