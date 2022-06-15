const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')

const server = http.createServer((req, res) => {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);
  
const someFunction = (fileName, fileType) => {
  fs.readFile(fileName, function(err, data) {
    res.writeHead(200, {'Content-Type': fileType});
    res.write(data);
    res.end();
  })
}

// const someOtherFunction = (someName, someStatus, someCurrentOccupation) => {
//   res.writeHead(200, {'Content-Type': 'application/json'});
//         const objToJson = {
//           name: someName,
//           status: someStatus,
//           currentOccupation: someCurrentOccupation

//         }
//         res.end(JSON.stringify(objToJson));
// }
const someOtherFunction = (someFlip) => {
  res.writeHead(200, {'Content-Type': 'application/json'});
        const objToJson = {
          flip: someFlip,
        }
        res.end(JSON.stringify(objToJson));
}

switch (page){
  case '/':
    someFunction('index.html', 'text/html')
    break;
  case '/otherpage':
    someFunction('otherpage.html', 'text/html')
    break;
  case '/otherotherpage':
    someFunction('otherotherpage.html', 'text/html')
    break;
  case '/api':   
    if('student' in params){
      if(params['student']== 'flip'){
        let flipResult = Math.random() 
        if(flipResult < 0.5){
          someOtherFunction('heads')
        }else{
          someOtherFunction('tails')
        }
        // someOtherFunction('leon', 'Boss Man', 'Baller')

      }
      // else if(params['student'] != 'leon'){
      //   someOtherFunction('dylan', 'dylan', 'dylan')

      // }
    }
    break;
  case '/css/style.css':
    fs.readFile('css/style.css', function(err, data) {
      res.write(data);
      res.end();
    });
    break;
  case '/js/main.js':
    someFunction('js/main.js', 'text/javascript')
    break;
  default:
    figlet('404!!', function(err, data) {
      if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
      }
      res.write(data);
      res.end();
    });
    break;
}
 });

server.listen(8000);
