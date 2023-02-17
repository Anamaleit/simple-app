const MainPage = (props)=>{
	if (lib.redirectToAuthIfNotSignedIn()){return;}
	return (
		<React.Fragment>
			<Navbar/>
			<div>
				<Student name="Student One"/>
				<Student name="Student Two"/>
			</div>
		</React.Fragment>
	);
};