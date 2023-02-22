const Absensi = async (props)=>{
	if (lib.redirectToAuthIfNotSignedIn()){return;}
	
	const today = new Date();
	const numberOfDaysToAdd = 0;
	const date = today.setDate(today.getDate() + numberOfDaysToAdd); 
	const defaultValue = new Date(date).toISOString().split('T')[0]; // yyyy-mm-dd
	
	// !!! TODO - paramify date
	
	const students = await (async ()=>{
		const result = await lib.request('/api/student/get-all/','GET');
		if (result.status){
			return result.payload.items;}
		return [];
	})();
	return (
		<React.Fragment>
			<Navbar/>
			<div className="container">
			<div className="absensi">
				<h2>Absensi</h2>
				<div className="content">
					<input type="date" id="dateRequired" name="dataRequired" style={{marginLeft: '20px'}} defaultValue={defaultValue}/>
					<div className="titles" style={{marginTop: '20px'}}>
						<span>Absen</span>
						<span>Students Name</span>
						<span style={{paddingRight: '70px'}}>Action</span>
					</div>
					{students && students.map((student) => (
						<AbsensiDetails key={student._id} student={student} />
					))}
					<button className="absensi-save" style={{marginTop: '20px', marginLeft: '45%'}}>Save</button>
					<button className="absensi-view" style={{marginLeft: '10px'}}>View</button>
				</div>
			</div>
		</div>
		</React.Fragment>
	);
};