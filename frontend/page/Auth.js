const Auth = (props)=>{
	const handleSubmit = async (e) => {
		e.preventDefault()
		await signup(email, password)
	}
	const submit = async (event) => {
		const email = event.target.parentNode.querySelector('[data-key=\'email\']').value;
		const password = event.target.parentNode.querySelector('[data-key=\'password\']').value;
		const response = await fetch('/api/auth/sign-up',{
			method  : 'POST',
			cache   : 'no-cache',
			headers : {
				'Content-Type' : 'application/json',
			},
			body    : JSON.stringify(data),
		});
		const result = await response.json();
		console.log(result);
		event.target.parentNode.querySelector('[data-type=\'result\']').innerText = JSON.stringify(result);
	}
	return (
		<React.Fragment>
			<div className="error" style={{marginTop: "20px"}}>{error}</div>
			email<br/>
			<input data-key="email" type="email" defaultValue="user@example.com" /><br/>
			<br/>
			password<br/>
			<input data-key="password" type="password" defaultValue="password" /><br/>
			<br/>
			<button onClick={submit}>Send</button><br/>
		</React.Fragment>
	);
};