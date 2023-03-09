const lib = {
	
	// !!! implement better
	format : (date)=>date.toString(),
	
	//
	getParam : (param)=>{
		const urlSearchParams = new URLSearchParams(location.search);
		const value = urlSearchParams.get(param);
		if (value === null){return undefined;}
		return value;
	},
	modifyGetParamsAndRedirect : (setObject)=>{
		const urlSearchParams = new URLSearchParams(location.search);
		Object.keys(setObject).forEach(key=>{
			const value = setObject[key];
			urlSearchParams.set(key,value);
		});
		location.search = urlSearchParams;
	},
	
	isSignedIn : function(){
		return localStorage.getItem('authToken') !== null;
	},
	// Doesn't actually expose anything important, which still must go through the API.
	isAdmin : function(){
		return localStorage.getItem('isAdmin') || false;
	},
	isTeacher : function(){
		return localStorage.getItem('isTeacher') || false;
	},
	getEmail : function(){
		return localStorage.getItem('email') || '';
	},
	signOut : function(){
		localStorage.removeItem('id'       );
		localStorage.removeItem('email'    );
		localStorage.removeItem('authToken');
		localStorage.removeItem('isAdmin'  );
		localStorage.removeItem('isTeacher');
		location.reload();
	},
	
	redirectToAuthIfNotSignedIn : function(){
		if (!this.isSignedIn()){
			location.href = '/auth';
			return true;
		}
		return false;
	},
	
	request : async function(path,method,data){
		
		let id = localStorage.getItem("id");
		if (id === null){
			id = undefined;
		}
		
		let authToken = localStorage.getItem("authToken");
		if (authToken === null){
			authToken = undefined;
		}
		
		const response = await fetch(path,{
			method,
			cache   : 'no-cache',
			headers : {
				'Content-Type' : 'application/json',
				'Authorization' : `Custom ${btoa(JSON.stringify({id,authToken}))}`,
			},
			body    : JSON.stringify(data),
		});
		const result = await response.json();
		return result;
	},
};