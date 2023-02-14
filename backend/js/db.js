const bcrypt   = require('bcrypt'  );
const mongoose = require('mongoose');
const crypto   = require('crypto'  );
module.exports = (rel,lib)=>class {
	
	models = {};
	
	constructor(){;}
	
	async init(){
		
		// Connect to database.
		const secret = require(rel('/secret/secret.js'));
		mongoose.set('strictQuery',false); // Suppress warning for incoming mongoose 7 change.
		await mongoose.connect(secret.mongodbAddress,{dbName:'simple-app'});
		
		// Create and store all Models.
		const config = require(rel('/backend/js/config.js'));
		config.mongodbSpecification.forEach(entry=>{
			this.models[entry.collectionName] = this.createModel(entry.collectionName,rel(entry.schemaPath));
		});
		
	}
	
	// Create and return a Mongoose Model.
	createModel(collectionName,schemaAbsolutePath){
		// strict:throw makes it so that telltale warning signs are reported instead of silently being ignored.
		const schema = new mongoose.Schema(require(schemaAbsolutePath),{strict:'throw',timestamps:true});
		const model = mongoose.model(collectionName,schema);
		return model;
	}
	
	resolveModel(collectionName){
		const model = this.models[collectionName];
		if (model === undefined){
			lib.error(`argument collectionName:${collectionName} not recognized`);
			return undefined;
		}
		return model;
	}
	
	//
	async generateAuthToken(email,duration=365*24*60*60){
		const user = await this.readOne('Users',{email});if (user === undefined){return undefined;}
		const entry = {
			token      : crypto.randomBytes(32).toString('base64'),
			expiration : lib.now() + duration,};
		user.authTokens.push(entry);
		if (await this.update(user) === undefined){return undefined;}
		return entry.token;
	}
	async verifyAuthToken(email,token){
		const user = await this.readOne('Users',{email});if (user === undefined){return undefined;}
		// Remove old tokens for housekeeping.
		const now = lib.now();
		user.authTokens = user.authTokens.filter(entry=>now < entry.expiration);
		if (await this.update(user) === undefined){return undefined;}
		return user.authTokens.some(entry=>entry.token === token);
	}
	
	
	
	// CRUD
	
	async create(collectionName,data={}){
		const model = this.resolveModel(collectionName);if (model === undefined){return undefined;}
		let item;
		try {
			item = await model.create(data);
		}
		catch (error){
			lib.error(error);
			return undefined;
		}
		return item;
	}
	
	async readAll(collectionName,sort={}){
		const model = this.resolveModel(collectionName);if (model === undefined){return undefined;}
		let items;
		try {
			items = await model.find({}).sort(sort);
		}
		catch (error){
			lib.error(error);
			return undefined;
		}
		if (items === null){
			return [];
		}
		return items;}
	
	async readMultiple(collectionName,match={},sort={}){
		if (lib.objectIsEmpty(match)){
			lib.error('argument match is empty');
			return undefined;
		}
		const model = this.resolveModel(collectionName);if (model === undefined){return undefined;}
		let items;
		try {
			items = await model.find(match).sort(sort);
		}
		catch (error){
			lib.error(error);
			return undefined;
		}
		if (items === null){
			return [];
		}
		return items;
	}
	
	async readOne(collectionName,match={}){
		if (lib.objectIsEmpty(match)){
			lib.error('argument match is empty');
			return undefined;
		}
		const model = this.resolveModel(collectionName);if (model === undefined){return undefined;}
		let item;
		try {
			item = await model.findOne(match);
		}
		catch (error){
			lib.error(error);
			return undefined;
		}
		if (item === null){
			return undefined;
		}
		return item;
	}
	
	async exists(collectionName,match={}){
		const model = this.resolveModel(collectionName);if (model === undefined){return undefined;}
		let item;
		try {
			item = await model.findOne(match);
		}
		catch (error){
			lib.error(error);
			return undefined;
		}
		if (item === null){
			return false;
		}
		return true;
	}
	
	// Parameter:item is returned from a Read function.
	async update(item){
		try {
			await item.save();}
		catch (error){
			lib.error(error);
			return undefined;
		}
		return true;
	}
	
	async delete(collectionName,match={}){
		if (lib.objectIsEmpty(match)){
			lib.error('argument match is empty');
			return undefined;
		}
		const model = this.resolveModel(collectionName);if (model === undefined){return undefined;}
		let item;
		try {
			item = await model.findOneAndDelete(match);
		}
		catch (error){
			this.lib.error(error);
			return undefined;
		}
		return item;
	}
	
};