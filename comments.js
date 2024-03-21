// Create web server
// Run server with node
// Open browser and go to http://localhost:3000

var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var comments = require('./comments');

var server = http.createServer(function(req, res){
  var pathname = url.parse(req.url).pathname;
  console.log('Request for ' + pathname + ' received.');
  if (pathname === '/'){
    fs.readFile('index.html', function(err, data){
      if (err){
        console.log(err);
        res.writeHead(500, {'Content-Type': 'text/html'});
        res.end('Error: ' + err);
      }
      else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
      }
    });
  }
  else if (pathname === '/comment'){
    var query = url.parse(req.url, true).query;
    comments.add(query.comment);
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Comment added');
  }
  else if (pathname === '/get'){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(comments.get());
  }
  else {
    fs.readFile(path.join(__dirname, pathname), function(err, data){
      if (err){
        console.log(err);
        res.writeHead(500, {'Content-Type': 'text/html'});
        res.end('Error: ' + err);
      }
      else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
      }
    });
  }
});

server.listen(3000);
console.log('Server running at http://localhost:3000/');

