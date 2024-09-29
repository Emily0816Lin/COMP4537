const http = require('http');
let numberOfRequests = 0;

http.createServer(function (request, responce) {
    if (request.url === '/favicon.ico') {
        responce.writeHead(204, { 'Content-Type': 'image/x-icon' });
        responce.end();
        return;
    }

    responce.writeHead(200, {'Content-Type': 'text/plain'});
    responce.write("Response's coming from server ...\n");
    console.log(numberOfRequests + ": Response sent to client\n");
    responce.end('Hello World!');
    numberOfRequests++;
}).listen(8080);
console.log('listening ...');




// let http = require('http');
// let numberOfRequests = 0;

// http.createServer(function (request, response) {
//     request.n = numberOfRequests;
//     console.log('Request number 1st ' + numberOfRequests);

//     response.writeHead(200, {'Content-Type': 'text/plain'});
//     response.write("Response's coming from server ...\n" + numberOfRequests);

//     console.log("Response sent to client\n");
//     response.end();

//     numberOfRequests++;
//     console.log('Request number 2nd ' + numberOfRequests);
// }).listen(8080);

// console.log('listening ...');
