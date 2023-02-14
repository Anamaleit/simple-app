const lib = {
	
	request : async function(path,method,data){
		
		let email = localStorage.getItem("email");
		if (email === null){
			email = undefined;
		}
		
		let authToken = localStorage.getItem("authToken");
		if (authToken === null){
			authToken = undefined;
		}
		
		const meta = {
			email,
			authToken,
		};
		const response = await fetch(path,{
			method,
			cache   : 'no-cache',
			headers : {'Content-Type' : 'application/json',},
			body    : JSON.stringify({meta,data}),
		});
		const result = await response.json();
		return result;
	},
};