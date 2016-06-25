var superagent = require('superagent');
var cheerio = require('cheerio');
var express = require('express');

var app = express();

app.get('/',function(req,res,next){
    superagent.get('http://cnodejs.org/')
    .end(function (err,sres) {
        if(err){
            return next(err);
        }
        
     var $ = cheerio.load(sres.text);
     console.log($);
     var items = [];
     
     $('#topic_list .topic_title').each(function(idx,element){
         var $element = $(element);
         items.push({
             title:$element.attr('title'),
             href:$element.attr('href'),
             
         });
     });
     
     res.send(items);
    });
});

app.listen(3000,function(){
    console.log('server is running now');
})