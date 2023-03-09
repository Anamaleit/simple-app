import KeteranganModal from '/component/KeteranganModal.js';
export default (props)=>{
	const {student} = props;
	return (
		<div className="keterangan-table">
			<div className="num">
				<span>{student.num}</span>
			</div>
			<div className="name">
				<span>{student.name}</span>
			</div>
			<div className="action">
				<KeteranganModal mode="view" student={student}/>
				<KeteranganModal mode="update" student={student}/>
			</div>
		</div>
	)
};