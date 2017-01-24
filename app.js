var express=require('express'),
	User=require('./db_util'),
	router=require('./routes'),
	bodyParser=require('body-parser');

var app=router.app;

var port = process.env.PORT || 3078;

app.use("/",router.appRouter);

app.listen(port,function(){
	console.log("Server listening at "+port);
});
