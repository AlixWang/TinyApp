// require respondent
var express = require("express");
var superagent = require("superagent");
var cheerio = require();
var url = require("url");
var eventproxy = require("eventproxy");
var async = require("async");
// creat express examples

var app = express();

app.listen(3000,function(req,res){
	console.log('app is running as port 3000');
});

var cnodeUrl = 'http://cnodejs.org';
app.get('/',function(req,res,next){
	// use superagent to catch http://cnodejs.org
	superagent.get(cnodeUrl)
		.end(function(err,sres){
			// dear with error
			if(err){
				return next(arr);
			}
			
			// sres.text will load the html of cnodejs site , thanslate it to cheerio.load 
			// we can get a jquery API , we uausly name it's '$'
			// next is the jqurey content
			var $ = cheerio.load(sres.text);
			var items = [];
			$('#topic_listen .topic_title').eatch(function(idx,element){
				var $element = $(element);
				items.push({
					title:$element.attr('title');
					herf:$element.attr('herf');
					link:url.resolve(cnodeUrl,$element.attr('herf'));
					
				});
			});
		});
	
	
}) ;

