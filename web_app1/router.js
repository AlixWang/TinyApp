function router(handle,pathName,response,request) {
    if (typeof handle[pathName] === 'function') {
        return handle[pathName](response,request);
    }else{
        //console.log(pathName);
        response.writeHead(404,{"Content-Type":"text/plain"});
        response.write("404 not found");
        response.end();
    }
}
exports.router = router;