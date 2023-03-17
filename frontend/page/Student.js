import Navbar from '/component/Navbar.js';
import StudentDetails from "/component/StudentDetails.js";

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
                <div className="status-pay">
                    <h2>Status Pembayaran</h2>
                    <div className="content">
                        <div className="titles" style={{marginTop: '20px'}}>
                            <span>Absen</span>
                            <span>Students Name</span>
                            <span style={{paddingRight: '130px'}}>Action</span>
                        </div>
                        {students && students.map((student) => (
                            <StudentDetails key={student._id} student={student} /> 
                        ))}
                    </div>
                </div>
            </div>
		</React.Fragment>
	);
};