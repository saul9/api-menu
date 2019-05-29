const mongoose = require('mongoose');
const { Schema } = mongoose;

const menuItem = new Schema({
	_id: Schema.Types.ObjectId,
	id: String,
    name: String,
	price: String,
    description: String,
    border:String
});

module.exports = mongoose.model('menuItem', menuItem);
