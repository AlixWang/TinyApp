var http = require('http');
var url = require('url');
function start(route,handle) {
   function onRequest(request,response) {
       var pathName = url.parse(request.url).pathname;
       
       route(handle,pathName,response,request);
      
       console.log(pathName);
      
       
   }
   http.createServer(onRequest).listen(8888);
}

exports.start = start;