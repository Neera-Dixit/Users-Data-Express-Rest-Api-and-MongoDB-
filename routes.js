var express=require('express'),
	User=require('./db_util'),
	bodyParser=require('body-parser');

var app=express();

var appRouter=express.Router();

var findByIdMiddleware=function(req,res,next){
	User.findById(req.params.userId, function(err, user) {
  			if (err){
  				res.status(500).send(err);
  			}
  			else if(user){
  				req.user=user;
  				next();
  			}
  			else{
  				res.status(404).send("book not found");
  			}
			
		});
};
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

appRouter.use("/users/:userId",findByIdMiddleware);

appRouter.route("/users")
	.get(function(req,res){

		var query={};

		if(req.query.mobileNo){
			query.mobileNo=req.query.mobileNo;
		}

		User.find(query, function(err, user) {
  			if (err){
  				res.status(500).send(err);
  			}
  			else{
  				//res.json(user);
  				//console.log("User Data found : "+user);

  				var respArr=[];
  				user.forEach(function(element,index){
  					var userElem=element.toJSON();
  					userElem.link={};
  					userElem.link.self="http://"+req.headers.host+"/users/"+userElem._id;//HATEOAS hypermedia as the engine of application state
  					respArr.push(userElem);
  				});

  				res.json(respArr);
  				console.log("User Data found : "+user);

  			}
			
		});
	})
	.post(function(req,res){
		var user=new User(req.body);
		user.save();
		console.log(user);
		res.status(201).send(user);
	});

appRouter.route("/users/:userId")
	.get(function(req,res){	
			res.json(req.user);
  			console.log("User Data found : "+req.user);
	})
	.put(function(req,res){
  				var reqBody=req.body;
  				req.user.name=reqBody.name;
  				req.user.sex=reqBody.sex;
  				req.user.mobileNo=reqBody.mobileNo;
  				req.user.createdDate=reqBody.createdDate;
  				req.user.save();
  				res.status(201).send(req.user);
	})
	.patch(function(req,res){
		for(var p in req.body){
			req.user[p]=req.body[p];
		}
		req.user.save(function(err){
			if(err){
				res.status(500).send("Internal server error");
			}
			else{
				res.status(201).send(req.user);
			}
		});
  		
	})
	.delete(function(req,res){
		req.user.remove(function(err){
			if(err){
				res.status(500).send("Internal server error");
			}
			else{
				res.status(204).send("deleted successfully");
			}
		})
	});

exports.appRouter=appRouter;
exports.app=app;
