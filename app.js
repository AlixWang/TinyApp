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

app.get('/eventproxy',function(req,res,next){
	superagent.get(cnodeUrl)
	.end(function(err,res){
		if(err){
			return console.log(err);
		}
		var topicUrls = [];
		var $ = cheerio.load(res.text);
		
		//get the index page url
		$('#topic_list .topic_title').each(function(idx,element){
			var $element = $(element);
			
			var href = url.resolve(cnodeUrl,$element.attr('href'));
			topicUrls.push(href);
		});
		
		console.log(topicUrls);
		
		
		var ep = new eventproxy();
		
		ep.after('topic_html',topicUrls.length,function(topics){
			topics = topics.map(function(topicPair){
				var topicUrl = topicPair[0];
				var topicHtml = topicPair[1];
				var $ = cheerio.load(topicHtml);
				return ({
					title:$('.topic_full_title').text().trim(),
					href:topicUrl,
					comment1:$('reply_content').eq(0).text().trim()
				});
				
			});
			console.log('final');
			console.log(topics);
			
		});
		
		topicUrls.forEach(function(topicUrl){
			
			superagent.get(topicUrl)
				.end(function(err,res){
					console.log('fetch'+topicUrl+'successful');
					ep.emit('topic_html',[topicUrl,res.text]);
				});
			
		});
		
		
		
		
		
	});
});


app.get('/async',function(req,res,next){
	
	var concurrencyCount = 0;
	var fetchUrl = function(url,callback){
		concurrencyCount++;
		console.log("now the count is ",concurrencyCount,'the catch file is',url);
		superagent.get(url)
		.end(function(err,res){
			console.log('fetch '+url+'successful');
			concurrencyCount++;
			callback(null,url);
		});		
	};
	
	var urls = [];
	superagent.get(cnodeUrl)
		.end(function(err,res){
			if(err){
				return console.log(err);
			}
			var $ = cheerio.load(res.text);
			$('#topic_list .topic_title').each(function(idx,element){
				var $element = $(element);
				var href = url.resolve(cnodeUrl,$element.attr('href'));
				urls.push(href);
			});
			
			async.mapLimit(urls,5,function(url,callback){
				
				fetchUrl(url,callback);
				
				
			},function(err,resault){
				
				console.log('final');
				console.log(resault);
				
			});
		});
	
});