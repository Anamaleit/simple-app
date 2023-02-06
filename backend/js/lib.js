const bcrypt   = require('bcrypt'  );
const mongoose = require('mongoose');
const crypto   = require('crypto'  );
module.exports = {
	
	//
	now : ()=>Date.now()/1000,
	
	//
	authTokenEntries : {},
	schema.statics.signup = async function(email, password) {
		if (!validator.isEmail(email)) {
			throw Error('Email is not valid')
		}
		if (!validator.isStrongPassword(password)) {
			throw Error('Password not strong enough')
		}
		const exists = await this.findOne({ email })
		if (exists) {
			throw Error('Email already used')
		}
		const salt = await bcrypt.genSalt(10)
		const hash = await bcrypt.hash(password, salt)
		const user = await this.create({email,hash})
		return user
	}
	validateUserCredentials : function(User,email,password){
		const user = await User.findOne({email});
		const match = await bcrypt.compare(password,user.hash);
		return match;
	},
	generateAuthToken : function(email,password,duration){
		const token = crypto.randomBytes(64).toString('base64');
		const expiration = this.now() + duration;
		const entry = {email,token,expiration};
		this.authTokenEntries.push(entry);
		return token;
	},
	removeExpiredAuthTokens : function(){
		const now = this.now();
		this.authTokenEntries = this.authTokenEntries.filter(entry=>now < entry.expiration);
	},
	verifyAuthToken : function(email,token){
		this.removeExpiredAuthTokens();
		return this.authTokenEntries.some(entry=>entry.email === email && entry.token === token);
	},
	
	// Create and return a Mongoose Model.
	createModel : function(collectionName,schemaAbsolutePath){
		// strict:throw makes it so that telltale warning signs are reported instead of silently being ignored.
		const schema = new mongoose.Schema(require(schemaAbsolutePath),{strict:"throw",timestamps:true});
		const model = mongoose.model(collectionName,schema);
		return model;
	},
	
	// Generate the base HTML that is rendered on each page, before React is applied.
	generateBaseHtml : function(route,globalComponentDependencies){
		const allScripts = route.componentDependencies.concat(`/page/${route.rootComponent}.js`).concat(globalComponentDependencies);
		const componentIncludes = allScripts.map(path=>`<script src="${path}"></script>`).join('\n\t');
		const page = `\
			<!DOCTYPE html>
			<html>
			<head>
				<title>${route.pageTitle}</title>
				<script src="/js/react.development.js" crossorigin></script>
				<script src="/js/react-dom.development.js" crossorigin></script>
				${componentIncludes}
				<script>
					document.addEventListener('DOMContentLoaded',function(){
						ReactDOM.createRoot(document.querySelector('#react-root')).render(${route.rootComponent}());
					});
				</script>
			</head>
			<body>
				<div id="react-root"></div>
			</body>
			</html>`.replace(/^\t{3}/gm,''); // Attempt to remove leading js code indentation so it looks nice on the client.
		return page;
	},
};