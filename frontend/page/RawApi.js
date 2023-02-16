const RawApi = (props)=>{
	const submit = async (event) => {
		const path = event.target.parentNode.querySelector('[data-key=\'path\']').value;
		const method = event.target.parentNode.querySelector('[data-key=\'method\']').value;
		const rawData = event.target.parentNode.querySelector('[data-key=\'data\']').value;
		// GET PATCH POST DELETE
		const result = await lib.request(path,method,['PATCH','POST'].includes(method)&&rawData!==''?JSON.parse(rawData):undefined);
		console.log(result);
		event.target.parentNode.querySelector('[data-type=\'result\']').innerText = JSON.stringify(result);
	}
	return (
		<React.Fragment>
			path<br/>
			<input data-key="path" defaultValue="/api/student/get-all/" /><br/>
			<br/>
			HTTP Method<br/>
			<input data-key="method" defaultValue="POST" /><br/>
			<br/>
			.data (JSON)<br/>
			<textarea data-key="data" defaultValue="" /><br/>
			<br/>
			<button onClick={submit}>Send</button><br/>
			<br/>
			<div data-type="result"></div>
		</React.Fragment>
	);
};