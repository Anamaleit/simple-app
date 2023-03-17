import StudentModal from "/component/StudentModal.js";
export default (props)=>{
    const {student} = props;  
    return (
        <div className="status-pay-table">
            <div className="num">
                <span>{student.num}</span>
            </div>
            <div className="name">
                <span>{student.name}</span>
            </div>
            <div className="action">
                <StudentModal student={student} />
            </div>
        </div>
    )
};