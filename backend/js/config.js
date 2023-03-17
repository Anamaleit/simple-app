// Configuration.
module.exports = {
	
	// Server web address.
	ip : '127.0.2.2',
	port : 5000,
	
	// Pages.
	pageRoutes : [
		{
			urlPath       : '/',
			pageTitle     : 'My App',
			rootComponent : 'Home',
			styleDependencies : [],
		},
		{
			urlPath       : '/Absensi',
			pageTitle     : 'Absensi',
			rootComponent : 'Absensi',
			styleDependencies : [],
		},
		{
			urlPath       : '/Keterangan',
			pageTitle     : 'Keterangan',
			rootComponent : 'Keterangan',
			styleDependencies : [],
		},
		{
			urlPath		  : '/student',
			pageTitle     : 'Student',
			rootComponent : 'Student',
			styleDependencies : [],
		},
		{
			urlPath       : '/other',
			pageTitle     : 'My App (Other)',
			rootComponent : 'OtherPage',
			styleDependencies : [],
		},
		{
			urlPath       : '/view',
			pageTitle     : 'View All Students',
			rootComponent : 'ViewAllStudents',
			styleDependencies : [],
		},
		{
			urlPath       : '/raw-api',
			pageTitle     : 'Raw API',
			rootComponent : 'RawApi',
			styleDependencies : [
				'/css/RawApi.css',
			],
		},
		{
			urlPath       : '/auth',
			pageTitle     : 'Sign In / Sign Up',
			rootComponent : 'Auth',
			styleDependencies : [],
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
		{
			collectionName          : 'Announcements',
			apiBaseRoute            : '/api/announcement/',
			schemaPath              : '/backend/mongodb/schema/Announcements.js',
			apiHandlerGeneratorPath : '/backend/api/generic.js',
		},
	],
};