var server = require('./server');
var route = require('./router');
var requestHandles = require('./requestHandles');

var handle = {};
handle['/']=requestHandles.start;
handle['/start']=requestHandles.start;
handle['/upload']=requestHandles.upload;
handle['/show']=requestHandles.show;
server.start(route.router,handle);