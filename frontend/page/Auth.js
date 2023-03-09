window.Auth = (props)=>{
	const signUp = async (event)=>{
		const email = event.target.parentNode.querySelector('[data-key=\'email\']').value;
		const password = event.target.parentNode.querySelector('[data-key=\'password\']').value;
		const result = await lib.request('/api/auth/sign-up','POST',{email,password});
		if (result.status){
			localStorage.setItem('id'       ,result.payload.id       );
			localStorage.setItem('email'    ,result.payload.email    );
			localStorage.setItem('authToken',result.payload.authToken);
			localStorage.setItem('isAdmin'  ,result.payload.isAdmin  );
			localStorage.setItem('isTeacher',result.payload.isTeacher);
			location.reload();
		}
		else{
			event.target.parentNode.querySelector('[data-type=\'result\']').innerText = JSON.stringify(result);
		}
	}
	const signIn = async (event)=>{
		const email = event.target.parentNode.querySelector('[data-key=\'email\']').value;
		const password = event.target.parentNode.querySelector('[data-key=\'password\']').value;
		const result = await lib.request('/api/auth/sign-in','POST',{email,password});
		if (result.status){
			localStorage.setItem('id'       ,result.payload.id       );
			localStorage.setItem('email'    ,result.payload.email    );
			localStorage.setItem('authToken',result.payload.authToken);
			localStorage.setItem('isAdmin'  ,result.payload.isAdmin  );
			localStorage.setItem('isTeacher',result.payload.isTeacher);
			location.reload();
		}
		else{
			event.target.parentNode.querySelector('[data-type=\'result\']').innerText = JSON.stringify(result);
		}
	}
	const signOut = async (event)=>{
		lib.signOut();
	};
	return (
		<React.Fragment>
			<Navbar/>
			{
				localStorage.getItem('email')!==null
				?
					<React.Fragment>
						Currently signed in as:<br/>
						{localStorage.getItem('email')}<br/>
						<br/>
						<button onClick={signOut}>Sign Out</button><br/>
						<br/>
					</React.Fragment>
				:
					<React.Fragment>
						email<br/>
						<input data-key="email" type="email" defaultValue="user@example.com" /><br/>
						<br/>
						password<br/>
						<input data-key="password" type="password" defaultValue="password" /><br/>
						<br/>
						<button onClick={signIn}>Sign In</button> <button onClick={signUp}>Sign Up</button><br/>
						<br/>
						<div data-type="result"></div>
					</React.Fragment>
			}
		</React.Fragment>
	);
};