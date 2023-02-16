const lib = {
	
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