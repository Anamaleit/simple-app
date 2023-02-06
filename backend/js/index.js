module.exports = async function(projectRootPath){
	
	// Includes.
	const express  = require('express' );
	const mongoose = require('mongoose');
	const path     = require('path'    );
	
	// Local includes.
	const rel = (pathFromProjectRoot)=>path.join(projectRootPath,pathFromProjectRoot);
	const config = require(rel('/backend/js/config.js'));
	const lib    = require(rel('/backend/js/lib.js'));
	
	// Express routes.
	const app = express();
	app.use(express.json());
	// Interpret database config.
	config.mongodbSpecification.forEach(entry=>{
		const model = lib.createModel(entry.collectionName,rel(entry.schemaPath));
		const apiHandlerGenerator = require(rel(entry.apiHandlerGeneratorPath));
		const apiHandler = apiHandlerGenerator(model,entry.singularName);
		//const requireAuth = require('../middleware/requireAuth')
		//router.use(requireAuth);
		const router = express.Router();
		router.get   ('/'   ,apiHandler.getAll); // GET
		router.get   ('/:id',apiHandler.getOne); // GET
		router.patch ('/:id',apiHandler.update); // PATCH
		router.post  ('/'   ,apiHandler.create); // POST
		router.delete('/:id',apiHandler.delete); // DELETE
		app.use(entry.apiBaseRoute,router);
	});
	// Hook up custom page routes.
	config.pageRoutes.forEach(route=>{
		app.get(route.urlPath,function(req,res){
			res.send(lib.generateBaseHtml(route,config.globalComponentDependencies));
		});
	});
	// Hook up the rest of the raw routes.
	app.use('/component',express.static(rel('/frontend-transpiled/component')));
	app.use('/css'      ,express.static(rel('/frontend/css')));
	app.use('/js'       ,express.static(rel('/frontend/js')));
	app.use('/page'     ,express.static(rel('/frontend-transpiled/page')));
	// Listen for clients.
	app.listen(config.port,()=>{
		console.log(`App is listening on port ${config.port}.`)
	});
	
	// Mongodb.
	const secret = require(rel('/secret/secret.js'));
	mongoose.set('strictQuery',false); // Suppress warning for incoming mongoose 7 change.
	await mongoose.connect(secret.mongodbAddress,{dbName:'simple-app'});
};