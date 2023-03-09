import Navbar from '/component/Navbar.js';
import AnnouncementModal from '/component/AnnouncementModal.js';
import AnnouncementDetails from '/component/AnnouncementDetails.js';
export default async (props)=>{
	if (lib.redirectToAuthIfNotSignedIn()){return;}
	
	const announcements = await (async ()=>{
		const result = await lib.request('/api/announcement/get-all/','GET');
		if (result.status){
			return result.payload.items;}
		return [];
	})();
	console.log(announcements);
	return (
		<React.Fragment>
			<Navbar/>
			<div className="home">
				<AnnouncementModal />
				<div className="announcements">
					{announcements && announcements.map((announcement) => (
						<AnnouncementDetails key={announcement._id} announcement={announcement} />
					))}
				</div>
			</div>
		</React.Fragment>
	);
};