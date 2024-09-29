// // Disclosure: I used ChatGPT to assist with the content of this assignment.

// // /api/server.js
// const http = require('http');
// const url = require('url');
// const { getDate } = require('./modules/utils');
// const messages = require('./lang/en/en');

// const server = http.createServer((req, res) => {
//   const queryObject = url.parse(req.url, true).query;
//   const name = queryObject.name || 'Guest';

//   // Set response header for HTML content
//   res.writeHead(200, { 'Content-Type': 'text/html' });
//   // res.write("Response's coming from server ...\n");
//   console.log('Response sent to client\n');

//   // Create a blue-colored response
//   const message = `<p style="color:blue">${messages.greeting.replace('%1', name)} ${getDate()}</p>`;

//   // Send response
//   res.end(message);
//   // res.end('Hello!');
// });

// // Listen on port 3000
// // server.listen(3000, () => {
// //   console.log('Server is running on port 3000');
// // });

// module.exports = server;




const http = require('http');
const url = require('url');
const fs = require('fs');
const { getDate } = require('./modules/utils');
const messages = require('./lang/en/en');

// Helper function to handle 404 responses
const handleNotFound = (res, fileName) => {
  res.writeHead(404, { 'Content-Type': 'text/html' });
  res.end(`<p style="color:red;">File "${fileName}" not found!</p>`);
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const query = parsedUrl.query;

  if (path.startsWith('/writeFile')) {
    const text = query.text || '';

    // Append the text to file.txt
    fs.appendFile('file.txt', text + '\n', (err) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end('<p style="color:red;">Error writing to file.</p>');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`<p style="color:green;">Text "${text}" appended to file.txt</p>`);
      }
    });

  } else if (path.startsWith('/readFile')) {
    const fileName = path.split('/').pop();

    // Read the content of the specified file
    fs.readFile(fileName, 'utf8', (err, data) => {
      if (err) {
        if (err.code === 'ENOENT') {
          handleNotFound(res, fileName); // Handle file not found
        } else {
          res.writeHead(500, { 'Content-Type': 'text/html' });
          res.end('<p style="color:red;">Error reading the file.</p>');
        }
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`<pre>${data}</pre>`); // Display the file content as plain text
      }
    });

  } else if (path.startsWith('/getDate')) {
    const name = query.name || 'Guest';

    // Set response header for HTML content
    res.writeHead(200, { 'Content-Type': 'text/html' });

    // Create a blue-colored response with the greeting and the current date/time
    const message = `<p style="color:blue">${messages.greeting.replace('%1', name)} ${getDate()}</p>`;

    // Send the greeting response
    res.end(message);

  } else {
    // Handle undefined routes
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<p style="color:red;">Invalid request!</p>');
  }
});



server.listen(3000, () => {
  console.log('Server is running on port 3000');
});

module.exports = server;
