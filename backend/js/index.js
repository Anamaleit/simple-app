// Includes.
const express  = require('express' );
const path     = require('path'    );
const mongoose = require('mongoose');
const fs       = require('fs'      );



// Configuration.
const port = 5000;
const globalComponentDependencies = [
	'/component/Navbar.js',
];
const routes = [
	{
		urlPath : '/',
		title : 'My App',
		rootComponent : 'MainPage',
		componentDependencies : [
			'/component/Student.js',
		],
	},
	{
		urlPath : '/other',
		title : 'My App (Other)',
		rootComponent : 'OtherPage',
		componentDependencies : [
			'/component/Student.js',
		],
	},
];



module.exports = async function(projectRootPath){
	
	// Express routes.
	const app = express();
	// (1/2) Hook up custom page routes.
	routes.forEach(route=>{
		app.get(route.urlPath,function(req,res){
			const allScripts = route.componentDependencies.concat(`/page/${route.rootComponent}.js`).concat(globalComponentDependencies);
			const componentIncludes = allScripts.map(path=>`<script src="${path}"></script>`).join('\n\t');
			res.send(`\
<!DOCTYPE html>
<html>
<head>
	<title>${route.title}</title>
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
</html>`);
		});
	});
	// (2/2) Hook up the rest of the raw routes.
	app.use('/component',express.static(path.join(projectRootPath,'frontend-transpiled/component')));
	app.use('/css',express.static(path.join(projectRootPath,'frontend/css')));
	app.use('/js',express.static(path.join(projectRootPath,'frontend/js')));
	app.use('/page',express.static(path.join(projectRootPath,'frontend-transpiled/page')));
	// Listen for clients.
	app.listen(port,()=>{
		console.log(`App is listening on port ${port}.`)
	});
	
	// Mongodb.
	const secret = require(path.join(projectRootPath,'/secret/secret.js'));
	mongoose.set('strictQuery',false); // Suppress warning for incoming mongoose 7 change.
	await mongoose.connect(secret.mongodbAddress);
};