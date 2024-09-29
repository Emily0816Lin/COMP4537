// Disclosure: I used ChatGPT to assist with the content of this assignment.

// import messages from '../lang/en/en.js';

// /api/server.js
const http = require('http');
const url = require('url');
// const { getDate } = require('./modules/utils');
// const messages = require('./lang/en/en');

const server = http.createServer((req, res) => {
  const queryObject = url.parse(req.url, true).query;
  const name = queryObject.name || 'Guest';

  // Set response header for HTML content
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write("Response's coming from server ...\n");
  console.log('Response sent to client\n');

  // Create a blue-colored response
  // const message = `<p style="color:blue">${messages.greeting.replace('%1', name)} ${getDate()}</p>`;

  // Send response
  // res.end(message);
  res.end('Hello World!');
});

// Listen on port 3000
// server.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });

module.exports = server;
