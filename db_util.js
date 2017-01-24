var	mongoose=require('mongoose'),
	Schema=mongoose.Schema;

var db= mongoose.connect('mongodb://localhost/mongodb_nodejs');

if(db){
console.log("Connection successfully");
}
else{
console.log("Connection failed");
}

var userSchema = new Schema({
  name: String,
  sex : String,
  mobileNo : Number,
  createdDate : Date
});

var User = mongoose.model('user',userSchema);

module.exports=User;
