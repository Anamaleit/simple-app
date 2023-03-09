export default (props)=>{
	return (
		<div className="absensi-table">
			<div className="num">
				<span>{props.student.num}</span>
			</div>
			<div className="name">
				<span>{props.student.name}</span>
			</div>
			<div className="action">
				<input type="checkbox" value="present" defaultChecked/>
				<select name="status" id="attendanceStatus" style={{marginLeft: '20px'}}>
					<option value="">--Ket--</option>
					<option value="sick">S</option>
					<option value="leave">I</option>
					<option value="absent">A</option>
				</select>
			</div>
		</div>
	)
};