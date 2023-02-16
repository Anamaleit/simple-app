module.exports = (lib,db,collectionName,itemNameSingular)=>({
	create : async (req,res)=>{
		if (!await db.requireTeacherPermission(db,req,res)){
			return false;
		}
		const data = req.body.data;
		const item = await db.create(collectionName,data);
		if (item === undefined){
			return lib.ng(res,'Internal error.');
		}
		return lib.ok(res,{});
	},
	readAll : async (req,res)=>{
		if (!await db.requireTeacherPermission(db,req,res)){
			return false;
		}
		const match = req.body.match;
		const sort = req.body.sort;
		const items = await db.readAll(collectionName,match,sort);
		if (items === undefined){
			return lib.ng(res,'Internal error.');
		}
		return lib.ok(res,{items});
	},
	readMultiple : async (req,res)=>{
		if (!await db.requireTeacherPermission(db,req,res)){
			return false;
		}
		const match = req.body.match;
		const sort = req.body.sort;
		const items = await db.readMultiple(collectionName,match,sort);
		if (items === undefined){
			return lib.ng(res,'Internal error.');
		}
		return lib.ok(res,{items});
	},
	readOne : async (req,res)=>{
		if (!await db.requireAccount(db,req,res)){
			return false;
		}
		const {id} = req.params;
		const item = await db.readOne(collectionName,{_id:id});
		if (item === undefined){
			return lib.ng(res,'Internal error.');
		}
		return lib.ok(res,{item});
	},
	update : async (req,res)=>{
		if (!await db.requireTeacherPermission(db,req,res)){
			return false;
		}
		const {id} = req.params;
		const data = req.body.data;
		const item = await db.readOne(collectionName,{_id:id});
		if (item === undefined){
			return lib.ng(res,'Internal error.');
		}
		Object.keys(data).forEach((value,key)=>{
			item[key] = value;
		});
		if (await db.update(item) === undefined){
			return lib.ng(res,'Internal error.');
		}
		return lib.ok(res,{});
	},
	deleteOne : async (req,res)=>{
		if (!await db.requireTeacherPermission(db,req,res)){
			return false;
		}
		const {id} = req.params;
		if (await db.deleteOne(collectionName,{_id:id}) === undefined){
			return lib.ng(res,'Internal error.');
		}
		return lib.ok(res,{});
	},
});