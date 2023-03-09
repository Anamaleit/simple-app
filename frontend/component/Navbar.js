export default (props)=>{
	// Non-user.
	if (!lib.isSignedIn()){
		return (
			<header>
				<div className="nav-right">
					<ul>
						<li><a href="/auth">Sign In / Sign Up</a></li>
					</ul>
				</div>
			</header>
		);
	}
	// Admin.
	else if (lib.isAdmin()){
		return (
			<header>
				<div className="nav-left">
					<ul>
						<li><a href="/">Dashboard</a></li>
						<li><a href="/Raw">Raw</a></li>
						<li><a href="/Student">Student</a></li>
						<li><a href="/Nilai">Nilai</a></li>
						<li><a href="/Absensi">Absensi</a></li>
						<li><a href="/StatusPembayaran">Status Pembayaran</a></li>
						<li><a href="/Keterangan">Keterangan</a></li>
						<li style={{marginLeft: "600px"}}>{lib.getEmail()}</li>
						<button onClick={lib.signOut} style={{marginLeft: "10px"}}>Log out</button>
					</ul>
				</div>
			</header>
		);
	}
	// Teacher.
	else if (lib.isTeacher()){
		return (
			<header>
				<div className="nav-left">
					<ul>
						<li><a href="/">Dashboard</a></li>
						<li><a href="/Student">Student</a></li>
						<li><a href="/Nilai">Nilai</a></li>
						<li><a href="/Absensi">Absensi</a></li>
						<li><a href="/StatusPembayaran">Status Pembayaran</a></li>
						<li><a href="/Keterangan">Keterangan</a></li>
						<li style={{marginLeft: "600px"}}>{lib.getEmail()}</li>
						<button onClick={lib.signOut} style={{marginLeft: "10px"}}>Log out</button>
					</ul>
				</div>
			</header>
		);
	}
	// Unprivileged user.
	else{
		return (
			<header>
				<div className="nav-left">
					<ul>
						<li><a href="/">Dashboard</a></li>
						<li><a href="/Student">Student</a></li>
						<li style={{marginLeft: "600px"}}>{lib.getEmail()}</li>
						<button onClick={lib.signOut} style={{marginLeft: "10px"}}>Log out</button>
					</ul>
				</div>
			</header>
		);
	}
};