module.exports = async function(projectRootPath){
	
	// Includes.
	const express  = require('express'  );
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
	
	// API routes from the config file.
	config.mongodbSpecification.forEach(entry=>{
		const apiHandlerGenerator = require(rel(entry.apiHandlerGeneratorPath));
		const apiHandler = apiHandlerGenerator(lib,db,entry.collectionName);
		const router = express.Router();
		router.get   ('/get-all/'     ,lib.genApiWrap(apiHandler.readAll  ));
		router.get   ('/get-one/:id'  ,lib.genApiWrap(apiHandler.readOne  ));
		router.patch ('/update/:id'   ,lib.genApiWrap(apiHandler.update   ));
		router.post  ('/create/'      ,lib.genApiWrap(apiHandler.create   ));
		router.delete('/delete/:id'   ,lib.genApiWrap(apiHandler.deleteOne));
		app.use(entry.apiBaseRoute,router);
	});
	
	// Sign In / Sign Up.
	{
		const apiAuthHandlerGenerator = require(rel('/backend/api/auth.js'));
		const apiAuthHandler = apiAuthHandlerGenerator(lib,db);
		app.post('/api/auth/sign-in',lib.genApiWrap(apiAuthHandler.signIn));
		app.post('/api/auth/sign-up',lib.genApiWrap(apiAuthHandler.signUp));
	}
	
	// For testing.
	{
		app.post('/api/test',async ()=>{
			const o = await db.readMultiple('Students',{name:'testzzz'});
			console.log(o);
		});
	}
	
	// Page routes from the config file.
	config.pageRoutes.forEach(route=>{
		app.get(route.urlPath,function(req,res){
			res.send(lib.generateBaseHtml(route,config.globalStyleDependencies,config.globalComponentDependencies));
		});
	});
	
	// Supporting file routes.
	app.use('/component'          ,express.static(rel('/frontend-transpiled/component')));
	app.use('/css'                ,express.static(rel('/frontend/css')));
	app.use('/js'                 ,express.static(rel('/frontend/js')));
	app.use('/page'               ,express.static(rel('/frontend-transpiled/page')));
	app.use('/npm/react-bootstrap',express.static(rel('/node_modules/react-bootstrap/dist/react-bootstrap.min.js')));
	
	// Listen for clients.
	app.listen(config.port,config.ip,()=>{
		console.log(cliColor.green(`Server is up. Visit ${config.ip}:${config.port}.`))
	});
	
};