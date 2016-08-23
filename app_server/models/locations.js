//Require mongoose
var mongoose 	= require('mongoose');
require('./locations');

//reviewSchema created and added as a subducument of the locationSchema
var reviewSchema = new mongoose.Schema({
	author: String,
	rating: {type: Number, required: true, min: 0, max: 5},
	reviewText: String,
	createdOn: {type: Data, "default": Date.now}
});

//timeSchema created and added as a subducument of the locationSchema
var openingTimeSchema = new mongoose.Schema({
	days: {type: String, required: true},
	opening: String,
	closing: String,
	closed: {type: Boolean, required: true}
});

//Defined data schema for locations and parent document containing subdocuments above
var locationSchema = new mongoose.Schema({
	name: {type: String, required: true},
	address: String,
	rating: {type: Number, "default": 0, min: 0, max: 5},
	facilities: [String],
	coords: {type: [Number], index: '2dsphere'},
	openingTimes: [openingTimeSchema],
	reviews: [reviewSchema]
});

//Compiling the mongoose schema into a model
mongoose.model('Location', locationSchema);