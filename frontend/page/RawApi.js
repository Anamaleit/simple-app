const RawApi = (props)=>{
	const submit = async (event) => {
		const path = event.target.parentNode.querySelector('[data-key=\'path\']').value;
		const method = event.target.parentNode.querySelector('[data-key=\'method\']').value;
		const data = JSON.parse(event.target.parentNode.querySelector('[data-key=\'data\']').value);
		// Default options are marked with *
		const response = await fetch(path, {
			method, // GET PATCH POST DELETE
			cache   : 'no-cache',
			headers : {
				'Content-Type' : 'application/json',
			},
			body    : ['PATCH','POST'].includes(method)?JSON.stringify(data):undefined, // body data type must match "Content-Type" header
		});
		const result = await response.json();
		console.log(result);
		event.target.parentNode.querySelector('[data-type=\'result\']').innerText = JSON.stringify(result);
	}
	return (
		<React.Fragment>
			path<br/>
			<input data-key="path" defaultValue="/api/student/" /><br/>
			<br/>
			HTTP Method<br/>
			<input data-key="method" defaultValue="GET" /><br/>
			<br/>
			.data (JSON)<br/>
			<input data-key="data" defaultValue="{}" /><br/>
			<br/>
			<button onClick={submit}>Send</button><br/>
			<br/>
			<div data-type="result"></div>
		</React.Fragment>
	);
};