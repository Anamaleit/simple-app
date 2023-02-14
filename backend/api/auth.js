const mongoose  = require('mongoose' );
const validator = require('validator');
const bcrypt    = require('bcrypt'   );
module.exports = (lib,db)=>({
	
	signUp : async (req,res)=>{
		
		// Inputs.
		const {email,password} = req.body;
		if (email    === undefined){return lib.ng(res,'Email not supplied.');}
		if (password === undefined){return lib.ng(res,'Password not supplied.');}
		
		// Validate email.
		if (!validator.isEmail(email)){
			return lib.ng(res,'Email doesn\'t seem to be formatted properly.');
		}
		
		// Validate password.
		if (typeof password !== "string" || password.length < 3){
			return lib.ng(res,'Password sucks!');
		}
		
		// Get the user in question.
		if (await db.exists('Users',{email})){
			return lib.ng(res,'Email already in use by a user.');
		}
		
		// Generate a password hash to store.
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password,salt);
		
		// Create the user in the database.
		if (await db.create('Users',{email,hash}) === undefined){
			return lib.ng(res,'Internal Error.');
		}
		
		// Generate an auth token for the user to use in future requests.
		const authToken = await db.generateAuthToken(email);
		
		// Return the auth token to the user, so they can use it.
		return lib.ok(res,{authToken});
		
	},
	
	signIn : async (req,res)=>{
		
		// Inputs.
		const {email,password} = req.body;
		if (email    === undefined){return lib.ng(res,'Email not supplied.');}
		if (password === undefined){return lib.ng(res,'Password not supplied.');}
		
		// Get the user in question.
		const user = await db.readOne('Users',{email});
		
		// Verify that password checks out with stored User hash.
		const passwordOk = await bcrypt.compare(password,user.hash);
		if (!passwordOk){
			return lib.ng(res,'Incorrect password.');
		}
		
		// Generate an auth token for the user to use in future requests.
		const authToken = await db.generateAuthToken(email);
		
		// Return the auth token to the user, so they can use it.
		return lib.ok(res,{authToken});
		
	},
	
});