function router(path,handle,res){
    if (typeof handle[path] == 'function') {
        handle[path](path,res);
    }else{
        res.writeHead(404,{"Content-Type":"text/plain"});
        res.write("sorry the page is note found ");
        res.end();
    }
}

exports.router = router;
