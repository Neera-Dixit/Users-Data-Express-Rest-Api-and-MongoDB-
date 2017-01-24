var mongoose=require('mongoose'),
	Schema=mongoose.Schema;

var bookModel=new Schema({
		storeId : {
			type : String
		},
		place : {
			type : String
		}/*,
		readStatus : {
			type: Boolean,
			default : false
		}*/
	});

module.exports = mongoose.model('TescoStores',bookModel);


