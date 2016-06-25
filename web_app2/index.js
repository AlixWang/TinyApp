var server = require('./server');
var route = require('./router');
var requireHandles = require('./requireHandles');
var handle = {};
handle['/'] = requireHandles.start;
handle['/start'] = requireHandles.start;
handle['/upload'] = requireHandles.upload;
server.start(route.router,handle);
