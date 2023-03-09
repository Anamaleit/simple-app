import Navbar from '/component/Navbar.js';
import KeteranganDetails from '/component/KeteranganDetails.js';
export default async (props)=>{
	if (lib.redirectToAuthIfNotSignedIn()){return;}
	
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
				<div className="keterangan">
					<h2>Keterangan</h2>
					<div className="content">
						<div className="titles">
							<span>Absen</span>
							<span>Students Name</span>
							<span style={{paddingRight: '70px'}}>Action</span>
						</div>
						{students && students.map((student) => (
							<KeteranganDetails key={student._id} student={student} />
						))}
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};