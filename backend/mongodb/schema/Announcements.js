const mongoose = require('mongoose'); // Needed for special mongodb types.
module.exports = {
	classes : [
		{
			type : String,
		},
	],
	title : {
		type : String,
		required : true,
	},
	description : {
		type : String,
		required : true,
	},
};