const mongoose = require('mongoose'); // Needed for special mongodb types.
module.exports = {
	username : {
		type : String,
		required : true,
	},
	isTeacher : {
		type : Boolean,
		required : false,
	},
	isAdmin : {
		type : Boolean,
		required : false,
	},
};