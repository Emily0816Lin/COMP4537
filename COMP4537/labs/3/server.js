// Disclosure: I used ChatGPT to assist with the content of this assignment.

const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const { getDate } = require('./modules/utils');
const messages = require('./lang/en/en');

// FileHandler class to handle file operations and 404 errors
class FileHandler {
  constructor(tmpDir) {
    this.tmpDir = tmpDir;
  }

  // Function to handle file not found
  handleNotFound(res, fileName) {
    const message = `<p style="color:red;">${messages.fileNotFound.replace('%1', fileName)}</p>`;
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end(message);
  }

  // Function to write text to file
  writeFile(res, text) {
    const filePath = path.join(this.tmpDir, 'file.txt');
    fs.appendFile(filePath, text + '\n', (err) => {
      let message;
      if (err) {
        message = `<p style="color:red;">${messages.errorWriting}</p>`;
        res.writeHead(500, { 'Content-Type': 'text/html' });
      } else {
        message = `<p style="color:green;">${messages.textAppended.replace('%1', text)}</p>`;
        res.writeHead(200, { 'Content-Type': 'text/html' });
      }
      res.end(message);
    });
  }

  // Function to read a file's content
  readFile(res, fileName) {
    const filePath = path.join(this.tmpDir, fileName);
    fs.readFile(filePath, 'utf8', (err, data) => {
      let message;
      if (err) {
        if (err.code === 'ENOENT') {
          this.handleNotFound(res, fileName); // File not found
          return;
        } else {
          message = `<p style="color:red;">${messages.errorReading}</p>`;
          res.writeHead(500, { 'Content-Type': 'text/html' });
        }
      } else {
        message = `<p style="color:green;">${messages.fileNameAndContent.replace('%1', fileName)}</p><pre>${data}</pre>`;
        res.writeHead(200, { 'Content-Type': 'text/html' });
      }
      res.end(message);
    });
  }
}

// APIHandler class to handle API logic
class APIHandler {

  // getDate() function to return a greeting message with the current date
  getDateResponse(res, name) {
    const message = `<p style="color:blue">${messages.greeting.replace('%1', name)} ${getDate()}</p>`;
    res.writeHead(200, {
      'Content-Type': 'text/html',
      'Access-Control-Allow-Origin': '*'
    });
    res.end(message);
  }
}

// Server class to handle requests and create HTTP server
class Server {
  constructor(tmpDir) {
    this.fileHandler = new FileHandler(tmpDir);
    this.apiHandler = new APIHandler();
  }

  // Function to start the HTTP server
  start() {
    const server = http.createServer((req, res) => {
      this.handleRequest(req, res);
    });

    // Uncomment to test locally
    // server.listen(3000, () => {
    //   console.log('Server is running on port 3000');
    // });

    return server;
  }

  // Function to handle different request routes
  handleRequest(req, res) {
    const parsedUrl = url.parse(req.url, true);
    const pathName = parsedUrl.pathname;
    const query = parsedUrl.query;

    if (pathName.includes('/writeFile')) {
      const text = query.text || '';
      this.fileHandler.writeFile(res, text);
    } else if (pathName.includes('/readFile')) {
      const fileName = pathName.split('/').pop();
      this.fileHandler.readFile(res, fileName);
    } else if (pathName.includes('/getDate')) {
      const name = query.name || 'Guest';
      this.apiHandler.getDateResponse(res, name);  // Use APIHandler for API logic
    } else {
      this.invalidRequest(res);
    }
  }

  // Function to handle invalid routes
  invalidRequest(res) {
    const message = `<p style="color:red;">${messages.invalidRequest}</p>`;
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end(message);
  }
}

// Initialize and export the server
const tmpDir = '/tmp';
const appServer = new Server(tmpDir);
module.exports = appServer.start();

