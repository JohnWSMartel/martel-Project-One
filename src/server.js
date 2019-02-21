const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (request, response) => {
    console.log(request.url);
    const parsedUrl = url.parse(request.url);
    
    switch (request.method){
        case 'GET':
            if(parsedUrl.pathname === '/'){
                htmlHandler.getIndex(request, response);
            } else if (parsedUrl.pathname === '/style.css'){
                htmlHandler.getCSS(request, response);
            } else if (parsedUrl.pathname === '/getBirds') {
                jsonHandler.success(request, response);
            } else {
                jsonHandler.notFound (request, response);
            }
            break;
        case 'POST':
            if(parsedUrl.pathname === '/addBird'){
                const res = response;
                
                const body = [];
                
                request.on('error', (err) => {
                    console.dir(err);
                    res.statusCode = 400;
                    res.end();
                });
                
                request.on('data', (chunk) => {
                    body.push(chunk);
                });
                
                request.on('end', () => {
                    const bodyString = Buffer.concat(body).toString();

                    const bodyParams = query.parse(bodyString);

                    jsonHandler.addBird(request, res, bodyParams);
                });
            }
            break;
        default:
            jsonHandler.notFound(request,response);
    }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);