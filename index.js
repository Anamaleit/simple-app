// Includes.
const express = require('express');
const path = require('path');

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

// Create Express object.
const app = express();

// Express rules, order matters.
// (1) Hook up custom page routes.
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
			ReactDOM.render(${route.rootComponent}(),document.querySelector('#react-root'));
		});
	</script>
</head>
<body>
	<div id="react-root"></div>
</body>
</html>`);
	});
});
// (2) Hook up the rest of the raw routes.
app.use('/component',express.static(path.join(__dirname,'public-transpiled/component')));
app.use('/css',express.static(path.join(__dirname,'public/css')));
app.use('/js',express.static(path.join(__dirname,'public/js')));
app.use('/page',express.static(path.join(__dirname,'public-transpiled/page')));

// Listen for clients.
app.listen(port,()=>{
	console.log(`App is listening on port ${port}.`)
});