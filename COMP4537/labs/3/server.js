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




// const http = require('http');
// const url = require('url');
// const fs = require('fs');
// const { getDate } = require('./modules/utils');
// const messages = require('./lang/en/en');

// // Helper function to handle 404 responses
// const handleNotFound = (res, fileName) => {
//   res.writeHead(404, { 'Content-Type': 'text/html' });
//   res.end(`<p style="color:red;">File "${fileName}" not found!</p>`);
// };

// const server = http.createServer((req, res) => {
//   const parsedUrl = url.parse(req.url, true);
//   const path = parsedUrl.pathname;
//   const query = parsedUrl.query;

//   if (path.startsWith('/COMP4537/labs/3/writeFile')) {
//     const text = query.text || '';

//     // Append the text to file.txt
//     fs.appendFile('file.txt', text + '\n', (err) => {
//       if (err) {
//         res.writeHead(500, { 'Content-Type': 'text/html' });
//         res.end('<p style="color:red;">Error writing to file.</p>');
//       } else {
//         res.writeHead(200, { 'Content-Type': 'text/html' });
//         res.end(`<p style="color:green;">Text "${text}" appended to file.txt</p>`);
//       }
//     });

//   } else if (path.startsWith('/COMP4537/labs/3/readFile')) {
//     const fileName = path.split('/').pop();

//     // Read the content of the specified file
//     fs.readFile(fileName, 'utf8', (err, data) => {
//       if (err) {
//         if (err.code === 'ENOENT') {
//           handleNotFound(res, fileName); // Handle file not found
//         } else {
//           res.writeHead(500, { 'Content-Type': 'text/html' });
//           res.end('<p style="color:red;">Error reading the file.</p>');
//         }
//       } else {
//         res.writeHead(200, { 'Content-Type': 'text/html' });
//         res.end(`<pre>${data}</pre>`); // Display the file content as plain text
//       }
//     });

//   } else if (path.startsWith('/COMP4537/labs/3/getDate')) {
//     const name = query.name || 'Guest';

//     // Set response header for HTML content
//     res.writeHead(200, { 'Content-Type': 'text/html' });

//     // Create a blue-colored response with the greeting and the current date/time
//     const message = `<p style="color:blue">${messages.greeting.replace('%1', name)} ${getDate()}</p>`;

//     // Send the greeting response
//     res.end(message);

//   } else {
//     // Handle undefined routes
//     res.writeHead(404, { 'Content-Type': 'text/html' });
//     res.end('<p style="color:red;">Invalid request!</p>');
//   }
// });


// // server.listen(3000, () => {
// //   console.log('Server is running on port 3000');
// // });

// module.exports = server;



// const http = require('http');
// const url = require('url');
// const fs = require('fs');
// const path = require('path');
// const { getDate } = require('./modules/utils');
// const messages = require('./lang/en/en');

// // Helper function to handle 404 responses
// const handleNotFound = (res, fileName) => {
//   res.writeHead(404, { 'Content-Type': 'text/html' });
//   res.end(`<p style="color:red;">File "${fileName}" not found!</p>`);
// };

// // Define the directory to save/read files
// const tmpDir = '/tmp';

// const server = http.createServer((req, res) => {
//   const parsedUrl = url.parse(req.url, true);
//   const pathName = parsedUrl.pathname;
//   const query = parsedUrl.query;

//   if (pathName.startsWith('/COMP4537/labs/3/writeFile')) {
//     const text = query.text || '';

//     // Append the text to /tmp/file.txt
//     const filePath = path.join(tmpDir, 'file.txt');
//     fs.appendFile(filePath, text + '\n', (err) => {
//       if (err) {
//         res.writeHead(500, { 'Content-Type': 'text/html' });
//         res.end('<p style="color:red;">Error writing to file.</p>');
//       } else {
//         res.writeHead(200, { 'Content-Type': 'text/html' });
//         res.end(`<p style="color:green;">Text "${text}" appended to /tmp/file.txt</p>`);
//       }
//     });

//   } else if (pathName.startsWith('/COMP4537/labs/3/readFile')) {
//     const fileName = pathName.split('/').pop();

//     // Dynamically use the filename from the URL
//     const filePath = path.join(tmpDir, fileName);

//     // Read the content of the specified file
//     fs.readFile(filePath, 'utf8', (err, data) => {
//       if (err) {
//         if (err.code === 'ENOENT') {
//           handleNotFound(res, fileName); // Handle file not found
//         } else {
//           res.writeHead(500, { 'Content-Type': 'text/html' });
//           res.end('<p style="color:red;">Error reading the file.</p>');
//         }
//       } else {
//         res.writeHead(200, { 'Content-Type': 'text/html' });
//         res.end(`<pre>${data}</pre>`); // Display the file content as plain text
//       }
//     });

//   } else if (pathName.startsWith('/COMP4537/labs/3/getDate')) {
//     const name = query.name || 'Guest';

//     // Set response header for HTML content
//     res.writeHead(200, { 'Content-Type': 'text/html' });

//     // Create a blue-colored response with the greeting and the current date/time
//     const message = `<p style="color:blue">${messages.greeting.replace('%1', name)} ${getDate()}</p>`;

//     // Send the greeting response
//     res.end(message);

//   } else {
//     // Handle undefined routes
//     res.writeHead(404, { 'Content-Type': 'text/html' });
//     res.end('<p style="color:red;">Invalid request!</p>');
//   }
// });

// module.exports = server;



const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const { getDate } = require('./modules/utils');
const messages = require('./lang/en/en');

// Helper function to handle 404 responses
const handleNotFound = (res, fileName) => {
  const message = `<p style="color:red;">${messages.fileNotFound.replace('%1', fileName)}</p>`;
  res.writeHead(404, { 'Content-Type': 'text/html' });
  res.end(message);
};

// Define the directory to save/read files
const tmpDir = '/tmp';

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathName = parsedUrl.pathname;
  const query = parsedUrl.query;

  if (pathName.includes('/writeFile')) {
    const text = query.text || '';

    // Append the text to /tmp/file.txt
    const filePath = path.join(tmpDir, 'file.txt');
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

  } else if (pathName.includes('/readFile')) {
    const fileName = pathName.split('/').pop();

    // Dynamically use the filename from the URL
    const filePath = path.join(tmpDir, fileName);

    // Read the content of the specified file
    fs.readFile(filePath, 'utf8', (err, data) => {
      let message;
      if (err) {
        if (err.code === 'ENOENT') {
          handleNotFound(res, fileName); // Handle file not found
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

  } else if (pathName.includes('/getDate')) {
    const name = query.name || 'Guest';

    // Create a blue-colored response with the greeting and the current date/time
    const message = `<p style="color:blue">${messages.greeting.replace('%1', name)} ${getDate()}</p>`;

    // Set response header for HTML content and send the greeting response
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(message);

  } else {
    // Handle undefined routes
    const message = `<p style="color:red;">${messages.invalidRequest}</p>`;
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end(message);
  }
});


server.listen(3000, () => {
  console.log('Server is running on port 3000');
});

module.exports = server;
