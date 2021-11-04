const http = require('http');
const fs = require('fs');

const requestListener = function(req, res) {
  console.log(req.method);
  if (req.method == 'POST') {

    let body = '';

    req.on('data', function (data) {
      body += data;
      // Too much POST data, kill the connection!
      if (body.length > 1e6) {
        req.connection.destroy();
      }
    });

    req.on('end', function () {
      console.log(body);
      fs.writeFile('./src/assets/test.txt', body, function (err) {
        if (err) {
          throw err;
        }
        console.log('Saved!');
        res.writeHead(200);
        res.end('Data is successfully saved');
      });
    });
  }
}

const server = http.createServer(requestListener);
server.listen(8099);