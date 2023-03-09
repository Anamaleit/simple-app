import AnnouncementModal from '/component/AnnouncementModal.js';
export default (props)=>{
	const {announcement} = props;
	const handleClick = async function(){
		await lib.request(`/api/announcement/delete/${announcement._id}`,'DELETE');
	};
	return (
		<div className="announcement-details">
			<div className="announcement-header">
				<div className="title">{announcement.title}</div>
				<div className="time">{lib.format(new Date(announcement.createdAt), 'dd-MMM-yy , hh:mm')}</div>
			</div>
			<div className="announcement-content">
				<p><strong></strong>{announcement.description}</p>
			</div>
			<div className='user-id' style={{margin: '20px'}}>created by {'???'}</div>
			<AnnouncementModal mode="update" announcement={announcement} className="announcement-update-button"/>
			<br/>
			<button className="delete-button" onClick={handleClick}>Delete</button>
		</div>
	)
};