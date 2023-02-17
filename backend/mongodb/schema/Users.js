const mongoose = require('mongoose'); // Needed for special mongodb types.
module.exports = {
	email : {
		type : String,
		required : true,
		unique: true,
	},
	hash : {
		type : String,
		required : true,
	},
	authTokens : [
		{
			token : {
				type : String,
			},
			expiration : {
				type : Number,
			},
		},
	],
	isTeacher : {
		type : Boolean,
		required : false,
	},
	isAdmin : {
		type : Boolean,
		required : false,
	},
	canView : {
		Students : [
			{
				type : mongoose.Types.ObjectId,
			},
		],
	},
};