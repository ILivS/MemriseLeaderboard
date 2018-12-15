var express        =         require("express");
var bodyParser     =         require("body-parser");
var app            =         express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',function(req,res){
  res.end("GET resquest not supported");
});
app.post('/api',function(req,res){
  var cookies=req.body.cookies;
    var session='sessionid_2='+cookies;
  var request = require('request');
 var ress="";
var http = require('http');
var j = request.jar();
var url="https://www.memrise.com/login";
var cookie = request.cookie(session);
j.setCookie(cookie, url);
    var request = request.defaults({ jar : j }) //it will make the session default for every request
   setInterval(function(){ request({
			headers: {

        
     'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.62 Safari/537.36'
	 , 'Content-Type': 'application/json'
           ,"Access-Control-Allow-Origin": "*"
		   ,'origin': 'x-requested-with'

    },
          url:"https://www.memrise.com/ajax/leaderboard/mempals/?period=week&how_many=100",
            method:"GET",
			jar: j
        }, function(error, response, body){
			ress=body;
			res.end(ress);
			}); }, 3000);
	});

app.listen(process.env.PORT || 5000,function(){
  console.log("Started on PORT " + process.env.PORT  );
})



