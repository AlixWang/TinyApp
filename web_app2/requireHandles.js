var exec = require("child_process").exec;
function start(path,res){
    exec("ls -alh",function(err,stdout,stderr){
        res.writeHead(200,{"Content-Type":"text/plain"});
        res.write(stdout);
        res.end();
    });
}
function upload(path,res){
    res.writeHead(200,{"Content-Type":"text/plain"});
    res.write(path);
    res.end();
}

exports.start = start;
exports.upload = upload;