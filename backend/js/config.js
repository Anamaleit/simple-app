// Configuration.
module.exports = {
	
	// Server web address.
	ip : '192.81.134.169',
	port : 5000,
	
	// Global css and js.
	globalStyleDependencies : [
		'/css/global.css'
	],
	globalComponentDependencies : [
		'/component/Navbar.js',
	],
	
	// Pages.
	pageRoutes : [
		{
			urlPath       : '/',
			pageTitle     : 'My App',
			rootComponent : 'MainPage',
			styleDependencies : [],
			componentDependencies : [
				'/component/Student.js',
			],
		},
		{
			urlPath       : '/other',
			pageTitle     : 'My App (Other)',
			rootComponent : 'OtherPage',
			styleDependencies : [],
			componentDependencies : [
				'/component/Student.js',
			],
		},
		{
			urlPath       : '/view',
			pageTitle     : 'View All Students',
			rootComponent : 'ViewAllStudents',
			styleDependencies : [],
			componentDependencies : [
				'/component/Student.js',
			],
		},
		{
			urlPath       : '/raw-api',
			pageTitle     : 'Raw API',
			rootComponent : 'RawApi',
			styleDependencies : [
				'/css/RawApi.css',
			],
			componentDependencies : [],
		},
		{
			urlPath       : '/auth',
			pageTitle     : 'Sign In / Sign Up',
			rootComponent : 'Auth',
			styleDependencies : [],
			componentDependencies : [],
		},
	],
	
	// Database types.
	mongodbSpecification : [
		{
			collectionName          : 'Students',
			apiBaseRoute            : '/api/student/',
			schemaPath              : '/backend/mongodb/schema/Students.js',
			apiHandlerGeneratorPath : '/backend/api/generic.js',
		},
		{
			collectionName          : 'Users',
			apiBaseRoute            : '/api/user/',
			schemaPath              : '/backend/mongodb/schema/Users.js',
			apiHandlerGeneratorPath : '/backend/api/generic.js',
		},
	],
};