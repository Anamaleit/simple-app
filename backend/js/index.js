module.exports = async function(projectRootPath){
	
	// Includes.
	const express  = require('express'  );
	const mongoose = require('mongoose' );
	const path     = require('path'     );
	const cliColor = require('cli-color');
	
	// Local includes.
	const rel = (pathFromProjectRoot)=>path.join(projectRootPath,pathFromProjectRoot);
	const config = require(rel('/backend/js/config.js'));
	const lib    = require(rel('/backend/js/lib.js'));
	const Db     = require(rel('/backend/js/db.js'))(rel,lib);
	const db = new Db();
	await db.init();
	
	// Express routes.
	const app = express();
	app.use(express.json());
	// Interpret database config.
	config.mongodbSpecification.forEach(entry=>{
		const model = db.resolveModel(entry.collectionName);
		const apiHandlerGenerator = require(rel(entry.apiHandlerGeneratorPath));
		const apiHandler = apiHandlerGenerator(model,entry.singularName);
		//const requireAuth = require('../middleware/requireAuth')
		//router.use(requireAuth);
		const router = express.Router();
		router.get   ('/'   ,lib.genApiWrap(apiHandler.getAll));
		router.get   ('/:id',lib.genApiWrap(apiHandler.getOne));
		router.patch ('/:id',lib.genApiWrap(apiHandler.update));
		router.post  ('/'   ,lib.genApiWrap(apiHandler.create));
		router.delete('/:id',lib.genApiWrap(apiHandler.delete));
		app.use(entry.apiBaseRoute,router);
	});
	{
		const apiAuthHandlerGenerator = require(rel('/backend/api/auth.js'));
		const apiAuthHandler = apiAuthHandlerGenerator(lib,db);
		app.post('/api/auth/sign-up',lib.genApiWrap(apiAuthHandler.signUp));
		app.post('/api/auth/sign-in',lib.genApiWrap(apiAuthHandler.signIn));
	}
	{
		app.post('/api/test',async ()=>{
			const o = await db.readMultiple('Students',{name:'testzzz'});
			console.log(o);
		});
	}
	// Hook up custom page routes.
	config.pageRoutes.forEach(route=>{
		app.get(route.urlPath,function(req,res){
			res.send(lib.generateBaseHtml(route,config.globalStyleDependencies,config.globalComponentDependencies));
		});
	});
	// Hook up the rest of the raw routes.
	app.use('/component',express.static(rel('/frontend-transpiled/component')));
	app.use('/css'      ,express.static(rel('/frontend/css')));
	app.use('/js'       ,express.static(rel('/frontend/js')));
	app.use('/page'     ,express.static(rel('/frontend-transpiled/page')));
	// Listen for clients.
	app.listen(config.port,config.ip,()=>{
		console.log(cliColor.green(`Server is up. Visit ${config.ip}:${config.port}.`))
	});
};