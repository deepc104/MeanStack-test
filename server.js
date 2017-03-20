var express        = require('express');
//var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var FB 			   = require('fb');
var app            = express();
var path           = require('path');
var db = require('./config/db');
var fbapp = require('./config/fb');
var port = process.env.PORT || 3000;

//mongoose.connect(db.url);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

app.listen(port);

app.post("/api/fbstats", getpagestats);

require('./app/routes')(app); // pass our application into our routes

function getpagestats(request, response){
	var pid = request.body.pid;
	var pdata = [];
	
	if(!pid || pid == ""){
	   pdata = {error : 'Please enter FB page username or ID'};
	   response.json(pdata);
	   return;
	}
	
	FB.api('oauth/access_token', {
		client_id: fbapp.client_id,
		client_secret: fbapp.client_secret,
		grant_type: 'client_credentials'
	}, function (res) {
		if(!res || res.error) {
			console.log(!res ? 'error occurred' : res.error);
			return;
		}
		var accessToken = res.access_token;
		FB.api(pid+'/?access_token='+accessToken+'&fields=fan_count,name,id,posts.limit(10){id,message,link,likes.limit(1000){id},comments.limit(1000){id},shares}', function (fbres) {
		if(!fbres || fbres.error) {
		   //console.log(!fbres ? 'error occurred' : fbres.error);
		   pdata = {error : 'Please enter valid FB page username or ID'};
		   response.send(pdata);
		   return;
		}
		else{
			//get all data
			pdata = {
				pageid    : fbres.id,
				pname     : fbres.name,
				likes     : fbres.fan_count,
				posts	  : [] 
			}	
			if(fbres.hasOwnProperty('posts')){
				var postcnt = fbres.posts.data.length;
				for(var i=0; i< postcnt; i++){
				   var posts = [];		
				   if(fbres.posts.data[i].hasOwnProperty('message')){
					 var postmsg = fbres.posts.data[i].message;
				   }else{ 
					  var postmsg = '';
				   }
				   
				   if(fbres.posts.data[i].hasOwnProperty('likes')){
					   var postlikes = fbres.posts.data[i].likes.data.length;
				   }else{ 
					  var  postlikes = 0;
				   }
				   
				   if(fbres.posts.data[i].hasOwnProperty('shares')){
					   var postshares = fbres.posts.data[i].shares.count
				   }else{ 
					  var postshares = 0;  
				   }
				   
				   if(fbres.posts.data[i].hasOwnProperty('comments')){
					   var postcomments = fbres.posts.data[i].comments.data.length;
				   }else{ 
					   var postcomments = 0;
				   }
				   if(fbres.posts.data[i].hasOwnProperty('link')){
					   var postlink = fbres.posts.data[i].link;
				   }else{ 
						var postlink = "";
				   }
				   
				   pdata.posts.push({
					   postmsg:postmsg,
					   postlikes:postlikes,
					   postshares:postshares,
					   postlink:postlink,
					   postcomments:postcomments
				   });
				}
			}else{
				var postcnt = '0';
			}

			pdata.postcnt =  postcnt;		
			response.json(pdata); 
		}
		});
	});
}