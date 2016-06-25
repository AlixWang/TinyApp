var async = require('async');

var currentCon = 0;
var fetchUrl = function(url,callback){
    
    var delay = parseInt((Math.random()*10000000)%2000,10);
    currentCon++;
    console.log('现在的并发数是 '+currentCon+' 正在抓取的廉洁是 '+url+' 耗时是 '+delay);
    
    setTimeout(function(){
        currentCon--;
        callback(null,url+ ' html content');
    },delay);
};

var urls = [];
for(var i = 0 ; i<30;i++){
    urls.push('http://datasource_'+i);
}

async.mapLimit(urls,5,function(url,callback){
    fetchUrl(url,callback);
},function(err,result){
    console.log('final');
    console.log(result);
});
