var http = require('http');
var url = require('url');
function start(router,handle){

    function onRespons(req,res){
        var pathname = url.parse(req.url).pathname;
        router(pathname,handle,res);
        
    }
    http.createServer(onRespons).listen(8000);
}

exports.start = start;
