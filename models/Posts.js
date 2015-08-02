var mongoose = require('mongoose');
var PostSchema = new mongoose.Schema({
	title : String,
	link : String,
	author : String,
	upvotes : {type: Number, default:0},
	comments : [{type: mongoose.Schema.Types.ObjectId , ref: 'Comment'}]
});

module.exports = mongoose.model('Post',PostSchema);
